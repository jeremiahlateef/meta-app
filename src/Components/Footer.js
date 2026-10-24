import React from "react";
import { Link } from "react-router-dom";
import FootLogo from "../Assets/metabnbwhitelogo.svg";

const GROUPS = [
  {
    title: "Places",
    links: [
      { to: "/place", label: "All places" },
      { to: "/place?category=Castle", label: "Castles" },
      { to: "/place?category=Beach", label: "Beaches" },
      { to: "/place?category=Cabins", label: "Cabins" },
      { to: "/place?saved=1", label: "Saved places" },
    ],
  },
  {
    title: "Community",
    links: [
      { to: "/nfts", label: "NFTs" },
      { to: "/community", label: "Community" },
    ],
  },
  {
    title: "About",
    links: [{ to: "/accessibility", label: "Accessibility statement" }],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <img src={FootLogo} alt="Metabnb" height="32" />
          <p>A demo marketplace for renting places in the metaverse. Nothing here is for sale.</p>
          <p>
            Designed and built by Jeremiah Lateef.{" "}
            <a href="https://www.linkedin.com/in/jeremiah-lateef/" target="_blank" rel="noopener noreferrer">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
        {GROUPS.map((g) => (
          <nav key={g.title} aria-labelledby={`foot-${g.title}`}>
            <h2 id={`foot-${g.title}`} className="footer-title">
              {g.title}
            </h2>
            <ul>
              {g.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="wrap copyright">
        <p>&copy; 2022 Metabnb. Demo project: places, prices and ratings are samples.</p>
      </div>
    </footer>
  );
}
