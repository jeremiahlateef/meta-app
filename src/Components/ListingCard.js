import React from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import Rating from "./Rating";
import { formatMBT } from "../data/listings";

export default function ListingCard({ listing }) {
  const { id, name, category, image, alt, price, distance, weeks, rating } = listing;
  return (
    <li>
      <article className="card">
        <div className="card-media">
          <img src={image} alt={alt} width="260" height="265" loading="lazy" />
          <FavoriteButton id={id} name={name} />
        </div>
        <div className="card-body">
          <h3 className="card-title">
            <Link to={`/place/${id}`} className="card-link">
              {name}
            </Link>
          </h3>
          <p className="card-category">{category}</p>
          <p className="card-price">
            <strong>{formatMBT(price)}</strong> per night
          </p>
          <p className="card-meta">
            {distance.toLocaleString("en-US")} km away · available for {weeks} weeks
          </p>
          <Rating value={rating} />
        </div>
      </article>
    </li>
  );
}
