import React from "react";
import { NavLink } from "react-router-dom";
import Dialog from "./Dialog";
import { NAV_LINKS } from "./Header";
import { useGlobalContext, shortAddress } from "../context";
import { CloseIcon } from "./Icons";

/* The mobile menu is a modal dialog: while it is open the page behind is
   inert, and the menu is not in the tab order at all when it is closed. */
export default function MenuDialog() {
  const { menuOpen, closeMenu, openWallet, wallet } = useGlobalContext();
  const connected = wallet.status === "connected";
  return (
    <Dialog open={menuOpen} onClose={closeMenu} labelledBy="menu-title" className="drawer">
      <div className="drawer-head">
        <h2 id="menu-title">Menu</h2>
        <button type="button" className="icon-btn" onClick={closeMenu} aria-label="Close menu">
          <CloseIcon className="icon" />
        </button>
      </div>
      <nav aria-label="Mobile">
        <ul className="drawer-links">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end} className="nav-link" onClick={closeMenu}>
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/place?saved=1" className="nav-link" onClick={closeMenu}>
              Saved places
            </NavLink>
          </li>
          <li>
            <NavLink to="/accessibility" className="nav-link" onClick={closeMenu}>
              Accessibility
            </NavLink>
          </li>
        </ul>
      </nav>
      <button
        type="button"
        className="btn btn-block"
        aria-haspopup="dialog"
        onClick={() => {
          closeMenu();
          openWallet();
        }}
      >
        {connected ? (
          <>
            {shortAddress(wallet.address)}
            <span className="sr-only"> connected wallet</span>
          </>
        ) : (
          "Connect wallet"
        )}
      </button>
    </Dialog>
  );
}
