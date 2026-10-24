import React, { useState } from "react";
import { NFT_TIERS } from "../data/nfts";
import { usePageTitle } from "../hooks";

export default function Nfts() {
  usePageTitle("NFT memberships");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setDone("");
    const v = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
      setError(v ? "Enter an email address like name@example.com." : "Enter your email address.");
      document.getElementById("waitlist-email")?.focus();
      return;
    }
    setError("");
    setEmail("");
    setDone("You are on the list. This is a demo, so no email was sent.");
  };

  return (
    <div className="wrap page">
      <h1>Metabnb NFTs</h1>
      <p className="lede">
        Membership NFTs for loyal guests. Each tier unlocks discounts, early access and a say in which places are added next.
      </p>
      <p className="notice">
        <strong>Demo only.</strong> Memberships are shown as an example and are not for sale.
      </p>

      <h2 className="section-title left">Membership collection</h2>
      <ul className="grid tiers">
        {NFT_TIERS.map((t) => (
          <li key={t.id}>
            <article className="card tier">
              <div className="card-media">
                <img src={t.image} alt={t.alt} width="434" height="353" loading="lazy" />
              </div>
              <div className="card-body">
                <p className="card-category">{t.tier} tier</p>
                <h3 className="card-title">{t.name}</h3>
                <p className="card-price">
                  <strong>{t.price}</strong>
                </p>
                <ul className="perks">
                  {t.perks.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <section className="panel waitlist" aria-labelledby="waitlist-title">
        <h2 id="waitlist-title">Join the waitlist</h2>
        <p>Tell us where to send news when memberships open.</p>
        <form onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="waitlist-email">Email address</label>
            <input
              id="waitlist-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={error ? "true" : undefined}
              aria-describedby={error ? "waitlist-error" : undefined}
            />
            {error && (
              <p className="error-text" id="waitlist-error">
                Error: {error}
              </p>
            )}
          </div>
          <button type="submit" className="btn">
            Join the waitlist
          </button>
          <p className="status-ok" role="status">
            {done}
          </p>
        </form>
      </section>
    </div>
  );
}
