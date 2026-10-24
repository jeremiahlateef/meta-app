import React from "react";
import { Link, NavLink } from "react-router-dom";
import NavLogo from "../Assets/metabnb.svg";
import { useGlobalContext, shortAddress } from "../context";
import { HeartIcon, MenuIcon } from "./Icons";

export const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/place", label: "Places to stay", end: true },
  { to: "/nfts", label: "NFTs" },
  { to: "/community", label: "Community" },
];

export default function Header() {
  const { favorites, wallet, openWallet, openMenu } = useGlobalContext();
  const connected = wallet.status === "connected";
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link to="/" className="logo">
          <img src={NavLogo} alt="Metabnb, home" height="32" />
        </Link>
        <nav aria-label="Main" className="nav-desktop">
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className="nav-link">
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <Link to="/place?saved=1" className="icon-btn saved-link" aria-label={`Saved places, ${favorites.length}`}>
            <HeartIcon className="icon" />
            {favorites.length > 0 && (
              <span className="badge" aria-hidden="true">
                {favorites.length}
              </span>
            )}
          </Link>
          <button type="button" className="btn connect" onClick={openWallet} aria-haspopup="dialog">
            {connected ? (
              <>
                {shortAddress(wallet.address)}
                <span className="sr-only"> connected wallet</span>
              </>
            ) : (
              "Connect wallet"
            )}
          </button>
          <button type="button" className="icon-btn menu-btn" onClick={openMenu} aria-haspopup="dialog" aria-label="Open menu">
            <MenuIcon className="icon" />
          </button>
        </div>
      </div>
    </header>
  );
}
