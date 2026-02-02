import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * App header with branding and search bar.
 */
export function Header({ query, onQueryChange }) {
  const location = useLocation();

  return (
    <header className="appHeader">
      <div className="container appHeader__inner">
        <div className="appHeader__brand">
          <Link to={{ pathname: "/", search: location.search }} className="brandLink" aria-label="Recipe Explorer home">
            <span className="brandMark" aria-hidden="true" />
            <span className="brandText">Recipe Explorer</span>
          </Link>
          <span className="brandSub">Browse, filter, and cook.</span>
        </div>

        <div className="appHeader__search" role="search">
          <label className="srOnly" htmlFor="recipeSearch">
            Search recipes
          </label>
          <input
            id="recipeSearch"
            className="searchInput"
            type="search"
            placeholder="Search by title or ingredient…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}
