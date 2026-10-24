import React, { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MenuDialog from "./MenuDialog";
import WalletDialog from "./WalletDialog";
import { useGlobalContext } from "../context";

/* Frame shared by every page: skip link, landmarks, live region, and focus
   management when the route changes. In a single page app the browser does
   not do that for us, so without it keyboard and screen reader users stay
   where they were and hear nothing (WCAG 2.4.3, 4.1.3). */
export default function Layout() {
  const { message } = useGlobalContext();
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo(0, 0);
    const heading = mainRef.current && mainRef.current.querySelector("h1");
    const target = heading || mainRef.current;
    if (target) {
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {message}
      </div>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <MenuDialog />
      <WalletDialog />
    </>
  );
}
