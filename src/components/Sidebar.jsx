import { Global, css } from '@emotion/react'
import { Link } from '@tanstack/react-router'
import { colors } from '../styles'
import { ReactIcon, HtmlIcon, TsIcon, JsIcon, JsonIcon, CssIcon, MdIcon, PdfIcon } from './FileIcons'
import { useCopilot } from '../utils/copilotContext'

const style = css`
  .sidebar {
    width: 250px;
    min-width: 250px;
    background: ${colors.bg2};
    border-right: 1px solid ${colors.border};
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 28px;
    height: calc(100svh - 28px);
    flex-shrink: 0;
    overflow: hidden;
  }
  @media (max-width: 1100px) {
    .sidebar {
      display: none;
    }
  }
  .sidebar__header {
    padding: 14px 16px 10px;
    font-size: 11px;
    font-weight: 700;
    color: ${colors.bright};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    flex-shrink: 0;
  }
  .sidebar__list {
    flex: 1;
    overflow-y: auto;
  }
  .sidebar__item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px 14px 5px 11px;
    text-decoration: none;
    border-left: 2px solid transparent;
    transition: background 0.1s ease;
  }
  .sidebar__item:hover {
    background: ${colors.bg3};
  }
  .sidebar__item[data-status="active"] {
    background: ${colors.bg3};
    border-left-color: ${colors.blue};
  }
  .sidebar__item[data-status="active"] .sidebar__filename {
    color: ${colors.text};
    font-weight: 700;
  }
  .sidebar__icon {
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .sidebar__filename {
    font-size: 12px;
    color: ${colors.dim};
  }
  .sidebar__divider {
    height: 1px;
    background: ${colors.border};
    margin: 4px 0;
  }
  .sidebar__resume {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px 14px 5px 14px;
    text-decoration: none;
    transition: background 0.1s ease;
    cursor: pointer;
  }
  .sidebar__resume:hover {
    background: ${colors.bg3};
  }
  .sidebar__footer {
    border-top: 1px solid ${colors.border};
    padding: 8px 14px;
    flex-shrink: 0;
    margin-bottom: 22px;
  }
  .sidebar__git {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    color: ${colors.bright};
  }
  .sidebar__git-branch {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .sidebar__git-stats {
    display: flex;
    gap: 8px;
  }
  .sidebar__git-up {
    color: ${colors.green};
  }
  .sidebar__git-changed {
    color: ${colors.pink};
  }
  .sidebar__copilot-section {
    padding: 10px 12px;
    border-top: 1px solid ${colors.border};
    flex-shrink: 0;
  }
  .sidebar__copilot-badge {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 9px 12px;
    border: 1px solid ${colors.purple + '55'};
    border-radius: 8px;
    background: ${colors.purple + '0d'};
  }
  .sidebar__copilot-sparkle {
    font-size: 14px;
    color: ${colors.purple};
    flex-shrink: 0;
    line-height: 1;
    position: relative;
  }
  .sidebar__copilot-dot {
    position: absolute;
    top: -3px;
    right: -3px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${colors.purple};
    animation: sidebar-pulse 2s ease infinite;
  }
  @keyframes sidebar-pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.3;
      transform: scale(1.6);
    }
  }
  .sidebar__copilot-label {
    font-size: 12px;
    color: ${colors.purple};
    font-weight: 600;
    flex: 1;
  }
  .sidebar__copilot-ai {
    font-size: 11px;
    color: ${colors.purple + '99'};
    flex-shrink: 0;
  }
`

const navItems = [
  { to: '/',           filename: 'home.tsx',      icon: <ReactIcon />, exact: true },
  { to: '/about',      filename: 'about.html',    icon: <HtmlIcon />  },
  { to: '/experience', filename: 'experience.ts', icon: <TsIcon />    },
  { to: '/projects',   filename: 'projects.js',   icon: <JsIcon />    },
  { to: '/skills',     filename: 'skills.json',   icon: <JsonIcon />  },
  // { to: '/contact',    filename: 'contact.css',   icon: <CssIcon />   },
  // { to: '/readme',     filename: 'README.md',     icon: <MdIcon />    },
]

function Sidebar() {
  const { toggle: toggleCopilot } = useCopilot()
  return (
    <>
      <Global styles={style} />
      <aside className="sidebar">
        <p className="sidebar__header">Portfolio</p>
        <nav className="sidebar__list">
          {navItems.map(({ to, filename, icon, exact }) => (
            <Link
              key={to}
              to={to}
              className="sidebar__item"
              activeOptions={exact ? { exact: true } : undefined}
            >
              <span className="sidebar__icon">{icon}</span>
              <span className="sidebar__filename">{filename}</span>
            </Link>
          ))}
          {/* <div className="sidebar__divider" /> */}
          <Link
            to="/resume"
            className="sidebar__resume"
          >
            <span className="sidebar__icon"><PdfIcon /></span>
            <span className="sidebar__filename">Stephen_Forbes_Resume.pdf</span>
          </Link>
        </nav>
        {/* <div className="sidebar__copilot-section">
          <div className="sidebar__copilot-badge" onClick={toggleCopilot} style={{ cursor: 'pointer' }}>
            <span className="sidebar__copilot-sparkle">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/>
              </svg>
              <span className="sidebar__copilot-dot" />
            </span>
            <span className="sidebar__copilot-label">Stephen's Copilot</span>
            <span className="sidebar__copilot-ai">AI</span>
          </div>
        </div> */}
        <div className="sidebar__footer">
          <div className="sidebar__git">
            <span className="sidebar__git-branch">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="6" r="3"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="12" r="3"/>
                <path d="M6 9v6M9 12h6"/>
              </svg>
              main
            </span>
            <span className="sidebar__git-stats">
              <span className="sidebar__git-up">↑1</span>
              <span className="sidebar__git-changed">+3</span>
            </span>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
