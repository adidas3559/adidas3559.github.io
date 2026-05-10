import { Global, css } from '@emotion/react'
import { colors, typography } from '../styles'

const style = css`
  .stat-bar {
    display: flex;
    border: 1px solid ${colors.border};
    border-radius: 4px;
    margin-top: 24px;
    background-color: ${colors.bg2};
    width: 100%;
  }
  .stat-bar__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 22px 16px;
    border-right: 1px solid ${colors.bg};
    &:hover {
      background-color: ${colors.bg3};
    }
    &:last-child {
      border-right: none;
    }
  }
  .stat-bar__value {
    font-family: ${typography.Display};
    font-size: 28px;
    font-weight: 800;
    color: ${colors.bright};
    line-height: 1;
    margin-bottom: 5px;
  }
  .stat-bar__label {
    font-size: 10px;
    font-weight: 400;
    color: ${colors.dim};
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }
  @media (max-width: 1100px) {
    .stat-bar {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .stat-bar__item {
      border-right: none;
      border-bottom: none;
      padding: 32px 16px;
    }
    .stat-bar__item:nth-child(odd) {
      border-right: 1px solid ${colors.bg};
    }
    .stat-bar__item:nth-child(-n+2) {
      border-bottom: 1px solid ${colors.bg};
    }
    .stat-bar__value {
      font-size: 36px;
    }
  }
`

function StatBar({ stats = [] }) {
  return (
    <>
      <Global styles={style} />
      <div className="stat-bar">
        {stats.map(({ value, label }) => (
          <div key={label} className="stat-bar__item">
            <span className="stat-bar__value">{value}</span>
            <span className="stat-bar__label">{label}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default StatBar
