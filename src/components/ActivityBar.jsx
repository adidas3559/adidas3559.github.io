import { useState, useRef, useEffect } from 'react'
import { Global, css } from '@emotion/react'
import { colors } from '../styles'
import { useCommandPalette } from '../utils/commandPaletteContext'
import { useCopilot } from '../utils/copilotContext'
import { useTerminal } from '../utils/terminalContext'

const style = css`
  .activity-bar {
    width: 48px;
    min-width: 48px;
    background: ${colors.bg2};
    border-right: 1px solid ${colors.border};
    display: flex;
    flex-direction: column;
    align-items: center;
    position: sticky;
    top: 28px;
    height: calc(100svh - 28px);
    flex-shrink: 0;
    z-index: 10;
  }
  @media (max-width: 1100px) {
    .activity-bar {
      display: none;
    }
  }
  .activity-bar__top {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4px;
    gap: 2px;
  }
  .activity-bar__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 26px;
    gap: 2px;
  }
  .activity-bar__item {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .activity-bar__item--active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: 24px;
    background: ${colors.blue};
    border-radius: 0 2px 2px 0;
  }
  .activity-bar__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 5px;
    border: none;
    background: transparent;
    padding: 0;
    color: ${colors.dim};
    cursor: pointer;
    transition: background 0.1s, color 0.1s;
    &:hover {
      background: ${colors.bg3};
      color: ${colors.text};
    }
  }
  .activity-bar__item--active .activity-bar__btn {
    color: ${colors.bright};
  }
  .activity-bar__btn--open {
    background: ${colors.bg3};
    color: ${colors.text};
  }
  .activity-bar__btn--copilot {
    &:hover {
      background: ${colors.purple + '22'};
      color: ${colors.purple};
    }
  }
  .sc-popup {
    position: fixed;
    left: 53px;
    z-index: 100;
    width: 330px;
    background: ${colors.bg3};
    border: 1px solid ${colors.border};
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 0 12px 28px -4px rgba(0, 0, 0, 0.6), 0 4px 8px rgba(0, 0, 0, 0.25);
  }
  .sc-popup__header {
    padding: 10px 16px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${colors.dim};
    border-bottom: 1px solid ${colors.border};
  }
  .sc-popup__branch {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid ${colors.border};
  }
  .sc-popup__branch-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .sc-popup__branch-name {
    font-size: 14px;
    font-weight: 700;
    color: ${colors.bright};
  }
  .sc-popup__ahead {
    font-size: 12px;
    color: ${colors.green};
  }
  .sc-popup__stats {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    padding: 16px;
    border-bottom: 1px solid ${colors.border};
  }
  .sc-popup__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }
  .sc-popup__stat-num {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
  }
  .sc-popup__stat-num--modified { color: ${colors.orange}; }
  .sc-popup__stat-num--added    { color: ${colors.green}; }
  .sc-popup__stat-num--deleted  { color: ${colors.red}; }
  .sc-popup__stat-label {
    font-size: 11px;
    color: ${colors.dim};
  }
  .sc-popup__footer {
    padding: 12px 16px;
  }
  .sc-popup__github {
    font-size: 13px;
    color: ${colors.blue};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  .settings-popup {
    position: fixed;
    left: 53px;
    bottom: 26px;
    width: 350px;
    max-height: calc(100svh - 60px);
    overflow-y: auto;
    background: ${colors.bg2};
    border: 1px solid ${colors.border};
    border-radius: 3px;
    box-shadow: 0 12px 28px -4px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.25);
    z-index: 500;
    scrollbar-width: thin;
    scrollbar-color: ${colors.bg4} transparent;
  }
  .settings-popup__header {
    padding: 10px 16px 9px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${colors.dim};
    border-bottom: 1px solid ${colors.border};
  }
  .settings-popup__divider {
    height: 1px;
    background: ${colors.border};
    margin: 4px 0;
  }
  .settings-popup__section {
    padding: 8px 16px 4px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${colors.dim};
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .settings-popup__action {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 16px;
    font-size: 13px;
    color: ${colors.text};
    cursor: pointer;
    text-decoration: none;
    transition: background 0.1s;
    &:hover {
      background: ${colors.bg4};
    }
  }
  .settings-popup__action-icon {
    width: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: ${colors.dim};
    font-size: 13px;
  }
  .settings-popup__action-label {
    flex: 1;
  }
  .settings-popup__action-shortcut {
    font-size: 11px;
    color: ${colors.dim};
    white-space: nowrap;
    flex-shrink: 0;
  }
  .settings-popup__kbd-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 6px 16px;
  }
  .settings-popup__kbd-key {
    font-size: 11px;
    color: ${colors.text};
    background: ${colors.bg5};
    border: 1px solid ${colors.border};
    border-radius: 4px;
    padding: 2px 8px;
    white-space: nowrap;
    flex-shrink: 0;
    min-width: 52px;
    text-align: center;
    font-family: inherit;
  }
  .settings-popup__kbd-desc {
    font-size: 12px;
    color: ${colors.dim};
  }
  .settings-popup__footer {
    padding: 12px 16px;
    border-top: 1px solid ${colors.border};
  }
  .settings-popup__footer-line {
    font-size: 11px;
    color: ${colors.dim};
    line-height: 1.7;
  }
  .settings-popup__footer-author {
    color: ${colors.purple};
  }
`

const ExplorerIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
)

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7"/>
    <path d="m21 21-4.4-4.4"/>
  </svg>
)

const GitIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="6" cy="6" r="2.5"/>
    <circle cx="6" cy="18" r="2.5"/>
    <circle cx="18" cy="12" r="2.5"/>
    <path d="M6 8.5v7M8.5 12h7"/>
  </svg>
)

const ExtensionsIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/>
    <path d="M14 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"/>
    <path d="M4 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/>
    <path d="M17 14v6M14 17h6"/>
  </svg>
)

const CopilotIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/>
  </svg>
)

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
)

const BranchIcon = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5" cy="3.5" r="1.8" stroke={colors.green} strokeWidth="1.3"/>
    <circle cx="5" cy="12.5" r="1.8" stroke={colors.green} strokeWidth="1.3"/>
    <circle cx="11.5" cy="8" r="1.8" stroke={colors.green} strokeWidth="1.3"/>
    <path d="M5 5.3v5.4" stroke={colors.green} strokeWidth="1.3"/>
    <path d="M5 5.3Q5 8 11.5 8" stroke={colors.green} strokeWidth="1.3"/>
  </svg>
)

function SourceControlPopup({ top, popupRef }) {
  return (
    <div
      ref={popupRef}
      className="sc-popup"
      style={{ top: Math.max(8, top + 5) }}
    >
      <div className="sc-popup__header">Source Control</div>
      <div className="sc-popup__branch">
        <div className="sc-popup__branch-left">
          <BranchIcon />
          <span className="sc-popup__branch-name">main</span>
        </div>
        <span className="sc-popup__ahead">↑ 1 commit ahead</span>
      </div>
      <div className="sc-popup__stats">
        <div className="sc-popup__stat">
          <span className="sc-popup__stat-num sc-popup__stat-num--modified">3</span>
          <span className="sc-popup__stat-label">Modified</span>
        </div>
        <div className="sc-popup__stat">
          <span className="sc-popup__stat-num sc-popup__stat-num--added">1</span>
          <span className="sc-popup__stat-label">Added</span>
        </div>
        <div className="sc-popup__stat">
          <span className="sc-popup__stat-num sc-popup__stat-num--deleted">0</span>
          <span className="sc-popup__stat-label">Deleted</span>
        </div>
      </div>
      <div className="sc-popup__footer">
        <a href="#" className="sc-popup__github">View on GitHub ↗</a>
      </div>
    </div>
  )
}

const QUICK_ACTIONS = [
  {
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.4-4.4"/></svg>,
    label: 'Command Palette',
    shortcut: 'Ctrl+P',
    action: 'palette',
  },
  {
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M8 9l4 3-4 3M13 15h3"/></svg>,
    label: 'Toggle Terminal',
    shortcut: 'Ctrl+`',
    action: 'terminal',
  },
  {
    icon: <span style={{ fontSize: 13 }}>✦</span>,
    label: 'Copilot Chat',
    action: 'copilot',
  },
  {
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>,
    label: 'Download Resume',
    action: 'resume',
  },
  {
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    label: 'Toggle Fullscreen',
    shortcut: 'F11',
    action: 'fullscreen',
  },
]

const KBD_SHORTCUTS = [
  { keys: 'Ctrl P',  desc: 'Go to file (command palette)' },
  { keys: 'Ctrl `',  desc: 'Toggle terminal' },
  { keys: 'Ctrl B',  desc: 'Toggle sidebar' },
  { keys: 'Esc',     desc: 'Close overlay' },
  { keys: '↑ / ↓',  desc: 'Terminal history' },
]

