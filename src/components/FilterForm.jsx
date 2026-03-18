// src/components/FilterForm.jsx
// ─────────────────────────────────────────────────────────
// The main form. Receives values and callbacks from App.jsx
//
// Props this component receives:
//   country, onCountryChange      ← text input
//   tribe, onTribeChange          ← text input
//   diet, onDietChange            ← single select
//   dessert, onDessertChange      ← single select
//   proteins, onToggleProtein     ← multi select (array)
//   season, onSeasonChange        ← single select (can be null)
//   holiday, onHolidayChange      ← single select (can be null)
//   onGenerate                    ← function called on submit
//   loading                       ← disables button while loading
// ─────────────────────────────────────────────────────────
import "./FilterForm.css";
import SpinWheel from "./SpinWheel";

// ── Data for all the pill options ──
const DIET_OPTIONS = [
  { label: "🍽️ No Restrictions", value: "no restrictions", cls: "on-green" },
  {
    label: "🌱 Vegan",
    value: "vegan (fully plant-based, no meat/dairy/eggs)",
    cls: "on-green",
  },
  {
    label: "🥕 Vegetarian",
    value: "vegetarian (no meat, dairy and eggs are fine)",
    cls: "on-green",
  },
  { label: "☪️ Halal", value: "halal", cls: "on-green" },
  { label: "🌾 Gluten-Free", value: "gluten-free", cls: "on-green" },
];

const DESSERT_OPTIONS = [
  {
    label: "🔥 Warm",
    value: "warm or room temperature — no frozen or ice-cold textures",
    cls: "on",
  },
  {
    label: "🧊 Cold",
    value: "cold or chilled, like ice cream or mousse",
    cls: "on",
  },
  { label: "✨ Any", value: "any temperature", cls: "on" },
];

const PROTEIN_OPTIONS = [
  { label: "🍗 Chicken", value: "chicken" },
  { label: "🥩 Beef", value: "beef" },
  { label: "🐑 Lamb", value: "lamb" },
  { label: "🐷 Pork", value: "pork" },
  { label: "🐟 Fish", value: "fish" },
  { label: "🦐 Seafood", value: "seafood" },
  { label: "🐐 Goat", value: "goat" },
  { label: "🫘 Tofu / Legumes", value: "tofu or legumes" },
];

const SEASON_OPTIONS = [
  { label: "🌸 Spring", value: "Spring" },
  { label: "☀️ Summer", value: "Summer" },
  { label: "🍂 Fall", value: "Fall" },
  { label: "❄️ Winter", value: "Winter" },
];

const HOLIDAY_OPTIONS = [
  { label: "🎄 Christmas", value: "Christmas" },
  { label: "🧧 Lunar New Year", value: "Lunar New Year" },
  { label: "🌙 Eid", value: "Eid / Ramadan" },
  { label: "🐣 Easter", value: "Easter" },
  { label: "🪔 Diwali", value: "Diwali" },
  { label: "🦃 Thanksgiving", value: "Thanksgiving" },
  { label: "❤️ Valentine's", value: "Valentine's Day" },
  { label: "🎂 Birthday", value: "Birthday" },
  { label: "🏡 Family Feast", value: "Sunday family feast" },
  { label: "💍 Wedding", value: "Wedding feast" },
];

const QUICK_PICKS = [
  { label: "🇿🇦 Zulu · S. Africa", country: "South Africa", tribe: "Zulu" },
  { label: "🇳🇬 Yoruba · Nigeria", country: "Nigeria", tribe: "Yoruba" },
  { label: "🇳🇬 Igbo · Nigeria", country: "Nigeria", tribe: "Igbo" },
  { label: "🇮🇳 Punjabi · India", country: "India", tribe: "Punjab" },
  { label: "🇨🇳 Sichuan · China", country: "China", tribe: "Sichuan" },
  { label: "🇳🇿 Māori · NZ", country: "New Zealand", tribe: "Māori" },
  { label: "🇲🇽 Oaxacan · Mexico", country: "Mexico", tribe: "Oaxacan" },
  { label: "🇪🇹 Amhara · Ethiopia", country: "Ethiopia", tribe: "Amhara" },
  { label: "🇵🇪 Quechua · Peru", country: "Peru", tribe: "Quechua" },
  { label: "🇲🇦 Berber · Morocco", country: "Morocco", tribe: "Berber" },
];

