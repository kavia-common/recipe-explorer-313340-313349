import React from "react";
import { Badge } from "./Badge";

/**
 * PUBLIC_INTERFACE
 * Filters panel for cuisine, difficulty, and dietary preferences.
 */
export function Filters({
  options,
  value,
  onChange,
  onClear
}) {
  const dietaryOptions = options?.dietary || [];
  const selectedDietary = value?.dietary || [];

  const toggleDietary = (item) => {
    const lower = item.toLowerCase();
    const set = new Set(selectedDietary.map((d) => d.toLowerCase()));
    const next = new Set(set);
    if (next.has(lower)) next.delete(lower);
    else next.add(lower);

    // Preserve original casing from options list.
    const normalized = Array.from(next).map((d) => dietaryOptions.find((x) => x.toLowerCase() === d) || d);
    onChange({ dietary: normalized });
  };

  const isSelected = (item) => selectedDietary.map((d) => d.toLowerCase()).includes(item.toLowerCase());

  return (
    <aside className="filters" aria-label="Filters">
      <div className="filters__header">
        <h2 className="filters__title">Filters</h2>
        <button type="button" className="btn btn--ghost" onClick={onClear}>
          Clear
        </button>
      </div>

      <div className="filters__grid">
        <div className="field">
          <label className="label" htmlFor="cuisineSelect">
            Cuisine
          </label>
          <select
            id="cuisineSelect"
            className="select"
            value={value.cuisine}
            onChange={(e) => onChange({ cuisine: e.target.value })}
          >
            {(options?.cuisines || []).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label className="label" htmlFor="difficultySelect">
            Difficulty
          </label>
          <select
            id="difficultySelect"
            className="select"
            value={value.difficulty}
            onChange={(e) => onChange({ difficulty: e.target.value })}
          >
            {(options?.difficulties || []).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field" style={{ marginTop: 12 }}>
        <div className="label">Dietary</div>
        <div className="chipRow" role="list">
          {dietaryOptions.length === 0 ? (
            <div className="muted">No dietary options available.</div>
          ) : (
            dietaryOptions.map((d) => {
              const active = isSelected(d);
              return (
                <button
                  key={d}
                  type="button"
                  className={`chip ${active ? "chip--active" : ""}`}
                  onClick={() => toggleDietary(d)}
                  aria-pressed={active}
                >
                  <Badge tone={active ? "primary" : "default"}>{d}</Badge>
                </button>
              );
            })
          )}
        </div>
      </div>
    </aside>
  );
}
