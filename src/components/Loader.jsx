// src/components/Loader.jsx
// ─────────────────────────────────────────────
// Shows while the AI is generating.
// Receives info about what's being generated
// so it can display it while loading.
// ─────────────────────────────────────────────
import './Loader.css'

export default function Loader({ country, tribe, diet, proteins }) {
  const proteinText = proteins.length > 0 ? proteins.join(' · ') : ''
  const dietText    = diet !== 'no restrictions' ? diet.split('(')[0].trim() : ''
  const context     = [proteinText, dietText].filter(Boolean).join(' · ')

  return (
    <div className="loader">
      <span className="loader-globe">🌍</span>
      <div className="loader-label">Crafting your menu</div>
      <div className="loader-country">
        {tribe ? `${tribe} · ` : ''}{country}
      </div>
      {context && <div className="loader-context">{context}</div>}
    </div>
  )
}
