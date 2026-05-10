import { Global, css } from '@emotion/react'
import { Link } from '@tanstack/react-router'
import { colors } from '../styles'

const style = css`
  .no-tabs {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${colors.bg};
    gap: 44px;
    padding-bottom: 60px;
  }
  .no-tabs__logo {
    color: ${colors.bg4};
  }
  .no-tabs__shortcuts {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .no-tabs__shortcut {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 48px;
    text-decoration: none;
    color: ${colors.dim};
    font-size: 13px;
    transition: color 0.15s;
    &:hover {
      color: ${colors.text};
    }
  }
  .no-tabs__keys {
    display: flex;
    gap: 3px;
  }
  .no-tabs__key {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    height: 20px;
    padding: 0 5px;
    border: 1px solid ${colors.bg4};
    border-radius: 3px;
    background: ${colors.bg3};
    color: ${colors.dim};
    font-size: 11px;
  }
`

const shortcuts = [
  { label: 'Go to Home',      to: '/',         keys: ['⌘', 'H'] },
  { label: 'Open Projects',   to: '/projects', keys: ['⌘', 'P'] },
  { label: 'Get in Touch',    to: '/contact',  keys: ['⌘', 'K'] },
]

function NoTabs() {
  return (
    <>
      <Global styles={style} />
      <div className="no-tabs">
        <svg className="no-tabs__logo" viewBox="0 0 24 24" width="200" height="200" fill="currentColor">
          <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
        </svg>
        <div className="no-tabs__shortcuts">
          {shortcuts.map(({ label, to, keys }) => (
            <Link key={to} to={to} className="no-tabs__shortcut">
              <span>{label}</span>
              <span className="no-tabs__keys">
                {keys.map(k => (
                  <span key={k} className="no-tabs__key">{k}</span>
                ))}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default NoTabs
