// src/components/SpinWheel.jsx
// ─────────────────────────────────────────────
// Randomly picks a country + tribe combo
// and fills the form fields for the user.
// Parent passes in the setter functions as props.
// ─────────────────────────────────────────────
import { useState } from "react";
import "./SpinWheel.css";

// Big list of country + tribe combos
const WHEEL_OPTIONS = [
  { country: "South Africa", tribe: "Zulu" },
  { country: "South Africa", tribe: "Xhosa" },
  { country: "South Africa", tribe: "Sotho" },
  { country: "Nigeria", tribe: "Yoruba" },
  { country: "Nigeria", tribe: "Igbo" },
  { country: "Nigeria", tribe: "Hausa" },
  { country: "Ethiopia", tribe: "Amhara" },
  { country: "Ethiopia", tribe: "Oromo" },
  { country: "Ghana", tribe: "Ashanti" },
  { country: "Ghana", tribe: "Ewe" },
  { country: "Kenya", tribe: "Kikuyu" },
  { country: "Kenya", tribe: "Maasai" },
  { country: "Senegal", tribe: "Wolof" },
  { country: "Morocco", tribe: "Berber" },
  { country: "Egypt", tribe: "" },
  { country: "Japan", tribe: "" },
  { country: "Japan", tribe: "Okinawan" },
  { country: "China", tribe: "Sichuan" },
  { country: "China", tribe: "Cantonese" },
  { country: "India", tribe: "Punjab" },
  { country: "India", tribe: "Tamil" },
  { country: "India", tribe: "Bengali" },
  { country: "Vietnam", tribe: "" },
  { country: "Thailand", tribe: "" },
  { country: "South Korea", tribe: "" },
  { country: "Philippines", tribe: "Tagalog" },
  { country: "Mexico", tribe: "Oaxacan" },
  { country: "Mexico", tribe: "Mayan" },
  { country: "Peru", tribe: "Quechua" },
  { country: "Brazil", tribe: "" },
  { country: "Colombia", tribe: "" },
  { country: "Argentina", tribe: "" },
  { country: "Jamaica", tribe: "" },
  { country: "Haiti", tribe: "" },
  { country: "Lebanon", tribe: "" },
  { country: "Turkey", tribe: "" },
  { country: "Greece", tribe: "" },
  { country: "Italy", tribe: "Sicilian" },
  { country: "Spain", tribe: "Basque" },
  { country: "France", tribe: "" },
  { country: "New Zealand", tribe: "Māori" },
  { country: "Samoa", tribe: "" },
  { country: "Pakistan", tribe: "Pashtun" },
  { country: "Iraq", tribe: "" },
  { country: "Cameroon", tribe: "Bamileke" },
  { country: "Tanzania", tribe: "Chagga" },
];

export default function SpinWheel({ onCountryChange, onTribeChange }) {
  const [spinning, setSpinning] = useState(false);
  const [lastPick, setLastPick] = useState(null);

  function spin() {
    setSpinning(true);
    setLastPick(null);

    // Fun spinning effect — cycle through random picks visually
    let count = 0;
    const interval = setInterval(() => {
      const random =
        WHEEL_OPTIONS[Math.floor(Math.random() * WHEEL_OPTIONS.length)];
      onCountryChange(random.country);
      onTribeChange(random.tribe);
      count++;
      if (count > 12) {
        clearInterval(interval);
        // Land on the final pick
        const final =
          WHEEL_OPTIONS[Math.floor(Math.random() * WHEEL_OPTIONS.length)];
        onCountryChange(final.country);
        onTribeChange(final.tribe);
        setLastPick(final);
        setSpinning(false);
      }
    }, 80); // cycles every 80ms — feels like a spinning wheel
  }

  return (
    <div className="spin-wrap">
      <div className="spin-label">✦ Not sure where to start?</div>
      <button
        className={`spin-btn ${spinning ? "spinning" : ""}`}
        onClick={spin}
        disabled={spinning}
      >
        <span className="spin-globe">🌍</span>
        {spinning ? "Spinning…" : "Spin the World Wheel"}
      </button>
      {lastPick && !spinning && (
        <div className="spin-result">
          Landed on:{" "}
          <strong>
            {lastPick.tribe ? `${lastPick.tribe} · ` : ""}
            {lastPick.country}
          </strong>{" "}
          🎉
        </div>
      )}
    </div>
  );
}