export default function FilterForm({
  country,
  onCountryChange,
  tribe,
  onTribeChange,
  diet,
  onDietChange,
  dessert,
  onDessertChange,
  proteins,
  onToggleProtein,
  season,
  onSeasonChange,
  holiday,
  onHolidayChange,
  onGenerate,
  loading,
}) {
  // Handle pressing Enter in text fields
  function handleKeyDown(e) {
    if (e.key === "Enter" && country.trim()) onGenerate();
  }

  // Toggle single-select (season/holiday — can be turned off)
  function handleToggle(current, value, setter) {
    setter(current === value ? null : value);
  }

  return (
    <div className="form-wrap">
      <div className="form-card">
        {/* ── Country + Tribe inputs ── */}
        <div className="two-col">
          <div className="field-group">
            <label className="field-label">Country</label>
            <input
              className="field-input"
              type="text"
              placeholder="e.g. South Africa"
              value={country}
              onChange={(e) => onCountryChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="field-group">
            <label className="field-label">
              Ethnic Group / Tribe
              <span className="optional-tag">optional</span>
            </label>
            <input
              className="field-input"
              type="text"
              placeholder="e.g. Zulu, Yoruba, Māori…"
              value={tribe}
              onChange={(e) => onTribeChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <p className="field-hint">
              Leave blank for general national cuisine
            </p>
          </div>
        </div>

        <div className="form-divider" />

        {/* ── Diet + Dessert ── */}
        <div className="two-col">
          <FilterGroup label="Diet">
            {DIET_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`pill ${diet === opt.value ? opt.cls : ""}`}
                onClick={() => onDietChange(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </FilterGroup>

          <FilterGroup label="Dessert Temperature">
            {DESSERT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`pill ${dessert === opt.value ? opt.cls : ""}`}
                onClick={() => onDessertChange(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </FilterGroup>
        </div>

        {/* ── Protein (multi-select) ── */}
        <FilterGroup
          label="Protein Preference"
          hint="Pick one or more — or none for chef's choice"
        >
          {PROTEIN_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`pill ${proteins.includes(opt.value) ? "on-blue" : ""}`}
              onClick={() => onToggleProtein(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </FilterGroup>

        {/* ── Season + Holiday ── */}
        <div className="two-col">
          <FilterGroup label="Season" hint="optional">
            {SEASON_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`pill ${season === opt.value ? "on" : ""}`}
                onClick={() => handleToggle(season, opt.value, onSeasonChange)}
              >
                {opt.label}
              </button>
            ))}
          </FilterGroup>

          <FilterGroup label="Occasion" hint="optional">
            {HOLIDAY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`pill ${holiday === opt.value ? "on-gold" : ""}`}
                onClick={() =>
                  handleToggle(holiday, opt.value, onHolidayChange)
                }
              >
                {opt.label}
              </button>
            ))}
          </FilterGroup>
        </div>

        <div className="form-divider" />

        {/* ── Generate button ── */}
        <SpinWheel
          onCountryChange={onCountryChange}
          onTribeChange={onTribeChange}
        />
        <button
          className="gen-btn"
          onClick={onGenerate}
          disabled={loading || !country.trim()}
        >
          <span style={{ fontSize: "20px" }}>🌍</span>
          {loading ? "Generating…" : "Generate 3-Course Meal"}
        </button>
      </div>

      {/* ── Quick pick suggestions ── */}
      <div className="suggestions">
        {QUICK_PICKS.map((pick) => (
          <button
            key={pick.label}
            className="sug-pill"
            onClick={() => {
              onCountryChange(pick.country);
              onTribeChange(pick.tribe);
            }}
          >
            {pick.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Small helper component for a labeled group of pills ──
function FilterGroup({ label, hint, children }) {
  return (
    <div className="filter-group">
      <div className="filter-label">
        {label}
        {hint && <span className="filter-hint">{hint}</span>}
      </div>
      <div className="pills-row">{children}</div>
    </div>
  );
}
