import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Encode/decode list values safely into URL params.
 * @param {string[]} values
 * @returns {string}
 */
function encodeList(values) {
  return (values || []).map(encodeURIComponent).join(",");
}

/**
 * @param {string} value
 * @returns {string[]}
 */
function decodeList(value) {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => decodeURIComponent(v))
    .map((v) => v.trim())
    .filter(Boolean);
}

/**
 * PUBLIC_INTERFACE
 * Hook to store recipe list UI state in URL search params.
 * This preserves the state when navigating to a detail route and back.
 */
export function useRecipeSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const state = useMemo(() => {
    return {
      query: searchParams.get("q") || "",
      cuisine: searchParams.get("cuisine") || "All",
      difficulty: searchParams.get("difficulty") || "All",
      dietary: decodeList(searchParams.get("dietary"))
    };
  }, [searchParams]);

  // PUBLIC_INTERFACE
  const setState = (patch) => {
    const next = {
      ...state,
      ...patch
    };

    const params = new URLSearchParams(searchParams);

    if (next.query) params.set("q", next.query);
    else params.delete("q");

    if (next.cuisine && next.cuisine !== "All") params.set("cuisine", next.cuisine);
    else params.delete("cuisine");

    if (next.difficulty && next.difficulty !== "All") params.set("difficulty", next.difficulty);
    else params.delete("difficulty");

    if (next.dietary && next.dietary.length > 0) params.set("dietary", encodeList(next.dietary));
    else params.delete("dietary");

    setSearchParams(params, { replace: true });
  };

  return { state, setState };
}
