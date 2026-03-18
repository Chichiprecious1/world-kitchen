import { useState } from 'react'
import CourseBlock from './CourseBlock'
import ShoppingList from './ShoppingList'
import './ResultCard.css'

export default function ResultCard({ data, context, onReset }) {
  const [tab, setTab] = useState('menu')
  const d = data

  const ctags = []
  if (d.tribe) ctags.push({ cls: 'g', text: `👥 ${d.tribe}` })
  if (context.diet !== 'no restrictions') ctags.push({ cls: 'gr', text: context.diet.split('(')[0].trim() })
  if (context.proteins?.length) ctags.push({ cls: 'b', text: `🍖 ${context.proteins.join(', ')}` })
  if (context.season)  ctags.push({ cls: 'w', text: context.season })
  if (context.holiday) ctags.push({ cls: 'g', text: context.holiday })

  const hashtags = [`#WorldKitchen`, `#${d.country.replace(/\s/g,'')}`,
    d.tribe ? `#${d.tribe.replace(/\s/g,'')}Cuisine` : '',
    context.diet.includes('vegan') ? '#Vegan' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className="result-card">
      {/* Hero */}
      <div className="result-hero">
        <div className="rh">
          <div className="ctx-strip">
            <div className="ctag a">✦ World Kitchen</div>
            {ctags.map((t,i) => <div key={i} className={`ctag ${t.cls}`}>{t.text}</div>)}
          </div>
          <div className="name-row">
            <div className="r-name">{d.country}</div>
            <div className="r-flag">{d.flag}</div>
          </div>
          {d.tribe && <div className="r-tribe">👥 {d.tribe} Cuisine</div>}
          <div className="r-tagline">"{d.tagline}"</div>
          {d.tribalNote && <p className="r-tribal-note">{d.tribalNote}</p>}
          <div className="facts-row">
            {d.facts.map((f,i) => (
              <div key={i} className="fact-card">
                <span className="fact-icon">{f.icon}</span>
                <div>
                  <div className="fact-lbl">{f.label}</div>
                  <div className="fact-txt">{f.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${tab==='menu'?'active':''}`} onClick={() => setTab('menu')}>🍽 Menu & Recipes</button>
        <button className={`tab ${tab==='shop'?'active':''}`} onClick={() => setTab('shop')}>🛒 Shopping List</button>
      </div>

      {/* Tab content */}
      {tab === 'menu' && (
        <div className="menu-body">
          <div className="menu-hdr"><span>3-Course Menu</span><span>All from scratch</span></div>
          {d.courses.map((c,i) => <CourseBlock key={i} course={c} index={i} />)}
        </div>
      )}
      {tab === 'shop' && <ShoppingList shopping={d.shopping} />}

      {/* Footer */}
      <div className="result-footer">
        <div className="footer-tags">{hashtags}</div>
        <button className="new-btn" onClick={onReset}>← New Search</button>
      </div>
    </div>
  )
}
