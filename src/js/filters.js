const state = {
  diet: "no restrictions",
  dessert:
    "warm or room temperature — no frozen or ice-cold textures whatsoever",
  season: null, // null means "nothing selected"
  holiday: null,
  proteins: new Set(), // Set = a list that automatically prevents duplicates
};

// ── Single-Select Pills ───────────────────────────────────────────────
// Used for: Diet, Dessert, Season, Occasion
// Rule: only ONE can be active at a time in each group

function handleSinglePill(clickedPill) {
  const group = clickedPill.dataset.group; // e.g. "diet", "season"
  const value = clickedPill.dataset.value;
  const wasActive = clickedPill.classList.contains("active");

  // 1. Remove active class from ALL pills in this group
  document.querySelectorAll(`[data-group="${group}"]`).forEach((pill) => {
    pill.classList.remove("active", "on", "on-green", "on-gold", "on-blue");
  });

  // 2. If it wasn't already active, activate it
  //    If it WAS active (user is toggling off), deactivate and reset to default
  if (!wasActive) {
    const styleClass = getActiveClass(group);
    clickedPill.classList.add("active", styleClass);
    state[group] = value;
  } else {
    // Reset to defaults when toggled off
    if (group === "diet") state.diet = "no restrictions";
    if (group === "dessert")
      state.dessert =
        "warm or room temperature — no frozen or ice-cold textures whatsoever";
    if (group === "season") state.season = null;
    if (group === "holiday") state.holiday = null;
  }
}

// ── Multi-Select Pills ────────────────────────────────────────────────
// Used for: Protein
// Rule: multiple can be active at the same time

function handleMultiPill(clickedPill) {
  const value = clickedPill.dataset.value;

  if (state.proteins.has(value)) {
    // Already selected → deselect it
    state.proteins.delete(value);
    clickedPill.classList.remove("active", "on-blue");
  } else {
    // Not selected → select it
    state.proteins.add(value);
    clickedPill.classList.add("active", "on-blue");
  }
}

// ── Helper: which CSS class to use for each group ─────────────────────
function getActiveClass(group) {
  const classes = {
    diet: "on-green",
    dessert: "on",
    season: "on",
    holiday: "on-gold",
  };
  return classes[group] || "on";
}

// ── Helper: build a readable summary of current filters ───────────────
// Used by api.js to build the prompt, and render.js to show context tags

function getFilterSummary() {
  return {
    diet: state.diet,
    dessert: state.dessert,
    season: state.season,
    holiday: state.holiday,
    proteins:
      state.proteins.size > 0
        ? [...state.proteins].join(", ")
        : "chef's choice",
  };
}

// ── Initialize: attach click listeners to all pills ───────────────────
// This runs once when the page loads.

function initFilters() {
  document.querySelectorAll(".pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      const group = pill.dataset.group;

      if (group === "protein") {
        handleMultiPill(pill);
      } else {
        handleSinglePill(pill);
      }
    });
  });

  // Set initial active states to match default state values
  // (so the "No Restrictions" and "Warm" pills show as selected on load)
  document
    .querySelectorAll('[data-group="diet"][data-value="no restrictions"]')
    .forEach((p) => p.classList.add("active", "on-green"));

  document
    .querySelectorAll(
      '[data-group="dessert"][data-value="warm or room temperature — no frozen or ice-cold textures whatsoever"]',
    )
    .forEach((p) => p.classList.add("active", "on"));
}
