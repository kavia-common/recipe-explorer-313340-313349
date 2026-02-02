import React, { useEffect, useMemo, useState } from "react";
import recipesData from "../data/recipes.json";
import { Header } from "../components/Header";
import { Filters } from "../components/Filters";
import { RecipeGrid } from "../components/RecipeGrid";
import { Footer } from "../components/Footer";
import { buildFilterOptions, filterRecipes, buildSearchText } from "../utils/recipeUtils";
import { useRecipeSearchParams } from "../hooks/useRecipeSearchParams";

/**
 * PUBLIC_INTERFACE
 * Main page to browse/search/filter recipes.
 */
export function RecipeListPage() {
  const { state, setState } = useRecipeSearchParams();
  const [loading, setLoading] = useState(true);

  const recipes = useMemo(() => {
    // Pre-compute search blobs once.
    return (recipesData || []).map((r) => ({ ...r, __searchText: buildSearchText(r) }));
  }, []);

  const options = useMemo(() => buildFilterOptions(recipes), [recipes]);

  const filtered = useMemo(() => {
    return filterRecipes(recipes, state);
  }, [recipes, state]);

  useEffect(() => {
    // Simulate small loading delay for skeleton; keeps UX pleasant and shows robustness.
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  const clear = () => {
    setState({ query: "", cuisine: "All", difficulty: "All", dietary: [] });
  };

  return (
    <div className="app">
      <Header query={state.query} onQueryChange={(q) => setState({ query: q })} />

      <main className="container main">
        <div className="layout">
          <Filters
            options={options}
            value={state}
            onChange={(patch) => setState(patch)}
            onClear={clear}
          />

          <section className="content" aria-label="Recipes">
            <div className="content__header">
              <div>
                <h1 className="pageTitle">Recipes</h1>
                <p className="muted">
                  {filtered.length} result{filtered.length === 1 ? "" : "s"} • {state.cuisine !== "All" ? state.cuisine : "All cuisines"}
                </p>
              </div>
            </div>

            <RecipeGrid recipes={filtered} loading={loading} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
