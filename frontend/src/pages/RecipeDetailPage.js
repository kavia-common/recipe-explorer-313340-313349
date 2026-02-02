import React, { useMemo } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import recipesData from "../data/recipes.json";
import { Badge } from "../components/Badge";
import { Footer } from "../components/Footer";
import { buildSearchText } from "../utils/recipeUtils";

/**
 * PUBLIC_INTERFACE
 * Detail page for a recipe.
 */
export function RecipeDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const recipe = useMemo(() => {
    const r = (recipesData || []).find((x) => x.id === id);
    return r ? { ...r, __searchText: buildSearchText(r) } : null;
  }, [id]);

  if (!recipe) {
    return (
      <div className="app">
        <div className="container main" style={{ paddingTop: 24 }}>
          <Link to={{ pathname: "/", search: location.search }} className="btn btn--ghost">
            ← Back
          </Link>
          <h1 style={{ marginTop: 16 }}>Recipe not found</h1>
          <p className="muted">The recipe you’re looking for doesn’t exist in the mock dataset.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="detailHeader">
        <div className="container detailHeader__inner">
          <div className="detailHeader__nav">
            <button type="button" className="btn btn--ghost" onClick={() => navigate(-1)}>
              ← Back
            </button>
            <Link to={{ pathname: "/", search: location.search }} className="btn btn--ghost">
              All recipes
            </Link>
          </div>

          <div className="detailHero">
            <div className="detailHero__media">
              <img className="detailHero__image" src={recipe.image} alt={recipe.title} />
            </div>

            <div className="detailHero__content">
              <div className="detailHero__badges">
                <Badge tone="primary">{recipe.cuisine}</Badge>
                <Badge tone="default">{recipe.difficulty}</Badge>
                <Badge tone="secondary">{recipe.time} min</Badge>
                <Badge tone="secondary">{recipe.servings} servings</Badge>
              </div>

              <h1 className="detailTitle">{recipe.title}</h1>
              <p className="detailDesc">{recipe.description}</p>

              <div className="detailHero__tags">
                {(recipe.dietary || []).map((d) => (
                  <Badge key={d} tone="success">
                    {d}
                  </Badge>
                ))}
                {(recipe.tags || []).map((t) => (
                  <Badge key={t} tone="secondary">
                    {t}
                  </Badge>
                ))}
              </div>

              <div className="nutrition">
                <h2 className="sectionTitle">Nutrition (mock)</h2>
                <div className="nutrition__grid">
                  <div className="stat">
                    <div className="stat__label">Calories</div>
                    <div className="stat__value">{recipe.nutrition.calories}</div>
                  </div>
                  <div className="stat">
                    <div className="stat__label">Protein</div>
                    <div className="stat__value">{recipe.nutrition.protein}g</div>
                  </div>
                  <div className="stat">
                    <div className="stat__label">Fat</div>
                    <div className="stat__value">{recipe.nutrition.fat}g</div>
                  </div>
                  <div className="stat">
                    <div className="stat__label">Carbs</div>
                    <div className="stat__value">{recipe.nutrition.carbs}g</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container main">
        <div className="detailBody">
          <section className="panel" aria-label="Ingredients">
            <h2 className="sectionTitle">Ingredients</h2>
            <ul className="list">
              {recipe.ingredients.map((ing, idx) => (
                <li key={`${ing.item}-${idx}`} className="list__item">
                  <span className="list__strong">{ing.item}</span>
                  <span className="muted">{ing.quantity}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel" aria-label="Steps">
            <h2 className="sectionTitle">Steps</h2>
            <ol className="steps">
              {recipe.steps.map((s, idx) => (
                <li key={idx} className="steps__item">
                  {s}
                </li>
              ))}
            </ol>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
