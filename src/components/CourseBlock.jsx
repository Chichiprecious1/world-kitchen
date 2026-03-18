import { useState } from 'react'
import './CourseBlock.css'

function badgeClass(type) {
  if (type === 'Appetizer') return 'app'
  if (/ntr|Main/i.test(type)) return 'ent'
  return 'des'
}

export default function CourseBlock({ course, index }) {
  const [open, setOpen] = useState(false)
  const bc = badgeClass(course.type)

  return (
    <div className="course">
      <div className="course-head">
        <div className="course-num-col">
          <div className="c-num">0{index + 1}</div>
          <div className={`c-badge ${bc}`}>{course.type}</div>
        </div>
        <div className="course-info">
          <div className="dish-title">{course.name}</div>
          {course.native && course.native !== course.name && (
            <div className="dish-native">{course.native}</div>
          )}
          <div className="dish-desc">{course.description}</div>
          <div className="chips">
            <span className="chip">⏱️ {course.time}</span>
            <span className="chip">🔥 {course.method}</span>
            <span className="chip">✨ {course.highlight}</span>
          </div>
        </div>
      </div>

      {/* Expandable recipe */}
      <div className="recipe-box">
        <button className="recipe-toggle" onClick={() => setOpen(!open)}>
          <span className={`arrow ${open ? 'open' : ''}`}>▶</span>
          {open ? 'Hide Recipe' : 'View Full Recipe'}
        </button>

        {open && (
          <div className="recipe-content">
            <div className="r2col">
              <div>
                <div className="col-head">Ingredients</div>
                <ul className="ing-list">
                  {course.ingredients.map((ing, i) =>
                    ing.startsWith('SECTION:') ? (
                      <li key={i} className="ing-section">{ing.slice(8)}</li>
                    ) : (
                      <li key={i}><span className="idot" />  {ing}</li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <div className="col-head">Instructions</div>
                <ol className="steps-list">
                  {course.steps.map((step, i) => <li key={i}>{step}</li>)}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
