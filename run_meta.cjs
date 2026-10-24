const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const fs = require('fs');
const B = 'http://127.0.0.1:8130';
const AXE = fs.readFileSync('/home/claude/test/vendor/axe-core-4.10.2/package/axe.min.js', 'utf8');
const OUT = '/home/claude/work3/audit';

let pass = 0, fail = 0; const fails = [];
function ok(name, cond, extra) {
  if (cond) { pass++; console.log('  PASS', name); }
  else { fail++; fails.push(name); console.log('  FAIL', name, extra !== undefined ? '=> ' + JSON.stringify(extra) : ''); }
}
const ann = async (page, sel = '[role=status][aria-live=polite]') => { await page.waitForTimeout(220); return page.evaluate(() => document.querySelector('[role=status][aria-live=polite]').textContent); };

async function mk(br, opts = {}) {
  const ctx = await br.newContext({ viewport: opts.viewport || { width: 1280, height: 900 }, reducedMotion: opts.rm || 'no-preference', forcedColors: opts.forced ? 'active' : 'none' });
  const page = await ctx.newPage();
  page.errors = [];
  page.on('pageerror', (e) => page.errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') page.errors.push('console: ' + m.text()); });
  await page.route('**/*', (r) => {
    const u = r.request().url();
    if (u.startsWith('http://127.0.0.1') || u.startsWith('data:')) return r.continue();
    if (u.includes('fonts.googleapis')) return r.fulfill({ contentType: 'text/css', body: '' });
    return r.abort();
  });
  return { ctx, page };
}

async function axe(page, label) {
  await page.addScriptTag({ content: AXE });
  const res = await page.evaluate(() => axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } }));
  ok('axe ' + label + ' (' + res.passes.length + ' rules passed)', res.violations.length === 0);
  for (const x of res.violations) {
    console.log('    [' + x.impact + '] ' + x.id + ': ' + x.help);
    x.nodes.slice(0, 3).forEach((n) => console.log('      ' + n.target.join(' ') + ' | ' + (n.failureSummary || '').split('\n').slice(0, 2).join(' ')));
  }
  const inc = res.incomplete.map((i) => i.id + '(' + i.nodes.length + ')');
  if (inc.length) console.log('    incomplete: ' + inc.join(', '));
  return res;
}

