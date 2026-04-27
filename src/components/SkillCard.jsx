import { Global, css } from '@emotion/react'
import { useState, useEffect } from 'react'
import { colors } from '../styles'

const style = css`
  .skill-card {
    background: ${colors.bg2};
    border: 1px solid ${colors.border};
    border-radius: 4px;
    padding: 28px 32px;
  }
  .skill-card__title {
    font-size: 15px;
    font-weight: 700;
    color: ${colors.yellow};
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin: 0 0 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid ${colors.border};
  }
  .skill-card__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .skill-card__item {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .skill-card__name {
    font-size: 13px;
    color: ${colors.dim};
    width: 140px;
    flex-shrink: 0;
    line-height: 1.4;
  }
  .skill-card__track {
    flex: 1;
    height: 3px;
    background: ${colors.border};
    border-radius: 2px;
    position: relative;
    overflow: visible;
  }
  .skill-card__fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    border-radius: 2px;
    transition: width 1.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .skill-card__pct {
    font-size: 13px;
    font-weight: 700;
    width: 36px;
    text-align: right;
    flex-shrink: 0;
  }
`

function SkillCard({ title, skills = [] }) {
  const [isAnimated, setIsAnimated] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setIsAnimated(true), 120)
    return () => clearTimeout(id)
  }, [])

  return (
    <>
      <Global styles={style} />
      <div className="skill-card">
        <p className="skill-card__title">{title}</p>
        <div className="skill-card__list">
          {skills.map(({ name, level, color }, i) => (
            <div key={name} className="skill-card__item">
              <span className="skill-card__name">{name}</span>
              <div className="skill-card__track">
                <div
                  className="skill-card__fill"
                  style={{
                    width: isAnimated ? `${level}%` : '0%',
                    background: colors[color],
                    transitionDelay: `${i * 60}ms`,
                  }}
                />
              </div>
              <span className="skill-card__pct" style={{ color: colors[color] }}>
                {level}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SkillCard
