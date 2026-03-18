import { useState } from "react";
import { useGenerate } from "./hooks/useGenerate";
import HeroSection from "./components/HeroSection";
import FilterForm from "./components/FilterForm";
import Loader from "./components/Loader";
import ResultCard from "./components/ResultCard";
import "./App.css";

export default function App() {
  // ── User selections (this is "state" - data that can change)
  const [country, setCountry] = useState("");
  const [tribe, setTribe] = useState("");
  const [diet, setDiet] = useState("no restrictions");
  const [dessert, setDessert] = useState(
    "warm or room temperature — no frozen or ice-cold textures",
  );
  const [proteins, setProteins] = useState([]); // array - can pick multiple
  const [season, setSeason] = useState(null);
  const [holiday, setHoliday] = useState(null);

  // ── Our custom hook handles the API call ──
  const { generate, loading, result, error, reset } = useGenerate();

  // Toggle a protein on/off (multi-select)
  function toggleProtein(protein) {
    setProteins(
      (prev) =>
        prev.includes(protein)
          ? prev.filter((p) => p !== protein) // remove it
          : [...prev, protein], // add it
    );
  }

  // When form is submitted
  function handleGenerate() {
    if (!country.trim()) return;
    generate({ country, tribe, diet, dessert, proteins, season, holiday });
    // Scroll down to show results
    setTimeout(() => {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  // Scroll back up and reset
  function handleReset() {
    reset();
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      {/* ── Top section with title and form ── */}
      <section id="hero">
        <HeroSection />
        <FilterForm
          country={country}
          onCountryChange={setCountry}
          tribe={tribe}
          onTribeChange={setTribe}
          diet={diet}
          onDietChange={setDiet}
          dessert={dessert}
          onDessertChange={setDessert}
          proteins={proteins}
          onToggleProtein={toggleProtein}
          season={season}
          onSeasonChange={setSeason}
          holiday={holiday}
          onHolidayChange={setHoliday}
          onGenerate={handleGenerate}
          loading={loading}
        />
      </section>

      {/* ── Results section ── */}
      <section
        id="results"
        style={{ maxWidth: "880px", margin: "0 auto", padding: "0 24px 100px" }}
      >
        {loading && (
          <Loader
            country={country}
            tribe={tribe}
            diet={diet}
            proteins={proteins}
          />
        )}
        {error && (
          <div className="error-state">
            <span className="error-icon">🍳</span>
            <p>{error}</p>
            <button className="btn-outline" onClick={handleReset}>
              Try Again
            </button>
          </div>
        )}
        {result && !loading && (
          <ResultCard
            data={result}
            context={{ diet, proteins, season, holiday, dessert }}
            onReset={handleReset}
          />
        )}
      </section>
    </div>
  );
}
