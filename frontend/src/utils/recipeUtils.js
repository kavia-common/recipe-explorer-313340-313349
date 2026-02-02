/**
 * Utility functions for recipe filtering, searching, and formatting.
 */

/** @typedef {{ item: string, quantity: string }} Ingredient */
/** @typedef {{ calories: number, protein: number, fat: number, carbs: number }} Nutrition */
/** @typedef {{
 *  id: string,
 *  title: string,
 *  image: string,
 *  description: string,
 *  ingredients: Ingredient[],
 *  steps: string[],
 *  time: number,
 *  servings: number,
 *  cuisine: string,
 *  difficulty: string,
 *  dietary: string[],
 *  tags: string[],
 *  nutrition: Nutrition
 * }} Recipe */

/**
 * Create a normalized searchable blob for a recipe.
 * @param {Recipe} recipe
 * @returns {string}
 */
export function buildSearchText(recipe) {
  const ingredientsText = (recipe.ingredients || [])
    .map((i) => `${i.item} ${i.quantity || ""}`.trim())
    .join(" ");
  const tagsText = [...(recipe.tags || []), ...(recipe.dietary || [])].join(" ");
  return `${recipe.title} ${recipe.description} ${ingredientsText} ${tagsText} ${recipe.cuisine} ${recipe.difficulty}`
    .toLowerCase()
    .trim();
}

/**
 * Filter + search recipes.
 * @param {Recipe[]} recipes
 * @param {{
 *  query: string,
 *  cuisine: string,
 *  difficulty: string,
 *  dietary: string[]
 * }} params
 * @returns {Recipe[]}
 */
export function filterRecipes(recipes, params) {
  const query = (params.query || "").toLowerCase().trim();
  const cuisine = params.cuisine || "All";
  const difficulty = params.difficulty || "All";
  const dietary = params.dietary || [];

  return (recipes || []).filter((r) => {
    if (cuisine !== "All" && r.cuisine !== cuisine) return false;
    if (difficulty !== "All" && r.difficulty !== difficulty) return false;

    if (dietary.length > 0) {
      const recipeDietary = new Set((r.dietary || []).map((d) => d.toLowerCase()));
      for (const selected of dietary) {
        if (!recipeDietary.has(selected.toLowerCase())) return false;
      }
    }

    if (query) {
      const blob = r.__searchText || buildSearchText(r);
      return blob.includes(query);
    }

    return true;
  });
}

/**
 * Build unique sorted option lists from recipes.
 * @param {Recipe[]} recipes
 * @returns {{ cuisines: string[], difficulties: string[], dietary: string[] }}
 */
export function buildFilterOptions(recipes) {
  const cuisines = new Set();
  const difficulties = new Set();
  const dietary = new Set();

  (recipes || []).forEach((r) => {
    if (r.cuisine) cuisines.add(r.cuisine);
    if (r.difficulty) difficulties.add(r.difficulty);
    (r.dietary || []).forEach((d) => dietary.add(d));
  });

  return {
    cuisines: ["All", ...Array.from(cuisines).sort()],
    difficulties: ["All", ...Array.from(difficulties).sort()],
    dietary: Array.from(dietary).sort()
  };
}
