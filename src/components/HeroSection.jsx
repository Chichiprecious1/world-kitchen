// src/components/HeroSection.jsx
// ─────────────────────────────────────────────
// Just the big title area at the top.
// No logic here — purely visual.
// ─────────────────────────────────────────────
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <div className="hero-top">
      <div className="hero-glow" />
      <div className="badge">World Kitchen</div>
      <h1 className="hero-title">
        Travel the world.
        <br />
        <em>Through foodn.</em>
      </h1>
      <p className="hero-sub">
        Enter a country and ethnic group. Customize by diet, protein, season,
        and occasion for a full 3-course menu made entirely from scratch.
      </p>
    </div>
  );
}
