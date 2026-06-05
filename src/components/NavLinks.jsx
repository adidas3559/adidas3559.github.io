import { Global, css } from '@emotion/react'
import { Link } from '@tanstack/react-router'
import { colors, typography } from '../styles'

const style = css`
  .nav-links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .nav-links__item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 220px;
    padding: 16px 18px;
    border: 1px solid ${colors.border};
    border-radius: 6px;
    background: ${colors.bg2};
    text-decoration: none;
    transition: border-color 0.15s, background 0.15s;
    cursor: pointer;
    &:hover {
      border-color: ${colors.text};
      background: ${colors.bg3};
    }
    &[data-status="active"] {
      border-color: ${colors.blue};
      background: ${colors.bg3};
    }
  }
  .nav-links__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-links__title-row {
    display: flex;
    align-items: center;
    gap: 9px;
  }
  .nav-links__icon {
    flex-shrink: 0;
    color: ${colors.yellow};
    display: flex;
    align-items: center;
  }
  .nav-links__label {
    font-family: ${typography.Body};
    font-size: 14px;
    font-weight: 700;
    color: ${colors.bright};
  }
  .nav-links__arrow {
    color: ${colors.dim};
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }
  .nav-links__desc {
    font-size: 12px;
    line-height: 1.6;
    color: ${colors.dim};
  }
  @media (max-width: 768px) {
    .nav-links__item {
      width: 100%;
    }
  }
`

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/>
    <path d="M14 2v5a1 1 0 0 0 1 1h5"/>
    <path d="M10 12.5 8 15l2 2.5"/>
    <path d="m14 12.5 2 2.5-2 2.5"/>
  </svg>
)

function NavLinks({ links = [] }) {
  return (
    <>
      <Global styles={style} />
      <div className="nav-links">
        {links.map(({ to, label, desc, icon: Icon }) => (
          <Link key={to} to={to} className="nav-links__item">
            <div className="nav-links__header">
              <div className="nav-links__title-row">
                <span className="nav-links__icon">{Icon ? <Icon /> : <FileIcon />}</span>
                <span className="nav-links__label">{label}</span>
              </div>
              <span className="nav-links__arrow"><ArrowIcon /></span>
            </div>
            {desc && <span className="nav-links__desc">{desc}</span>}
          </Link>
        ))}
      </div>
    </>
  )
}

export default NavLinks
