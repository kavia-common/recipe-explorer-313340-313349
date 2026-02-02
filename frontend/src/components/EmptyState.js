import React from "react";

/**
 * PUBLIC_INTERFACE
 * Empty state shown when no recipes match filters/search.
 */
export function EmptyState({ title = "No recipes found", description = "Try adjusting your search or filters." }) {
  return (
    <div className="emptyState" role="status" aria-live="polite">
      <h2 className="emptyState__title">{title}</h2>
      <p className="emptyState__desc">{description}</p>
    </div>
  );
}
