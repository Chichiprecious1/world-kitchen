// src/hooks/useGenerate.js
import { useState } from "react";

export function useGenerate() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

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

    const who = tribe ? `${tribe} people from ${country}` : country;
    const p = proteins.length > 0 ? proteins.join(", ") : "any";

    const prompt = `Create a 3-course meal for ${who}. Diet: ${diet}. Protein: ${p}. Dessert must be: ${dessert}.${season ? ` Season: ${season}.` : ""}${holiday ? ` Occasion: ${holiday}.` : ""}

Reply ONLY with this JSON (no backticks):
{"country":"${country}","tribe":"${tribe || ""}","flag":"emoji","tagline":"short phrase","tribalNote":"one sentence","facts":[{"icon":"emoji","label":"label","text":"fact"},{"icon":"emoji","label":"label","text":"fact"},{"icon":"emoji","label":"label","text":"fact"}],"courses":[{"type":"Appetizer","name":"","native":"","description":"2 sentences","time":"","method":"","highlight":"","ingredients":["ing1","ing2","SECTION:Sauce","ing3"],"steps":["step1","step2","step3"]},{"type":"Entrée","name":"","native":"","description":"2 sentences","time":"","method":"","highlight":"","ingredients":["ing1","ing2"],"steps":["step1","step2","step3"]},{"type":"Dessert","name":"","native":"","description":"2 sentences","time":"","method":"","highlight":"","ingredients":["ing1","ing2"],"steps":["step1","step2","step3"]}],"shopping":{"🥩 Meat":[{"name":"item","amount":"qty"}],"🌿 Produce":[{"name":"item","amount":"qty"}],"🫙 Pantry":[{"name":"item","amount":"qty"}],"🌶️ Spices":[{"name":"item","amount":"qty"}]}}`;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 2000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();

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
    } finally {
      setLoading(false);
    }
  }

  return { generate, loading, result, error, reset: () => setResult(null) };
}