function SettingsPopup({ popupRef, onAction }) {
  return (
    <div ref={popupRef} className="settings-popup">
      <div className="settings-popup__header">Settings</div>
      <div className="settings-popup__section">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        Quick Actions
      </div>
      {QUICK_ACTIONS.map((item) =>
        item.action === 'resume' ? (
          <a
            key={item.action}
            className="settings-popup__action"
            href="/Stephen_Forbes_Resume.pdf"
            download="Stephen_Forbes_Resume.pdf"
            onClick={() => onAction('close')}
          >
            <span className="settings-popup__action-icon">{item.icon}</span>
            <span className="settings-popup__action-label">{item.label}</span>
          </a>
        ) : (
          <div
            key={item.action}
            className="settings-popup__action"
            onClick={() => onAction(item.action)}
          >
            <span className="settings-popup__action-icon">{item.icon}</span>
            <span className="settings-popup__action-label">{item.label}</span>
            {item.shortcut && <span className="settings-popup__action-shortcut">{item.shortcut}</span>}
          </div>
        )
      )}
      <div className="settings-popup__divider" />
      <div className="settings-popup__section">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01"/></svg>
        Keyboard Shortcuts
      </div>
      {KBD_SHORTCUTS.map((s) => (
        <div key={s.keys} className="settings-popup__kbd-row">
          <span className="settings-popup__kbd-key">{s.keys}</span>
          <span className="settings-popup__kbd-desc">{s.desc}</span>
        </div>
      ))}
      <div className="settings-popup__footer">
        <p className="settings-popup__footer-line">Portfolio v3.0 · React + Vite + Emotion</p>
        <p className="settings-popup__footer-line">
          Made with 💜 by <span className="settings-popup__footer-author">Stephen Forbes</span>
        </p>
      </div>
    </div>
  )
}

function ActivityBar() {
  const { open: openPalette } = useCommandPalette()
  const { toggle: toggleCopilot } = useCopilot()
  const { toggle: toggleTerminal } = useTerminal()
  const [gitOpen, setGitOpen] = useState(false)
  const [popupTop, setPopupTop] = useState(0)
  const gitBtnRef = useRef(null)
  const popupRef = useRef(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const settingsBtnRef = useRef(null)
  const settingsPopupRef = useRef(null)

  useEffect(() => {
    if (!gitOpen) return
    function onMouseDown(e) {
      if (gitBtnRef.current?.contains(e.target)) return
      if (popupRef.current?.contains(e.target)) return
      setGitOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [gitOpen])

  function handleGitClick() {
    if (!gitOpen && gitBtnRef.current) {
      const rect = gitBtnRef.current.getBoundingClientRect()
      setPopupTop(rect.top)
    }
    setGitOpen(v => !v)
  }

  useEffect(() => {
    if (!settingsOpen) return
    function onMouseDown(e) {
      if (settingsBtnRef.current?.contains(e.target)) return
      if (settingsPopupRef.current?.contains(e.target)) return
      setSettingsOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [settingsOpen])

  function handleSettingsAction(action) {
    switch (action) {
      case 'palette':  openPalette();    setSettingsOpen(false); break
      case 'terminal': toggleTerminal(); setSettingsOpen(false); break
      case 'copilot':  toggleCopilot(); setSettingsOpen(false); break
      case 'fullscreen':
        document.documentElement.requestFullscreen?.().catch(() => {})
        setSettingsOpen(false)
        break
      case 'close': setSettingsOpen(false); break
    }
  }

  return (
    <>
      <Global styles={style} />
      <aside className="activity-bar">
        <div className="activity-bar__top">
          {[
            { id: 'explorer',   Icon: ExplorerIcon   },
            { id: 'search',     Icon: SearchIcon,    onClick: openPalette },
            { id: 'git',        Icon: GitIcon,       onClick: handleGitClick, ref: gitBtnRef, open: gitOpen },
            { id: 'extensions', Icon: ExtensionsIcon },
            { id: 'copilot',    Icon: CopilotIcon,   onClick: toggleCopilot, extra: 'activity-bar__btn--copilot' },
          ].map(({ id, Icon, onClick, ref: btnRef, open, extra }, i) => (
            <div key={id} className={`activity-bar__item${i === 0 ? ' activity-bar__item--active' : ''}`}>
              <button
                ref={btnRef}
                className={`activity-bar__btn${open ? ' activity-bar__btn--open' : ''}${extra ? ` ${extra}` : ''}`}
                aria-label={id}
                onClick={onClick}
              >
                <Icon />
              </button>
            </div>
          ))}
        </div>
        <div className="activity-bar__bottom">
          <div className="activity-bar__item">
            <button
              ref={settingsBtnRef}
              className={`activity-bar__btn${settingsOpen ? ' activity-bar__btn--open' : ''}`}
              aria-label="settings"
              onClick={() => setSettingsOpen(v => !v)}
            >
              <SettingsIcon />
            </button>
          </div>
        </div>
      </aside>
      {gitOpen && (
        <SourceControlPopup top={popupTop} popupRef={popupRef} />
      )}
      {settingsOpen && (
        <SettingsPopup popupRef={settingsPopupRef} onAction={handleSettingsAction} />
      )}
    </>
  )
}

export default ActivityBar
