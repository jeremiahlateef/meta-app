import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* A real form: labelled input, submit button, works with Enter. */
export default function SearchForm({ className = "" }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  return (
    <form
      className={`search-form ${className}`}
      role="search"
      aria-label="Search places"
      onSubmit={(e) => {
        e.preventDefault();
        const q = value.trim();
        navigate(q ? `/place?q=${encodeURIComponent(q)}` : "/place");
      }}
    >
      <label htmlFor="hero-search" className="sr-only">
        Search for a place or a type of place
      </label>
      <input
        id="hero-search"
        type="search"
        name="q"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search for a place, such as castle"
        autoComplete="off"
      />
      <button type="submit" className="btn">
        Search
      </button>
    </form>
  );
}
