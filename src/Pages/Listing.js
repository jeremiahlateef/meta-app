import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorSummary from "../Components/ErrorSummary";
import FavoriteButton from "../Components/FavoriteButton";
import Rating from "../Components/Rating";
import { findListing, formatMBT } from "../data/listings";
import { useGlobalContext } from "../context";
import { usePageTitle } from "../hooks";
import NotFound from "./NotFound";

const pad = (n) => String(n).padStart(2, "0");
const isoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parts = (iso) => iso.split("-").map(Number);
const dayNumber = (iso) => {
  const [y, m, d] = parts(iso);
  return Math.round(Date.UTC(y, m - 1, d) / 86400000);
};
const longDate = (iso) => {
  const [y, m, d] = parts(iso);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" });
};

function Booking({ listing }) {
  const { wallet, openWallet, announce } = useGlobalContext();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = isoDate(tomorrow);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");
  const [errors, setErrors] = useState([]);
  const [needWallet, setNeedWallet] = useState(false);
  const [confirmed, setConfirmed] = useState(null);
  const confirmRef = useRef(null);

  const nights = checkIn && checkOut ? dayNumber(checkOut) - dayNumber(checkIn) : 0;
  const maxNights = listing.weeks * 7;
  const validNights = nights > 0 && nights <= maxNights;
  const subtotal = validNights ? nights * listing.price : 0;
  const fee = subtotal * 0.03;
  const total = subtotal + fee;

  useEffect(() => {
    if (confirmed && confirmRef.current) confirmRef.current.focus();
  }, [confirmed]);

  // If the visitor connects a wallet after being asked to, say so.
  useEffect(() => {
    if (needWallet && wallet.status === "connected") {
      setNeedWallet(false);
      announce("Wallet connected. You can now reserve this place.");
    }
  }, [needWallet, wallet.status, announce]);

  const validate = () => {
    const found = [];
    if (!checkIn) found.push({ id: "check-in", message: "Choose a check-in date." });
    else if (checkIn < minDate) found.push({ id: "check-in", message: "Check-in must be tomorrow or later." });
    if (!checkOut) found.push({ id: "check-out", message: "Choose a check-out date." });
    else if (checkIn && nights <= 0) found.push({ id: "check-out", message: "Check-out must be after check-in." });
    else if (checkIn && nights > maxNights) found.push({ id: "check-out", message: `This place is available for up to ${maxNights} nights. Choose an earlier check-out date.` });
    const g = Number(guests);
    if (!(g >= 1 && g <= listing.guests)) found.push({ id: "guests", message: `Choose between 1 and ${listing.guests} guests.` });
    return found;
  };

  const errorFor = (id) => errors.find((e) => e.id === id);

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    setConfirmed(null);
    if (found.length) return;
    if (wallet.status !== "connected") {
      setNeedWallet(true);
      openWallet();
      return;
    }
    setConfirmed({ checkIn, checkOut, nights, guests: Number(guests), total, ref: `MB-${Math.random().toString(36).slice(2, 8).toUpperCase()}` });
  };

  const field = (id) => {
    const err = errorFor(id);
    return err ? { "aria-invalid": "true", "aria-describedby": `${id}-error` } : {};
  };

  if (confirmed) {
    return (
      <div className="panel confirmation" ref={confirmRef} tabIndex={-1} role="status">
        <h2>Reservation confirmed (demo)</h2>
        <p>
          <strong>{listing.name}</strong>
        </p>
        <dl className="summary">
          <div>
            <dt>Reference</dt>
            <dd>{confirmed.ref}</dd>
          </div>
          <div>
            <dt>Check-in</dt>
            <dd>{longDate(confirmed.checkIn)}</dd>
          </div>
          <div>
            <dt>Check-out</dt>
            <dd>{longDate(confirmed.checkOut)}</dd>
          </div>
          <div>
            <dt>Nights</dt>
            <dd>{confirmed.nights}</dd>
          </div>
          <div>
            <dt>Guests</dt>
            <dd>{confirmed.guests}</dd>
          </div>
          <div className="total">
            <dt>Total</dt>
            <dd>{formatMBT(confirmed.total)}</dd>
          </div>
        </dl>
        <p className="muted">Nothing was charged and no reservation exists. This is a demo.</p>
        <button type="button" className="btn btn-outline" onClick={() => setConfirmed(null)}>
          Make another reservation
        </button>
      </div>
    );
  }

  return (
    <form className="panel booking" onSubmit={onSubmit} noValidate aria-labelledby="book-title">
      <h2 id="book-title">Reserve this place</h2>
      <p className="card-price">
        <strong>{formatMBT(listing.price)}</strong> per night
      </p>
      <ErrorSummary errors={errors} />
      <div className="field">
        <label htmlFor="check-in">Check-in</label>
        <input id="check-in" type="date" value={checkIn} min={minDate} required onChange={(e) => setCheckIn(e.target.value)} {...field("check-in")} />
        {errorFor("check-in") && (
          <p className="error-text" id="check-in-error">
            Error: {errorFor("check-in").message}
          </p>
        )}
      </div>
      <div className="field">
        <label htmlFor="check-out">Check-out</label>
        <input id="check-out" type="date" value={checkOut} min={checkIn || minDate} required onChange={(e) => setCheckOut(e.target.value)} {...field("check-out")} />
        {errorFor("check-out") && (
          <p className="error-text" id="check-out-error">
            Error: {errorFor("check-out").message}
          </p>
        )}
      </div>
      <div className="field">
        <label htmlFor="guests">Guests</label>
        <select id="guests" value={guests} onChange={(e) => setGuests(e.target.value)} {...field("guests")}>
          {Array.from({ length: listing.guests }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
        {errorFor("guests") && (
          <p className="error-text" id="guests-error">
            Error: {errorFor("guests").message}
          </p>
        )}
      </div>
      <p className="hint">Available for up to {maxNights} nights in one stay.</p>

      <div role="status" className="price-summary">
        {validNights ? (
          <dl className="summary">
            <div>
              <dt>
                {nights} {nights === 1 ? "night" : "nights"} × {formatMBT(listing.price)}
              </dt>
              <dd>{formatMBT(subtotal)}</dd>
            </div>
            <div>
              <dt>Network fee (3%)</dt>
              <dd>{formatMBT(fee)}</dd>
            </div>
            <div className="total">
              <dt>Total</dt>
              <dd>{formatMBT(total)}</dd>
            </div>
          </dl>
        ) : null}
        {needWallet && wallet.status !== "connected" ? <p>Connect a wallet to finish your reservation.</p> : null}
      </div>

      <button type="submit" className="btn btn-block" aria-haspopup={wallet.status === "connected" ? undefined : "dialog"}>
        {wallet.status === "connected" ? "Reserve" : "Connect wallet to reserve"}
      </button>
    </form>
  );
}

export default function Listing() {
  const { id } = useParams();
  const listing = findListing(id);
  usePageTitle(listing ? listing.name : "Place not found");

  if (!listing) return <NotFound what="place" />;

  return (
    <div className="wrap page">
      <nav aria-label="Breadcrumb" className="crumbs">
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/place">Places to stay</Link>
          </li>
          <li>
            <span aria-current="page">{listing.name}</span>
          </li>
        </ol>
      </nav>

      <div className="listing-grid">
        <div className="listing-media">
          <img src={listing.image} alt={listing.alt} width="260" height="265" />
          <FavoriteButton id={listing.id} name={listing.name} />
        </div>
        <div className="listing-info">
          <p className="eyebrow">{listing.category}</p>
          <h1>{listing.name}</h1>
          <Rating value={listing.rating} />
          <p>{listing.description}</p>
          <dl className="facts">
            <div>
              <dt>Guests</dt>
              <dd>Up to {listing.guests}</dd>
            </div>
            <div>
              <dt>Bedrooms</dt>
              <dd>{listing.bedrooms}</dd>
            </div>
            <div>
              <dt>Distance</dt>
              <dd>{listing.distance.toLocaleString("en-US")} km away</dd>
            </div>
            <div>
              <dt>Available</dt>
              <dd>{listing.weeks} weeks</dd>
            </div>
          </dl>
          <h2 className="small-heading">What this place offers</h2>
          <ul className="amenities">
            {listing.amenities.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
        <Booking listing={listing} key={listing.id} />
      </div>
    </div>
  );
}
