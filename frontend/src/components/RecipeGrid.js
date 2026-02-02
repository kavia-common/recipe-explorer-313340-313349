import React from "react";
import { RecipeCard } from "./RecipeCard";
import { SkeletonCard } from "./SkeletonCard";
import { EmptyState } from "./EmptyState";

/**
 * PUBLIC_INTERFACE
 * Grid/list of recipe cards with loading and empty states.
 */
export function RecipeGrid({ recipes, loading }) {
  if (loading) {
    return (
      <div className="grid" aria-label="Loading recipes">
        {Array.from({ length: 8 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid" aria-label="Recipe results">
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}
