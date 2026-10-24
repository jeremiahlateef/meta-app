import React from "react";
import { Link } from "react-router-dom";
import SearchForm from "../Components/SearchForm";
import ListingCard from "../Components/ListingCard";
import { LISTINGS } from "../data/listings";
import { usePageTitle } from "../hooks";
import Desktop from "../Images/desktop-image.png";
import MetaImage from "../Images/nft-multiple.png";
import MBToken from "../Assets/mbtoken.svg";
import Metamask from "../Assets/metamaskLogo.svg";
import OpenSea from "../Assets/openseaLogo.svg";

const FEATURED = [...LISTINGS].sort((a, b) => b.rating - a.rating).slice(0, 8);

const STEPS = [
  { title: "Connect your wallet", text: "Link a wallet so you can pay in MBT. In this demo no real wallet is used." },
  { title: "Choose a place", text: "Browse castles, beaches, cabins and whole cities, or search for what you have in mind." },
  { title: "Pick your dates", text: "Check in tomorrow or plan weeks ahead, then reserve in one step." },
];

export default function Home() {
  usePageTitle("");
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <div className="hero-text">
            <h1 id="hero-title">
              Rent a <span className="accent">place</span> away from <span className="accent">home</span> in the{" "}
              <span className="accent">metaverse</span>
            </h1>
            <p className="lede">
              We provide you access to luxury and affordable houses in the metaverse. Turn your imagination into reality from the comfort of your own
              home.
            </p>
            <SearchForm />
          </div>
          <div className="hero-image">
            <img
              src={Desktop}
              alt="Collage of four isometric illustrations: a modern house with a pool, a market stand, a snow-covered cottage and a walled castle."
              width="476"
              height="459"
            />
          </div>
        </div>
      </section>

      <section className="partners" aria-labelledby="partners-title">
        <h2 id="partners-title" className="sr-only">
          Works with
        </h2>
        <ul className="wrap partner-list">
          <li>
            <img src={MBToken} alt="MBToken" height="32" />
          </li>
          <li>
            <img src={Metamask} alt="MetaMask" height="32" />
          </li>
          <li>
            <img src={OpenSea} alt="OpenSea" height="32" />
          </li>
        </ul>
      </section>

      <section className="section" aria-labelledby="featured-title">
        <div className="wrap">
          <h2 id="featured-title" className="section-title">
            Inspiration for your next adventure
          </h2>
          <ul className="grid">
            {FEATURED.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </ul>
          <p className="center">
            <Link to="/place" className="btn">
              View all places
            </Link>
          </p>
        </div>
      </section>

      <section className="section alt" aria-labelledby="how-title">
        <div className="wrap">
          <h2 id="how-title" className="section-title">
            How it works
          </h2>
          <ol className="steps">
            {STEPS.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="promo" aria-labelledby="nft-title">
        <div className="wrap promo-grid">
          <div>
            <h2 id="nft-title">Metabnb NFTs</h2>
            <p>
              Discover our NFT membership collection. Loyal customers get membership NFTs that unlock discounts, early access and other exclusive
              services.
            </p>
            <Link to="/nfts" className="btn btn-light">
              Learn more<span className="sr-only"> about Metabnb NFTs</span>
            </Link>
          </div>
          <img
            src={MetaImage}
            alt="Three tilted isometric room illustrations overlapping: a purple gaming room, a study with a map on the wall and an orange kitchen."
            width="704"
            height="575"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}
