import { useState } from 'react'
import { Global, css } from '@emotion/react'
import { Link, useRouterState } from '@tanstack/react-router'
import { colors } from '../styles'
import { useCommandPalette } from '../utils/commandPaletteContext'
import { useCopilot } from '../utils/copilotContext'
import { ReactIcon, HtmlIcon, TsIcon, JsIcon, JsonIcon, CssIcon, MdIcon, PdfIcon } from './FileIcons'

export const MOBILE_MENU_BAR_HEIGHT = 44

const navItems = [
  { to: '/',           filename: 'home.tsx',      icon: <ReactIcon />, exact: true },
  { to: '/about',      filename: 'about.html',    icon: <HtmlIcon />  },
  { to: '/experience', filename: 'experience.ts', icon: <TsIcon />    },
  { to: '/projects',   filename: 'projects.js',   icon: <JsIcon />    },
  { to: '/skills',     filename: 'skills.json',   icon: <JsonIcon />  },
  { to: '/contact',    filename: 'contact.css',   icon: <CssIcon />   },
  { to: '/readme',     filename: 'README.md',     icon: <MdIcon />    },
]

const style = css`
  .mobile-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: ${MOBILE_MENU_BAR_HEIGHT}px;
    background: ${colors.bg2};
    border-bottom: 1px solid ${colors.border};
    display: none;
    align-items: center;
    padding: 0 10px 0 4px;
    z-index: 1999;
    user-select: none;
    gap: 4px;
  }
  @media (max-width: 1100px) {
    .mobile-bar {
      display: flex;
    }
  }
  .mobile-bar__hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 5px;
    background: transparent;
    border: none;
    color: ${colors.text};
    cursor: pointer;
    flex-shrink: 0;
    padding: 0;
  }
  .mobile-bar__hamburger:hover {
    background: ${colors.bg4};
  }
  .mobile-bar__path {
    flex: 1;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${colors.text};
  }
  .mobile-bar__path-tilde {
    color: ${colors.dim};
  }
  .mobile-bar__right {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }
  .mobile-bar__icon-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    background: ${colors.bg5};
    border: none;
    color: ${colors.dim};
    cursor: pointer;
    padding: 0;
  }
  .mobile-bar__icon-btn:hover {
    color: ${colors.text};
  }
  .mobile-bar__copilot-dot {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${colors.purple};
    pointer-events: none;
    animation: mobile-pulse 2s ease infinite;
  }
  @keyframes mobile-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.3; transform: scale(1.6); }
  }
  .mobile-drawer {
    position: fixed;
    inset: 0;
    z-index: 2100;
    pointer-events: none;
  }
  .mobile-drawer--open {
    pointer-events: auto;
  }
  .mobile-drawer__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0);
    transition: background 0.2s ease;
  }
  .mobile-drawer--open .mobile-drawer__overlay {
    background: rgba(0, 0, 0, 0.5);
  }
  .mobile-drawer__panel {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 260px;
    background: ${colors.bg};
    border-right: 1px solid ${colors.border};
    display: flex;
    flex-direction: column;
    transform: translateX(-100%);
    transition: transform 0.2s ease;
  }
  .mobile-drawer--open .mobile-drawer__panel {
    transform: translateX(0);
  }
  .mobile-drawer__header {
    height: ${MOBILE_MENU_BAR_HEIGHT}px;
    background-color: ${colors.bg3};
    display: flex;
    align-items: center;
    padding: 0 8px 0 16px;
    font-size: 11px;
    font-weight: 700;
    color: ${colors.dim};
    letter-spacing: 0.14em;
    text-transform: uppercase;
    border-bottom: 1px solid ${colors.border};
    flex-shrink: 0;
  }
  .mobile-drawer__header-title {
    flex: 1;
  }
  .mobile-drawer__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 6px;
    border: none;
    background: transparent;
    color: ${colors.dim};
    cursor: pointer;
    padding: 0;
    transition: background 0.15s ease, color 0.15s ease;
  }
  .mobile-drawer__close:hover {
    background: ${colors.bg5};
    color: ${colors.bright};
  }
  .mobile-drawer__list {
    flex: 1;
    overflow-y: auto;
    padding-top: 4px;
  }
  .mobile-drawer__item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 14px 9px 11px;
    text-decoration: none;
    border-left: 2px solid transparent;
    transition: background 0.1s ease;
  }
  .mobile-drawer__item:hover {
    background: ${colors.bg3};
  }
  .mobile-drawer__item[data-status="active"] {
    background: ${colors.bg3};
    border-left-color: ${colors.blue};
  }
  .mobile-drawer__item[data-status="active"] .mobile-drawer__filename {
    color: ${colors.text};
    font-weight: 700;
  }
  .mobile-drawer__icon {
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .mobile-drawer__filename {
    font-size: 13px;
    color: ${colors.dim};
  }
  .mobile-drawer__resume {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 14px;
    text-decoration: none;
    transition: background 0.1s ease;
  }
  .mobile-drawer__resume:hover {
    background: ${colors.bg3};
  }
  .mobile-drawer__footer {
    border-top: 1px solid ${colors.border};
    padding: 10px 14px;
    flex-shrink: 0;
  }
  .mobile-drawer__git {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    color: ${colors.bright};
  }
  .mobile-drawer__git-branch {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .mobile-drawer__git-ahead {
    color: ${colors.green};
  }
`

const HamburgerIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

const CopilotIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/>
  </svg>
)

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7"/>
    <path d="m21 21-4.4-4.4"/>
  </svg>
)

function MobileMenuBar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { location } = useRouterState()
  const { open: openPalette } = useCommandPalette()
  const { toggle: toggleCopilot } = useCopilot()

  const pageName = location.pathname === '/' ? 'home' : location.pathname.slice(1)

  return (
    <>
      <Global styles={style} />
      <header className="mobile-bar">
        <button
          className="mobile-bar__hamburger"
          aria-label="Open navigation"
          onClick={() => setDrawerOpen(true)}
        >
          <HamburgerIcon />
        </button>
        <span className="mobile-bar__path">
          <span className="mobile-bar__path-tilde">~/ </span>
          {pageName}
        </span>
        <div className="mobile-bar__right">
          <button
            className="mobile-bar__icon-btn"
            aria-label="Stephen's Copilot"
            onClick={toggleCopilot}
          >
            <CopilotIcon />
            <span className="mobile-bar__copilot-dot" />
          </button>
          <button
            className="mobile-bar__icon-btn"
            aria-label="Search"
            onClick={openPalette}
          >
            <SearchIcon />
          </button>
        </div>
      </header>
      <div className={`mobile-drawer${drawerOpen ? ' mobile-drawer--open' : ''}`}>
        <div className="mobile-drawer__overlay" onClick={() => setDrawerOpen(false)} />
        <div className="mobile-drawer__panel">
          <div className="mobile-drawer__header">
            <span className="mobile-drawer__header-title">Explorer</span>
            <button
              className="mobile-drawer__close"
              aria-label="Close navigation"
              onClick={() => setDrawerOpen(false)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <nav className="mobile-drawer__list">
            {navItems.map(({ to, filename, icon, exact }) => (
              <Link
                key={to}
                to={to}
                className="mobile-drawer__item"
                activeOptions={exact ? { exact: true } : undefined}
                onClick={() => setDrawerOpen(false)}
              >
                <span className="mobile-drawer__icon">{icon}</span>
                <span className="mobile-drawer__filename">{filename}</span>
              </Link>
            ))}
            <a
              href="/Stephen_Forbes_Resume.pdf"
              download="Stephen_Forbes_Resume.pdf"
              className="mobile-drawer__resume"
              onClick={() => setDrawerOpen(false)}
            >
              <span className="mobile-drawer__icon"><PdfIcon /></span>
              <span className="mobile-drawer__filename">Stephen_Forbes_Resume.pdf</span>
            </a>
          </nav>
          <div className="mobile-drawer__footer">
            <div className="mobile-drawer__git">
              <span className="mobile-drawer__git-branch">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="6" cy="6" r="3"/>
                  <circle cx="6" cy="18" r="3"/>
                  <circle cx="18" cy="12" r="3"/>
                  <path d="M6 9v6M9 12h6"/>
                </svg>
                main
              </span>
              <span className="mobile-drawer__git-ahead">↑1</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileMenuBar
