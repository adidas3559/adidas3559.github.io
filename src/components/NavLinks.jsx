import { Global, css } from '@emotion/react'
import { Link } from '@tanstack/react-router'
import { colors, typography } from '../styles'

const style = css`
  .nav-links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .nav-links__item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 5px 18px;
    border: 1px solid ${colors.bright};
    border-radius: 2px;
    font-family: ${typography.Serif};
    font-size: 12px;
    font-weight: 700;
    color: ${colors.bright};
    text-decoration: none;
    background: ${colors.bg3};
    transition: border-color 0.15s, background 0.15s;
    cursor: pointer;
    &:hover {
      border-color: ${colors.text};
    }
    &[data-status="active"] {
      background: ${colors.blue2};
      border-color: ${colors.blue};
    }
  }
`

function NavLinks({ links = [] }) {
  return (
    <>
      <Global styles={style} />
      <div className="nav-links">
        {links.map(({ to, label, emoji }) => (
          <Link key={to} to={to} className="nav-links__item">
            <span>{emoji}</span>
            {label}
          </Link>
        ))}
      </div>
    </>
  )
}

export default NavLinks
