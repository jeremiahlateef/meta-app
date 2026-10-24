import React from "react";
import { useGlobalContext } from "../context";
import { HeartIcon } from "./Icons";

/* The artwork has a heart drawn into the corner of each picture. It looks
   like a control but is only pixels. This real button sits exactly over it. */
export default function FavoriteButton({ id, name }) {
  const { isFavorite, toggleFavorite } = useGlobalContext();
  const saved = isFavorite(id);
  return (
    <button
      type="button"
      className="fav"
      aria-pressed={saved}
      onClick={() => toggleFavorite(id, name)}
    >
      <HeartIcon className="fav-icon" />
      <span className="sr-only">Save {name} to your places</span>
    </button>
  );
}
