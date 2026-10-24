/* Every row is backed by an automated check or a manual check described on
   the accessibility page. "Partially supports" is used where it is honest. */
export const SUPPORTS = "Supports";
export const PARTIAL = "Partially supports";
export const NA = "Not applicable";

export const CRITERIA = [
  ["1.1.1", "Non-text Content", "A", SUPPORTS, "Every place and NFT picture has its own description. Icons inside buttons are hidden from assistive technology and the button carries the name. The five-star picture was replaced by text."],
  ["1.2.1 to 1.2.5", "Time-based media", "A, AA", NA, "The site has no audio or video."],
  ["1.3.1", "Info and Relationships", "A", SUPPORTS, "Header, nav, main and footer landmarks, one h1 per page and a logical heading order, lists for grids and menus, fieldset and legend for the category choice, labels tied to every input."],
  ["1.3.2", "Meaningful Sequence", "A", SUPPORTS, "Reading order in the code matches the visual order at every width."],
  ["1.3.4", "Orientation", "AA", SUPPORTS, "No orientation lock."],
  ["1.3.5", "Identify Input Purpose", "AA", SUPPORTS, "The email field on the NFT page uses autocomplete=\"email\". No other field collects personal data."],
  ["1.4.1", "Use of Color", "A", SUPPORTS, "The selected category shows a check mark as well as a fill. Saved places change shape and the name stays the same, with aria-pressed. Errors have text, not only a red border. Links in running text are underlined."],
  ["1.4.3", "Contrast (Minimum)", "AA", SUPPORTS, "Text is at least 4.5:1 against its background. White text on the brand pink is about 7:1."],
  ["1.4.4", "Resize Text", "AA", SUPPORTS, "Sizes are in rem and nothing is clipped at 200% text size."],
  ["1.4.5", "Images of Text", "AA", SUPPORTS, "The only text in an image is the logo and the partner logos, which are essential."],
  ["1.4.10", "Reflow", "AA", SUPPORTS, "No horizontal scrolling at 320 CSS pixels on any page."],
  ["1.4.11", "Non-text Contrast", "AA", SUPPORTS, "Form field borders and the focus ring are at least 3:1 against what surrounds them."],
  ["1.4.12", "Text Spacing", "AA", SUPPORTS, "Tested with line height 1.5, paragraph spacing 2em, letter spacing 0.12em and word spacing 0.16em: nothing is clipped or overlaps."],
  ["1.4.13", "Content on Hover or Focus", "AA", NA, "No content appears on hover or focus."],
  ["2.1.1", "Keyboard", "A", SUPPORTS, "Everything works with a keyboard: menu, wallet, filters, saving, booking and the FAQ."],
  ["2.1.2", "No Keyboard Trap", "A", SUPPORTS, "Dialogs are modal and close with Escape or their close button. Focus goes back to the control that opened them."],
  ["2.1.4", "Character Key Shortcuts", "A", NA, "There are no single-key shortcuts."],
  ["2.2.1, 2.2.2", "Timing, Pause Stop Hide", "A", SUPPORTS, "Nothing times out. The menu icon used to pulse forever. It no longer moves."],
  ["2.3.1", "Three Flashes", "A", SUPPORTS, "Nothing flashes."],
  ["2.4.1", "Bypass Blocks", "A", SUPPORTS, "A skip link is the first tab stop and moves focus to the main content."],
  ["2.4.2", "Page Titled", "A", SUPPORTS, "Each page has a unique title that changes when you move between pages."],
  ["2.4.3", "Focus Order", "A", SUPPORTS, "When the page changes, focus moves to its main heading. Hidden menu and dialog controls are not in the tab order."],
  ["2.4.4", "Link Purpose (In Context)", "A", SUPPORTS, "Every link says where it goes. There are no links that go nowhere. Each place card has one link named by the place."],
  ["2.4.5", "Multiple Ways", "AA", SUPPORTS, "Main navigation, search, categories and the footer."],
  ["2.4.6", "Headings and Labels", "AA", SUPPORTS, "Headings describe their section and every control has a visible label."],
  ["2.4.7", "Focus Visible", "AA", SUPPORTS, "A 3px two-tone ring on every control."],
  ["2.4.11", "Focus Not Obscured (Minimum)", "AA (2.2)", SUPPORTS, "The header does not stick and nothing overlaps the page, so a focused control is never hidden."],
  ["2.5.1, 2.5.2, 2.5.4", "Pointer gestures, cancellation, motion", "A", SUPPORTS, "Every action is a single click or tap on a button or link. No motion sensors are used."],
  ["2.5.3", "Label in Name", "A", SUPPORTS, "Accessible names begin with the visible label, for example the wallet button."],
  ["2.5.8", "Target Size (Minimum)", "AA (2.2)", SUPPORTS, "Interactive targets are 44 by 44 CSS pixels or larger."],
  ["3.1.1", "Language of Page", "A", SUPPORTS, "html lang is en."],
  ["3.2.1, 3.2.2", "On Focus, On Input", "A", SUPPORTS, "Nothing changes context on focus or input. Filters change the list on the page and the result count is announced."],
  ["3.2.3, 3.2.4", "Consistent Navigation and Identification", "AA", SUPPORTS, "Header, footer and wallet controls are the same on every page."],
  ["3.3.1", "Error Identification", "A", SUPPORTS, "Errors are described in text next to the field and in a summary that takes focus."],
  ["3.3.2", "Labels or Instructions", "A", SUPPORTS, "Every field has a visible label. Limits such as the longest stay are stated before the field."],
  ["3.3.3", "Error Suggestion", "AA", SUPPORTS, "Messages say how to fix the problem."],
  ["3.3.4", "Error Prevention (Legal, Financial)", "AA", PARTIAL, "The price is shown before you reserve. There is no separate review step or way to cancel. Nothing is charged because this is a demo."],
  ["4.1.2", "Name, Role, Value", "A", SUPPORTS, "Native controls throughout. Toggles use aria-pressed, the dialogs use the native dialog element, and the current page uses aria-current."],
  ["4.1.3", "Status Messages", "AA", SUPPORTS, "Result counts, saving a place, wallet connection and booking changes are announced without moving focus."],
];

export const PATTERNS = [
  ["Skip link", "First in the tab order, visible on focus, moves focus to main."],
  ["Route changes", "A single page app does not reload, so the page title is updated and focus moves to the new page's h1."],
  ["Mobile menu and wallet window", "Native dialog opened with showModal(): focus is trapped, the page behind is inert, Escape closes it and focus returns to the opener. The menu is not in the tab order when closed."],
  ["Place cards", "A list of articles with one link each, named by the place. The save heart is a separate toggle button with aria-pressed, placed over the heart that is drawn into the picture."],
  ["Filters", "Native radios in a fieldset for category, native select elements, and a result count in a status region. The state is kept in the URL."],
  ["Booking form", "Native date inputs and a select, visible labels, inline errors linked with aria-describedby, and an error summary that takes focus."],
  ["Live regions", "One polite status region for the page and one inside each dialog, because content outside an open modal is inert."],
  ["Preferences", "prefers-reduced-motion removes animation. forced-colors keeps borders and states visible."],
];
