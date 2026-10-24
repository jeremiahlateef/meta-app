import React from "react";
import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks";

export default function NotFound({ what = "page" }) {
  usePageTitle(`${what === "place" ? "Place" : "Page"} not found`);
  return (
    <div className="wrap page narrow">
      <h1>{what === "place" ? "We could not find that place" : "Page not found"}</h1>
      <p className="lede">The link may be old or mistyped.</p>
      <p>
        <Link to="/place" className="btn">
          Browse all places
        </Link>{" "}
        <Link to="/" className="btn btn-outline">
          Go to the home page
        </Link>
      </p>
    </div>
  );
}
