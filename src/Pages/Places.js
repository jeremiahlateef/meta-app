import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ListingCard from "../Components/ListingCard";
import { LISTINGS, CATEGORIES } from "../data/listings";
import { useGlobalContext } from "../context";
import { usePageTitle, useDebounced } from "../hooks";

const SORTS = {
  recommended: { label: "Recommended", fn: () => 0 },
  "price-asc": { label: "Price: low to high", fn: (a, b) => a.price - b.price },
  "price-desc": { label: "Price: high to low", fn: (a, b) => b.price - a.price },
  rating: { label: "Top rated", fn: (a, b) => b.rating - a.rating },
  nearest: { label: "Nearest first", fn: (a, b) => a.distance - b.distance },
};
const MAX_PRICES = [2, 3, 4];

export default function Places() {
  const [params, setParams] = useSearchParams();
  const { favorites } = useGlobalContext();

  // The URL is the single source of truth, so links, Back and reload all work.
  const q = params.get("q") || "";
  const category = CATEGORIES.includes(params.get("category")) ? params.get("category") : "";
  const sort = SORTS[params.get("sort")] ? params.get("sort") : "recommended";
  const max = MAX_PRICES.includes(Number(params.get("max"))) ? Number(params.get("max")) : 0;
  const saved = params.get("saved") === "1";

  usePageTitle(saved ? "Saved places" : category ? `${category} places to stay` : "Places to stay");

  const update = (changes) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([k, v]) => {
      if (v === "" || v === "0" || v === false || v === 0) next.delete(k);
      else next.set(k, v === true ? "1" : String(v));
    });
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return LISTINGS.filter((l) => {
      if (saved && !favorites.includes(l.id)) return false;
      if (category && l.category !== category) return false;
      if (max && l.price > max) return false;
      if (term && !`${l.name} ${l.category} ${l.description}`.toLowerCase().includes(term)) return false;
      return true;
    })
      .slice()
      .sort(SORTS[sort].fn);
  }, [q, category, max, saved, sort, favorites]);

  const statusNow = results.length === 0 ? "No places match your filters." : `${results.length} ${results.length === 1 ? "place" : "places"} found.`;
  // Wait until typing settles so the live region is not read on every key.
  const status = useDebounced(statusNow, 500);

  return (
    <div className="wrap page">
      <h1>{saved ? "Saved places" : "Places to stay"}</h1>
      <p className="lede">{saved ? "Places you have saved on this device." : "Browse castles, cabins, beaches and whole cities. All prices are per night in MBT."}</p>

      <form className="filters" role="search" aria-label="Filter and sort places" onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label htmlFor="q">Search by name or type</label>
          <input id="q" type="search" value={q} onChange={(e) => update({ q: e.target.value })} autoComplete="off" />
        </div>
        <fieldset className="category-group">
          <legend>Category</legend>
          <div className="seg">
            {["", ...CATEGORIES].map((c) => (
              <label key={c || "all"}>
                <input type="radio" name="category" value={c} checked={category === c} onChange={() => update({ category: c })} />
                <span>{c || "All"}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="field">
          <label htmlFor="sort">Sort by</label>
          <select id="sort" value={sort} onChange={(e) => update({ sort: e.target.value === "recommended" ? "" : e.target.value })}>
            {Object.entries(SORTS).map(([k, s]) => (
              <option key={k} value={k}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="max">Price per night</label>
          <select id="max" value={max} onChange={(e) => update({ max: e.target.value })}>
            <option value="0">Any price</option>
            {MAX_PRICES.map((p) => (
              <option key={p} value={p}>
                Up to {p} MBT
              </option>
            ))}
          </select>
        </div>
        <label className="check">
          <input type="checkbox" checked={saved} onChange={(e) => update({ saved: e.target.checked })} />
          Saved places only
        </label>
        <button type="button" className="btn btn-outline" onClick={() => setParams({}, { replace: true })}>
          Reset filters
        </button>
      </form>

      <p className="results-status" role="status">
        {status}
      </p>

      <h2 className="sr-only">Results</h2>
      {results.length > 0 ? (
        <ul className="grid">
          {results.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </ul>
      ) : (
        <div className="empty">
          <h3>{saved && !favorites.length ? "You have not saved any places yet" : "No places match your filters"}</h3>
          <p>{saved && !favorites.length ? "Use the heart on any place to save it here." : "Try another category, a higher price or a different search."}</p>
          <button type="button" className="btn" onClick={() => setParams({}, { replace: true })}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
