import React from "react";

/**
 * PUBLIC_INTERFACE
 * Skeleton placeholder for recipe cards.
 */
export function SkeletonCard() {
  return (
    <div className="card card--skeleton" aria-hidden="true">
      <div className="skeleton skeleton--media" />
      <div className="card__body">
        <div className="skeleton skeleton--line" style={{ width: "70%" }} />
        <div className="skeleton skeleton--line" style={{ width: "92%" }} />
        <div className="skeleton skeleton--line" style={{ width: "60%" }} />
      </div>
    </div>
  );
}
