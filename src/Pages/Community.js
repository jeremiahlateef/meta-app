import React from "react";
import { Link } from "react-router-dom";
import { FAQ } from "../data/faq";
import { usePageTitle } from "../hooks";

const WAYS = [
  { title: "Share your places", text: "Build a place and list it for rent. Landlords earn MBT for every night booked." },
  { title: "Review your stays", text: "Tell other guests what a place is really like, from the view to the Wi-Fi." },
  { title: "Shape the roadmap", text: "Members vote on which places and features are added next." },
];

const RULES = [
  "Be kind. Treat hosts and guests with respect.",
  "Describe places honestly, including their limits.",
  "Keep photos and descriptions free of hate, harassment and spam.",
  "Describe images in your listings so everyone can use them.",
];

export default function Community() {
  usePageTitle("Community");
  return (
    <div className="wrap page">
      <h1>Community</h1>
      <p className="lede">Guests, landlords and builders making the metaverse a place to stay.</p>

      <h2 className="section-title left">Ways to take part</h2>
      <ul className="cards-3">
        {WAYS.map((w) => (
          <li key={w.title} className="panel">
            <h3>{w.title}</h3>
            <p>{w.text}</p>
          </li>
        ))}
      </ul>

      <div className="two-col">
        <section aria-labelledby="rules-title">
          <h2 id="rules-title" className="section-title left">
            Community guidelines
          </h2>
          <ul className="rules">
            {RULES.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="faq-title">
          <h2 id="faq-title" className="section-title left">
            Frequently asked questions
          </h2>
          <div className="faq">
            {FAQ.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <p>
        Ready to look around? <Link to="/place">Browse places to stay</Link>.
      </p>
    </div>
  );
}
