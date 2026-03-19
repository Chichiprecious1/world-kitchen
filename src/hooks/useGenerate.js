// src/hooks/useGenerate.js
// ─────────────────────────────────────────────────────────
// A "hook" is a reusable piece of logic in React.
// We put the API call here so App.jsx stays clean.
// Any component can call useGenerate() to get this logic.
// ─────────────────────────────────────────────────────────
import { useState } from "react";

export function useGenerate() {
  const [loading, setLoading] = useState(false); // is it loading?
  const [result, setResult] = useState(null); // the meal data
  const [error, setError] = useState(null); // any error message

  async function generate({
    country,
    tribe,
    diet,
    dessert,
    proteins,
    season,
    holiday,
  }) {
    setLoading(true);
    setResult(null);
    setError(null);

    // Build a readable context string for the prompt
    const proteinsText =
      proteins.length > 0 ? proteins.join(", ") : "chef's choice";
    const contextLines = [
      `Country: ${country}`,
      tribe
        ? `Ethnic group / tribe: ${tribe} people — use their specific traditional cooking styles, spices, and dishes`
        : `Use the country's general traditional cuisine`,
      `Diet: ${diet}`,
      `Protein preference: ${proteinsText}`,
      `Dessert temperature: ${dessert}`,
      season
        ? `Season: ${season} — use seasonal produce typical for this season in this culture`
        : "",
      holiday
        ? `Occasion: ${holiday} — choose dishes traditionally made for this celebration`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

const prompt = `You are a world cuisine expert. Create a 3-course meal for ${tribe ? tribe + ' people from ' + country : country}.
Diet: ${diet}. Protein: ${proteinsText}. Dessert: ${dessert}.
${season ? 'Season: ' + season : ''} ${holiday ? 'Occasion: ' + holiday : ''}

Respond ONLY in valid JSON, no backticks:
{"country":"","tribe":"","flag":"","tagline":"","tribalNote":"","facts":[{"icon":"","label":"","text":""}],"courses":[{"type":"Appetizer","name":"","native":"","description":"","time":"","method":"","highlight":"","ingredients":[""],"steps":[""]},{"type":"Entrée","name":"","native":"","description":"","time":"","method":"","highlight":"","ingredients":[""],"steps":[""]},{"type":"Dessert","name":"","native":"","description":"","time":"","method":"","highlight":"","ingredients":[""],"steps":[""]}],"shopping":{"🥩 Meat":[{"name":"","amount":""}]}}`
      if (data.error) {
        setError("API Error: " + (data.error.message || data.error));
        return;
      }

      const raw = data.content.map((b) => b.text || "").join("");
      const clean = raw.replace(/```json|```/gi, "").trim();
      const meal = JSON.parse(clean);
      setResult(meal);
    } catch (err) {
      console.error("Full error:", err);
      setError("Something went wrong. Please try again.");
    }
  }

  return { generate, loading, result, error, reset: () => setResult(null) };
}
