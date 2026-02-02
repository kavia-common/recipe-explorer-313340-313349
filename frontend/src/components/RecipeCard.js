import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "./Badge";

/**
 * PUBLIC_INTERFACE
 * Card for a single recipe.
 */
export function RecipeCard({ recipe }) {
  const location = useLocation();

  return (
    <article className="card" aria-label={recipe.title}>
      <Link
        className="card__mediaLink"
        to={{ pathname: `/recipe/${recipe.id}`, search: location.search }}
        aria-label={`View recipe: ${recipe.title}`}
      >
        <img className="card__image" src={recipe.image} alt={recipe.title} loading="lazy" />
      </Link>

      <div className="card__body">
        <div className="card__meta">
          <Badge tone="primary">{recipe.cuisine}</Badge>
          <Badge tone="default">{recipe.difficulty}</Badge>
          {(recipe.dietary || []).slice(0, 2).map((d) => (
            <Badge key={d} tone="success">
              {d}
            </Badge>
          ))}
        </div>

        <h3 className="card__title">
          <Link to={{ pathname: `/recipe/${recipe.id}`, search: location.search }} className="card__titleLink">
            {recipe.title}
          </Link>
        </h3>

        <p className="card__desc">{recipe.description}</p>

        <div className="card__tags">
          {(recipe.tags || []).slice(0, 3).map((t) => (
            <Badge key={t} tone="secondary">
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
