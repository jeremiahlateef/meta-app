# Metabnb

A React demo of a metaverse rental marketplace, rebuilt to be accessible and well engineered.
Live site: https://metabnbweb.netlify.app/

Payments, wallets and NFTs are demonstrations only. Nothing is charged and no wallet is contacted.

## What changed

The original was a visual clone with pictures of text, a modal that trapped nothing, and a menu that stayed in the tab order while hidden. The rebuild keeps the look of the brand and fixes the structure.

| Area | Before | After |
| --- | --- | --- |
| Navigation | One page, hidden menu in the tab order | Six routes with real links, skip link, labelled landmarks |
| Menu and wallet | Custom modal, ignored Escape, focus not managed | Native `dialog` with `showModal()`: focus trap, Escape, focus return |
| Page changes | No title or focus update | Title updates and focus moves to the new `h1` |
| Favourites | Heart baked into each image | Real toggle button (`aria-pressed`), saved to the device, announced |
| Ratings | Image of stars | Text: "Rated 4.8 out of 5" |
| Search and filters | None | Labelled search, category, sort, price, saved only. State lives in the URL |
| Booking | None | Validated form with error summary, inline errors, price summary |
| Motion | Menu icon animated forever | No looping motion, honours reduced motion |

## Features

- Home, Places (search and filters), Place detail with booking, NFTs with waitlist, Community with FAQ, Accessibility statement, 404.
- Demo wallet connect (MetaMask or WalletConnect) with status messages.
- Saved places kept in `localStorage`.
- Accessibility statement with a criteria table that matches the test results.

## How it was tested

- axe-core 4.10.2 (WCAG 2.0, 2.1 and 2.2 AA plus best practices) on every route and on open states: menu, wallet dialog in each step, booking errors, empty results, waitlist errors, open FAQ. Zero violations.
- Scripted keyboard checks: skip link, tab order, visible focus on every stop, dialog focus trap, Escape, focus return, route change focus.
- Reflow at 320 and 375 px, text spacing, 200% text, 44px targets, reduced motion, forced colours.
- 15 React Testing Library unit tests.

Total: 150 end to end checks and 15 unit tests, all passing. The suite is `run_meta.cjs` (Playwright).

Not yet done: a manual pass with NVDA, JAWS or VoiceOver. This is listed on the in-site accessibility page.

## Run it

```bash
npm install
npm start          # http://localhost:3000
npm test           # unit tests
npm run build      # production build in build/
```

## Notes

- Deployed on Netlify. `public/_redirects` sends deep links to `index.html`.
- The artwork is small (about 260px wide). Replace it with larger images when available.
- The footer links to the author LinkedIn profile.
