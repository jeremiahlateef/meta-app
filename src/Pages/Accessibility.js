import React from "react";
import { CRITERIA, PATTERNS, SUPPORTS } from "../data/conformance";
import { usePageTitle } from "../hooks";

export default function Accessibility() {
  usePageTitle("Accessibility statement");
  return (
    <div className="wrap page">
      <div className="prose">
        <h1>Accessibility statement</h1>
        <p className="lede">
          This demo site is built to meet WCAG 2.1 Level AA and two WCAG 2.2 Level AA criteria. Here is what that means, how it was checked and what has
          not been checked yet.
        </p>

        <h2>Conformance target</h2>
        <ul>
          <li>WCAG 2.1 Level AA, plus 2.4.11 Focus Not Obscured (Minimum) and 2.5.8 Target Size (Minimum) from WCAG 2.2.</li>
          <li>This also covers the web requirements in EN 301 549 and Revised Section 508, which refer to WCAG.</li>
          <li>Status: the author has tested every page against this target. No independent audit has been carried out.</li>
        </ul>

        <h2>How it was tested</h2>
        <ul>
          <li>
            <strong>Automated:</strong> axe-core 4.10.2 with the WCAG 2 A and AA, 2.1 AA, 2.2 AA and best-practice rule sets, run on every page and with the menu,
            wallet window and form errors open.
          </li>
          <li>
            <strong>Keyboard:</strong> every flow completed with the keyboard only, including reserving a place.
          </li>
          <li>
            <strong>Reflow, zoom and spacing:</strong> every page at 1280, 375 and 320 CSS pixels, at 200% text size and with WCAG 1.4.12 text spacing applied.
          </li>
          <li>
            <strong>Navigation:</strong> page title and focus checked after every route change.
          </li>
          <li>
            <strong>Preferences:</strong> reduced motion and forced colours.
          </li>
        </ul>

        <h2>Not yet tested</h2>
        <ul>
          <li>Screen readers: NVDA, JAWS, VoiceOver and TalkBack. The markup follows patterns those tools support, but this has not been confirmed by listening.</li>
          <li>Voice control and switch access.</li>
          <li>Testing with disabled users.</li>
        </ul>

        <h2>Known limitations</h2>
        <ul>
          <li>This is a demo. The places, prices and ratings are samples, and no wallet is contacted.</li>
          <li>The illustrations are small images, so they look soft when enlarged on the place page.</li>
          <li>The Red Rose font loads from Google Fonts. If it does not load, the page falls back to a system serif font and stays readable.</li>
          <li>Saved places are stored in your browser. Clearing site data removes them.</li>
          <li>Date fields use your browser's own date picker, which differs between browsers.</li>
        </ul>
      </div>

      <h2>Conformance report</h2>
      <p>Each row is a success criterion the site has to meet, the result and how it is met.</p>
      <div className="table-scroll">
        <table>
          <caption>WCAG 2.1 AA and selected 2.2 AA criteria</caption>
          <thead>
            <tr>
              <th scope="col">Criterion</th>
              <th scope="col">Name</th>
              <th scope="col">Level</th>
              <th scope="col">Result</th>
              <th scope="col">How it is met</th>
            </tr>
          </thead>
          <tbody>
            {CRITERIA.map(([id, name, level, result, note]) => (
              <tr key={id}>
                <th scope="row">{id}</th>
                <td>{name}</td>
                <td>{level}</td>
                <td className={result === SUPPORTS ? "ok-tag" : "partial-tag"}>{result}</td>
                <td>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Patterns used</h2>
      <div className="table-scroll">
        <table>
          <caption>Components and how they are built</caption>
          <thead>
            <tr>
              <th scope="col">Component</th>
              <th scope="col">Approach</th>
            </tr>
          </thead>
          <tbody>
            {PATTERNS.map(([name, text]) => (
              <tr key={name}>
                <th scope="row">{name}</th>
                <td>{text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose">
        <h2>Technical specification</h2>
        <p>The site is built with React and React Router and uses plain CSS. It relies on HTML, CSS and JavaScript and does not work without JavaScript.</p>
        <h2>Feedback</h2>
        <p>
          If you find a barrier on this site, please tell the author through <a href="https://jeremiahlat.com">jeremiahlat.com</a> and say which page and
          which assistive technology you were using.
        </p>
        <p className="muted">Last reviewed: October 23, 2026.</p>
      </div>
    </div>
  );
}
