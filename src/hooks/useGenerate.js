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

    const prompt = `You are an expert in world cuisines and tribal cooking traditions.

${contextLines}

Create a 3-course meal (Appetizer, Entrée, Dessert) that is:
- Deeply authentic to the specific ethnic group or tribe (not just generic national food)
- All ingredients made entirely from scratch — no frozen, store-bought, or pre-made items
- Diet must be strictly followed: ${diet}
- Dessert MUST respect the temperature preference: ${dessert}
- If vegan, every dish must be fully plant-based

Respond ONLY with valid JSON. No markdown backticks, no explanation.

{
  "country": "string",
  "tribe": "string or empty string",
  "flag": "emoji",
  "tagline": "short poetic phrase under 10 words",
  "tribalNote": "1 sentence about what makes this group's cooking unique",
  "facts": [
    { "icon": "emoji", "label": "label", "text": "fact about this tribe's food" },
    { "icon": "emoji", "label": "label", "text": "culinary fact" },
    { "icon": "emoji", "label": "label", "text": "cultural food fact" }
  ],
  "courses": [
    {
      "type": "Appetizer",
      "name": "English name",
      "native": "name in local language if known",
      "description": "2-3 sentences describing the dish and its cultural origin",
      "time": "cook time",
      "method": "cooking technique",
      "highlight": "hero ingredient or technique",
      "ingredients": ["item", "SECTION:Subsection", "item under that section"],
      "steps": ["Detailed step 1", "Detailed step 2"]
    },
    { "type": "Entrée",  "name": "...", "native": "...", "description": "...", "time": "...", "method": "...", "highlight": "...", "ingredients": [], "steps": [] },
    { "type": "Dessert", "name": "...", "native": "...", "description": "...", "time": "...", "method": "...", "highlight": "...", "ingredients": [], "steps": [] }
  ],
  "shopping": {
    "🥩 Meat & Protein":  [{ "name": "item", "amount": "qty" }],
    "🌿 Produce":         [{ "name": "item", "amount": "qty" }],
    "🫙 Pantry & Dry":    [{ "name": "item", "amount": "qty" }],
    "🌶️ Spices":          [{ "name": "item", "amount": "qty" }],
    "🥛 Dairy & Fats":    [{ "name": "item", "amount": "qty" }],
    "🛒 Other":           [{ "name": "item", "amount": "qty" }]
  }
}`;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4500,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();
      console.log("API response:", data); // ← add this line

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
