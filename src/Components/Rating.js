import React from "react";
import { StarIcon } from "./Icons";

/* The star rating used to be a picture of five stars for every place.
   Now the value is real text, and the star is only decoration. */
export default function Rating({ value }) {
  return (
    <p className="rating">
      <StarIcon className="rating-star" />
      <span aria-hidden="true">{value.toFixed(1)}</span>
      <span className="sr-only">Rated {value.toFixed(1)} out of 5</span>
    </p>
  );
}
