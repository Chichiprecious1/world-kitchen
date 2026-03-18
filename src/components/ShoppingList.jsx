import { useState } from 'react'
import './ShoppingList.css'

export default function ShoppingList({ shopping }) {
  const [checked, setChecked] = useState(new Set())

  function toggle(key) {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  return (
    <div className="shop-body">
      <div className="shop-top">
        <div>
          <div className="shop-title">Shopping List</div>
          <div className="shop-sub">Tap items to check off as you shop.</div>
        </div>
        <button className="reset-btn" onClick={() => setChecked(new Set())}>↺ Reset</button>
      </div>
      <div className="shop-grid">
        {Object.entries(shopping).map(([cat, items]) => (
          <div key={cat} className="shop-cat">
            <div className="shop-cat-lbl">{cat}</div>
            {items.map((item, i) => {
              const key = `${cat}-${i}`
              const isChecked = checked.has(key)
              return (
                <div key={key} className={`shop-item ${isChecked ? 'checked' : ''}`} onClick={() => toggle(key)}>
                  <div className="shop-chk">{isChecked ? '✓' : ''}</div>
                  <div className="shop-name">{item.name}</div>
                  <div className="shop-qty">{item.amount}</div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