const plus = (n) => { const t = new Date(); t.setDate(t.getDate() + n); return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`; };
const ROUTES = ['/', '/place', '/place/palm-cove-villa', '/place/desert-king', '/nfts', '/community', '/accessibility', '/not-a-page', '/place/nope'];

(async () => {
  const br = await chromium.launch();

  console.log('\n## 1. axe on every route');
  for (const r of ROUTES) {
    const { ctx, page } = await mk(br);
    await page.goto(B + r); await page.waitForTimeout(500);
    await axe(page, r);
    ok('no console/page errors ' + r, page.errors.length === 0, page.errors);
    await ctx.close();
  }

  console.log('\n## 2. axe on states');
  {
    const { ctx, page } = await mk(br, { viewport: { width: 375, height: 800 } });
    await page.goto(B + '/'); await page.click('[aria-label="Open menu"]'); await page.waitForTimeout(400);
    await axe(page, 'mobile menu open'); await ctx.close();
  }
  {
    const { ctx, page } = await mk(br);
    await page.goto(B + '/'); await page.click('.connect'); await page.waitForTimeout(300);
    await axe(page, 'wallet dialog (choose)');
    await page.click('text=MetaMask >> nth=0'); await page.waitForTimeout(100);
    await axe(page, 'wallet dialog (connecting)');
    await page.waitForTimeout(1000);
    await axe(page, 'wallet dialog (connected)'); await ctx.close();
  }
  {
    const { ctx, page } = await mk(br);
    await page.goto(B + '/place?category=Castle&sort=price-desc'); await page.waitForTimeout(400);
    await axe(page, 'places filtered');
    await page.goto(B + '/place?q=zzzz'); await page.waitForTimeout(400);
    await axe(page, 'places empty');
    await page.goto(B + '/place?saved=1'); await page.waitForTimeout(400);
    await axe(page, 'saved places empty'); await ctx.close();
  }
  {
    const { ctx, page } = await mk(br);
    await page.goto(B + '/place/palm-cove-villa');
    await page.click('.booking button[type=submit]'); await page.waitForTimeout(200);
    await axe(page, 'booking with errors');
    await page.fill('#check-in', plus(3)); await page.fill('#check-out', plus(6)); await page.waitForTimeout(100);
    await axe(page, 'booking with price summary'); await ctx.close();
  }
  {
    const { ctx, page } = await mk(br);
    await page.goto(B + '/nfts'); await page.click('text=Join the waitlist >> nth=1'); await page.waitForTimeout(200);
    await axe(page, 'waitlist error');
    await page.fill('#waitlist-email', 'a@b.co'); await page.click('form button[type=submit]'); await page.waitForTimeout(150);
    await axe(page, 'waitlist success'); await ctx.close();
  }
  {
    const { ctx, page } = await mk(br);
    await page.goto(B + '/community'); await page.click('summary >> nth=0'); await page.waitForTimeout(150);
    await axe(page, 'FAQ item open'); await ctx.close();
  }

  console.log('\n## 3. page structure and routing');
  {
    const { ctx, page } = await mk(br);
    const titles = new Set();
    for (const r of ROUTES) {
      await page.goto(B + r); await page.waitForTimeout(250);
      const t = await page.title(); titles.add(t);
      const info = await page.evaluate(() => ({
        lang: document.documentElement.lang,
        h1: document.querySelectorAll('h1').length,
        landmarks: ['header', 'nav', 'main', 'footer'].map((x) => document.querySelectorAll(x).length),
        dupIds: (() => { const s = {}, d = []; document.querySelectorAll('[id]').forEach((e) => { if (s[e.id]) d.push(e.id); s[e.id] = 1; }); return d; })(),
        hrefHash: [...document.querySelectorAll('a')].filter((a) => !a.getAttribute('href') || a.getAttribute('href') === '#').length,
        imgNoAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
      }));
      ok(r + ': lang=en, exactly 1 h1, 1 main, no dup ids, no empty links, imgs have alt', info.lang === 'en' && info.h1 === 1 && info.landmarks[2] === 1 && info.dupIds.length === 0 && info.hrefHash === 0 && info.imgNoAlt === 0, info);
      ok(r + ': title is not the CRA default', !/React App/.test(t) && /Metabnb/.test(t), t);
    }
    ok('every route has a unique title', titles.size === ROUTES.length, [...titles]);
    // deep link reload (Netlify _redirects equivalent)
    await page.goto(B + '/place/violet-tower'); await page.reload();
    ok('deep link survives a reload', (await page.textContent('h1')) === 'Violet Tower');
    ok('public/_redirects exists for Netlify', fs.readFileSync('/home/claude/work3/meta-app/build/_redirects', 'utf8').includes('/index.html'));
    await ctx.close();
  }

  console.log('\n## 4. route changes: title and focus (SPA)');
  {
    const { ctx, page } = await mk(br);
    await page.goto(B + '/');
    ok('first load does not steal focus', (await page.evaluate(() => document.activeElement.tagName)) === 'BODY');
    await page.click('nav[aria-label=Main] >> text=Places to stay');
    await page.waitForTimeout(150);
    ok('title updated after client navigation', (await page.title()) === 'Places to stay | Metabnb', await page.title());
    ok('focus moved to the new h1', (await page.evaluate(() => document.activeElement.tagName + ':' + document.activeElement.textContent)) === 'H1:Places to stay');
    await page.goBack(); await page.waitForTimeout(150);
    ok('Back restores the previous page', (await page.textContent('h1')).includes('Rent a'));
    await page.goto(B + '/');
    await page.click('text=View all places'); await page.waitForTimeout(150);
    ok('focus on h1 after link in content', (await page.evaluate(() => document.activeElement.tagName)) === 'H1');
    await ctx.close();
  }

  console.log('\n## 5. keyboard: skip link, tab order, focus rings');
  {
    const { ctx, page } = await mk(br);
    await page.goto(B + '/');
    await page.keyboard.press('Tab');
    ok('first tab stop is the skip link', (await page.evaluate(() => document.activeElement.className)) === 'skip-link');
    ok('skip link becomes visible on focus', (await page.evaluate(() => document.activeElement.getBoundingClientRect().top)) >= 0);
    await page.keyboard.press('Enter');
    ok('skip link moves focus to main', (await page.evaluate(() => document.activeElement.id)) === 'main');
    let hidden = [], noRing = [], count = 0;
    await page.focus('body');
    for (let i = 0; i < 70; i++) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(() => {
        const e = document.activeElement; if (!e || e === document.body) return null;
        const r = e.getBoundingClientRect(); const c = getComputedStyle(e);
        let ring = c.outlineStyle !== 'none' && parseFloat(c.outlineWidth) >= 2;
        if (!ring && e.type === 'radio' && e.nextElementSibling) ring = getComputedStyle(e.nextElementSibling).outlineStyle !== 'none';
        return { tag: e.tagName, text: (e.getAttribute('aria-label') || e.textContent || '').trim().slice(0, 28), visible: r.width > 0 && r.height > 0, ring };
      });
      if (!info) continue; count++;
      if (!info.visible) hidden.push(info); if (!info.ring) noRing.push(info);
    }
    ok('home: ' + count + ' tab stops, none invisible (old site had hidden menu + modal buttons in tab order)', hidden.length === 0, hidden.slice(0, 3));
    ok('home: every tab stop shows a focus ring', noRing.length === 0, noRing.slice(0, 3));
    // places page cards: heart + link only
    await page.goto(B + '/place');
    const stops = await page.evaluate(() => [...document.querySelectorAll('.grid > li')].map((li) => li.querySelectorAll('a,button').length));
    ok('each place card has exactly 2 tab stops (heart + link)', stops.length === 16 && stops.every((n) => n === 2), stops);
    await ctx.close();
  }

  console.log('\n## 6. mobile menu dialog');
  {
    const { ctx, page } = await mk(br, { viewport: { width: 375, height: 800 } });
    await page.goto(B + '/');
    const closedStops = await page.evaluate(() => document.querySelector('dialog.drawer').open);
    ok('menu is closed and out of the tab order at load', closedStops === false);
    await page.focus('[aria-label="Open menu"]'); await page.keyboard.press('Enter'); await page.waitForTimeout(300);
    ok('menu opens as a modal dialog', await page.evaluate(() => document.querySelector('dialog.drawer').open));
    ok('dialog has accessible name "Menu"', (await page.evaluate(() => document.querySelector('dialog.drawer').getAttribute('aria-labelledby'))) === 'menu-title');
    const seen = [];
    for (let i = 0; i < 14; i++) { await page.keyboard.press('Tab'); seen.push(await page.evaluate(() => { const a = document.activeElement; return a === document.body ? 'browser' : document.querySelector('dialog.drawer').contains(a) ? 'in' : 'OUTSIDE'; })); }
    ok('Tab never reaches the page behind the menu', !seen.includes('OUTSIDE'), seen);
    await page.keyboard.press('Escape'); await page.waitForTimeout(250);
    ok('Escape closes the menu', !(await page.evaluate(() => document.querySelector('dialog.drawer').open)));
    ok('focus returns to the menu button', (await page.evaluate(() => document.activeElement.getAttribute('aria-label'))) === 'Open menu');
    // navigate from the menu
    await page.click('[aria-label="Open menu"]'); await page.waitForTimeout(250);
    await page.click('dialog.drawer >> text=Community'); await page.waitForTimeout(300);
    ok('menu link navigates, closes the menu', !(await page.evaluate(() => document.querySelector('dialog.drawer').open)) && page.url().endsWith('/community'));
    ok('focus lands on the new page h1 (not back on the menu button)', (await page.evaluate(() => document.activeElement.tagName)) === 'H1', await page.evaluate(() => document.activeElement.outerHTML.slice(0, 80)));
    ok('menu icon no longer animates forever', (await page.evaluate(() => getComputedStyle(document.querySelector('.menu-btn .icon')).animationName)) === 'none');
    await ctx.close();
  }

  console.log('\n## 7. wallet dialog (demo)');
  {
    const { ctx, page } = await mk(br);
    await page.goto(B + '/');
    await page.focus('.connect'); await page.keyboard.press('Enter'); await page.waitForTimeout(250);
    ok('wallet dialog open and named', (await page.evaluate(() => { const d = document.querySelector('dialog.wallet'); return d.open && document.getElementById(d.getAttribute('aria-labelledby')).textContent; })) === 'Connect wallet');
    ok('two distinct wallet names (old site said Metamask twice)', JSON.stringify(await page.$$eval('.wallet-option span', (n) => n.map((x) => x.textContent))) === '["MetaMask","WalletConnect"]');
    ok('demo notice is visible', await page.locator('dialog.wallet .notice').isVisible());
    await page.keyboard.press('Escape'); await page.waitForTimeout(200);
    ok('Escape closes (old modal ignored Escape)', !(await page.evaluate(() => document.querySelector('dialog.wallet').open)));
    ok('focus returns to Connect wallet', (await page.evaluate(() => document.activeElement.className)).includes('connect'));
    await page.click('.connect'); await page.click('.wallet-option >> nth=1');
    ok('status says connecting (inside dialog)', (await page.textContent('dialog.wallet [role=status]')).includes('Connecting to WalletConnect'));
    ok('options disabled while connecting', await page.locator('.wallet-option').first().isDisabled());
    await page.waitForTimeout(1000);
    ok('status says connected with short address', (await page.textContent('dialog.wallet [role=status]')).includes('Connected to WalletConnect as 0x71C7…976F'));
    await page.click('text=Done'); await page.waitForTimeout(200);
    ok('header button shows the address and says connected wallet', (await page.textContent('.connect')).includes('0x71C7…976F') && (await page.textContent('.connect')).includes('connected wallet'));
    await page.click('.connect'); await page.click('text=Disconnect'); await page.waitForTimeout(250);
    ok('disconnect restores the button label', (await page.textContent('.connect')) === 'Connect wallet');
    ok('disconnect is announced', (await ann(page)).includes('Wallet disconnected'));
    await ctx.close();
  }

  console.log('\n## 8. places: filters, saving, URL');
  {
    const { ctx, page } = await mk(br);
    await page.goto(B + '/place');
    ok('16 places listed', (await page.locator('.grid > li').count()) === 16);
    await page.check('input[name=category][value=Castle]', { force: true });
    ok('Castle filter: 2 places', (await page.locator('.grid > li').count()) === 2);
    ok('URL updated', page.url().includes('category=Castle'));
    await page.waitForTimeout(700);
    ok('status says 2 places found', (await page.textContent('.results-status')) === '2 places found.', await page.textContent('.results-status'));
    ok('document title reflects the filter', (await page.title()).startsWith('Castle places'), await page.title());
    await page.selectOption('#sort', 'price-asc');
    ok('sort price low to high puts Pinewall? no: Pinewall 3.9 < Twilight 4.5', (await page.textContent('.grid > li:first-child .card-title')) === 'Pinewall Keep');
    await page.fill('#q', 'zzzz'); await page.waitForTimeout(700);
    ok('empty state shown with status', (await page.textContent('.results-status')).includes('No places match') && (await page.locator('.empty').isVisible()));
    await page.click('.empty >> text=Clear filters'); await page.waitForTimeout(700);
    ok('clear returns all 16', (await page.locator('.grid > li').count()) === 16 && !page.url().includes('?'));
    await page.goto(B + '/place?max=2');
    ok('price filter up to 2 MBT', (await page.locator('.grid > li').count()) === 7, await page.locator('.grid > li').count());
    // hearts
    await page.goto(B + '/place');
    const heart = page.locator('.grid > li:first-child .fav');
    ok('heart name includes the place', (await heart.textContent()).includes('Violet Tower'));
    await heart.click();
    ok('aria-pressed true', (await heart.getAttribute('aria-pressed')) === 'true');
    ok('save announced', (await ann(page)).includes('Violet Tower saved'));
    ok('header saved count', (await page.getAttribute('.saved-link', 'aria-label')) === 'Saved places, 1');
    await page.reload();
    ok('saved place persists after reload', (await page.getAttribute('.saved-link', 'aria-label')) === 'Saved places, 1' && (await page.getAttribute('.grid > li:first-child .fav', 'aria-pressed')) === 'true');
    await page.click('.saved-link'); await page.waitForTimeout(300);
    ok('saved page lists 1 place with h1 Saved places', (await page.locator('.grid > li').count()) === 1 && (await page.textContent('h1')) === 'Saved places');
    // heart overlay covers the baked-in heart
    await page.goto(B + '/place');
    const geo = await page.evaluate(() => { const li = document.querySelector('.grid > li:first-child'); const img = li.querySelector('img').getBoundingClientRect(); const b = li.querySelector('.fav').getBoundingClientRect(); return { px: ((b.left + b.width / 2 - img.left) / img.width * 100).toFixed(1), py: ((b.top + b.height / 2 - img.top) / img.height * 100).toFixed(1), w: b.width, h: b.height }; });
    ok('button sits over the baked-in heart (92%, 6%) and is 44px', Math.abs(geo.px - 91.9) < 1 && Math.abs(geo.py - 5.9) < 1 && geo.w >= 44, geo);
    await ctx.close();
  }

  console.log('\n## 9. booking flow');
  {
    const { ctx, page } = await mk(br);
    await page.goto(B + '/place/palm-cove-villa');
    ok('h1 is the place name, image has own alt', (await page.textContent('h1')) === 'Palm Cove Villa' && (await page.getAttribute('.listing-media img', 'alt')).includes('modern white'));
    await page.click('.booking button[type=submit]');
    ok('error summary focused', (await page.evaluate(() => document.activeElement.id)) === 'error-summary');
    ok('2 errors listed', (await page.locator('#error-summary li').count()) === 2);
    ok('inline error text linked with aria-describedby', (await page.getAttribute('#check-in', 'aria-describedby')) === 'check-in-error' && (await page.textContent('#check-in-error')).startsWith('Error:'));
    await page.click('#error-summary a >> nth=0');
    ok('summary link focuses the field', (await page.evaluate(() => document.activeElement.id)) === 'check-in');
    await page.fill('#check-in', plus(5)); await page.fill('#check-out', plus(3));
    await page.click('.booking button[type=submit]');
    ok('check-out before check-in rejected with a fix hint', (await page.textContent('#check-out-error')).includes('after check-in'));
    await page.fill('#check-out', plus(25));
    await page.click('.booking button[type=submit]');
    ok('stay longer than availability rejected', (await page.textContent('#check-out-error')).includes('up to 14 nights'), await page.textContent('#check-out-error'));
    await page.fill('#check-out', plus(8)); await page.waitForTimeout(100);
    // 3 nights * 5.2 = 15.6, fee 0.468 -> 16.07 (rounded in display)
    const summary = await page.textContent('.price-summary');
    ok('price summary shows nights and total', summary.includes('3 nights') && summary.includes('16.07 MBT'), summary);
    await page.click('.booking button[type=submit]'); await page.waitForTimeout(300);
    ok('without a wallet, the wallet dialog opens', await page.evaluate(() => document.querySelector('dialog.wallet').open));
    await page.click('.wallet-option >> nth=0'); await page.waitForTimeout(1000);
    await page.click('text=Done'); await page.waitForTimeout(250);
    ok('focus returns to the reserve button', (await page.evaluate(() => document.activeElement.type)) === 'submit');
    ok('page announces wallet connected', (await ann(page)).includes('Wallet connected'));
    ok('button now says Reserve', (await page.textContent('.booking button[type=submit]')) === 'Reserve');
    await page.click('.booking button[type=submit]'); await page.waitForTimeout(200);
    ok('confirmation panel is focused', (await page.evaluate(() => document.activeElement.className)).includes('confirmation'));
    ok('confirmation says demo, no charge', (await page.textContent('.confirmation')).includes('Nothing was charged'));
    await ctx.close();
  }

  console.log('\n## 10. NFTs waitlist + community FAQ');
  {
    const { ctx, page } = await mk(br);
    await page.goto(B + '/nfts');
    await page.click('form button[type=submit]');
    ok('waitlist empty submit: error, focus on field', (await page.evaluate(() => document.activeElement.id)) === 'waitlist-email' && (await page.getAttribute('#waitlist-email', 'aria-invalid')) === 'true');
    await page.fill('#waitlist-email', 'nope'); await page.click('form button[type=submit]');
    ok('invalid email explains the format', (await page.textContent('#waitlist-error')).includes('name@example.com'));
    await page.fill('#waitlist-email', 'a@b.co'); await page.click('form button[type=submit]'); await page.waitForTimeout(150);
    ok('success message in status region', (await page.textContent('.status-ok')).includes('on the list'));
    ok('email autocomplete token', (await page.getAttribute('#waitlist-email', 'autocomplete')) === 'email');
    await page.goto(B + '/community');
    await page.focus('summary >> nth=0'); await page.keyboard.press('Enter');
    ok('FAQ opens with the keyboard', await page.evaluate(() => document.querySelector('details').open));
    await ctx.close();
  }

  console.log('\n## 11. header search on home');
  {
    const { ctx, page } = await mk(br);
    await page.goto(B + '/');
    await page.fill('#hero-search', 'castle'); await page.keyboard.press('Enter'); await page.waitForTimeout(400);
    ok('Enter submits the search and goes to results', page.url().includes('/place?q=castle') && (await page.locator('.grid > li').count()) >= 1);
    ok('search box is pre-filled on results', (await page.inputValue('#q')) === 'castle');
    await ctx.close();
  }

  console.log('\n## 12. reflow, text spacing, 200% text');
  for (const w of [320, 375]) {
    for (const r of ROUTES.slice(0, 7)) {
      const { ctx, page } = await mk(br, { viewport: { width: w, height: 800 } });
      await page.goto(B + r); await page.waitForTimeout(300);
      const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
      ok('no horizontal scroll ' + r + ' @' + w, m.sw <= m.cw, m);
      if (w === 320 && (r === '/' || r === '/place/palm-cove-villa')) await page.screenshot({ path: `${OUT}/after-m320-${r === '/' ? 'home' : 'listing'}.png`, fullPage: true });
      await ctx.close();
    }
  }
  for (const r of ['/', '/place', '/place/palm-cove-villa', '/nfts', '/community']) {
    const { ctx, page } = await mk(br);
    await page.goto(B + r); await page.waitForTimeout(300);
    await page.addStyleTag({ content: '*{line-height:1.5 !important;letter-spacing:.12em !important;word-spacing:.16em !important} p{margin-bottom:2em !important}' });
    await page.addStyleTag({ content: 'html{font-size:200% !important}' }); await page.waitForTimeout(250);
    const clipped = await page.evaluate(() => { const out = []; document.querySelectorAll('button,a,label,h1,h2,h3,p,.btn').forEach((el) => { if (!el.offsetParent || el.closest('.table-scroll')) return; const cs = getComputedStyle(el); if (cs.overflow === 'hidden' && el.scrollWidth > el.clientWidth + 1 && !el.classList.contains('sr-only')) out.push(el.className || el.tagName); }); return out; });
    const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    ok('text spacing + 200% text: nothing clipped ' + r, clipped.length === 0, clipped.slice(0, 4));
    ok('200% text: no horizontal scroll ' + r, m.sw <= m.cw + 1, m);
    await ctx.close();
  }

  console.log('\n## 13. target size');
  {
    const { ctx, page } = await mk(br);
    for (const r of ['/', '/place', '/place/palm-cove-villa', '/nfts', '/community']) {
      await page.goto(B + r); await page.waitForTimeout(300);
      const small = await page.evaluate(() => { const bad = []; document.querySelectorAll('button, input:not([type=hidden]), select, summary').forEach((el) => { if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') return; let t = el; if (el.type === 'radio' || el.type === 'checkbox') { const l = el.closest('label'); if (l) t = l; } const b = t.getBoundingClientRect(); if (b.width && (b.width < 44 || b.height < 44)) bad.push((el.id || el.getAttribute('aria-label') || el.textContent || el.tagName).trim().slice(0, 26) + ' ' + Math.round(b.width) + 'x' + Math.round(b.height)); }); return bad; });
      ok('controls >= 44x44 on ' + r, small.length === 0, small.slice(0, 6));
    }
    await ctx.close();
  }

  console.log('\n## 14. reduced motion and forced colours');
  {
    const { ctx, page } = await mk(br, { rm: 'reduce', viewport: { width: 375, height: 800 } });
    await page.goto(B + '/'); await page.click('[aria-label="Open menu"]');
    ok('no slide animation with reduced motion', (await page.evaluate(() => getComputedStyle(document.querySelector('dialog.drawer')).animationName)) === 'none');
    await ctx.close();
  }
  {
    const { ctx, page } = await mk(br, { forced: true });
    await page.goto(B + '/place'); await page.check('input[name=category][value=Beach]', { force: true });
    await page.screenshot({ path: `${OUT}/after-forced-colors.png` });
    ok('selected category shows an outline in forced colours', (await page.evaluate(() => getComputedStyle(document.querySelector('input[name=category]:checked + span')).outlineStyle)) !== 'none');
    await ctx.close();
  }

  await br.close();
  console.log('\n==== SUMMARY: ' + pass + ' passed, ' + fail + ' failed ====');
  if (fail) console.log('Failed:\n - ' + fails.join('\n - '));
})();
