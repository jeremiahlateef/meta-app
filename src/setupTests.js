// jest-dom adds custom jest matchers for asserting on DOM nodes.
import "@testing-library/jest-dom";

// jsdom does not implement the native <dialog> methods or scrolling.
window.HTMLDialogElement.prototype.showModal = function showModal() {
  this.setAttribute("open", "");
};
window.HTMLDialogElement.prototype.close = function close() {
  this.removeAttribute("open");
  this.dispatchEvent(new Event("close"));
};
window.scrollTo = jest.fn();
