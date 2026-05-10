import { useState, useEffect, useRef } from 'react'
import { Global, css } from '@emotion/react'
import { useNavigate, useRouterState } from '@tanstack/react-router'
import { colors } from '../styles'
import { useCommandPalette } from '../utils/commandPaletteContext'
import { useSidebar } from '../utils/sidebarContext'
import { useTerminal } from '../utils/terminalContext'
import { useTabs } from '../utils/tabsContext'
import { useCopilot } from '../utils/copilotContext'

export const MENU_BAR_HEIGHT = 28

let _zoomLevel = 1
const ZOOM_STEP = 0.1
const ZOOM_MIN = 0.5
const ZOOM_MAX = 2

function applyZoom(next) {
  _zoomLevel = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, next))
  document.documentElement.style.zoom = String(_zoomLevel)
}

const MENUS = [
  {
    label: 'File',
    items: [
      { label: 'New Tab', shortcut: 'Ctrl+T' },
      { label: 'Open File…', shortcut: 'Ctrl+P', action: 'open-palette' },
      { type: 'sep' },
      { label: 'Close Tab', shortcut: 'Ctrl+W', action: 'close-tab' },
      { label: 'Close All Tabs', action: 'close-all-tabs' },
      { type: 'sep' },
      { type: 'header', label: 'OPEN RECENT' },
      { label: 'home.tsx', to: '/' },
      { label: 'about.html', to: '/about' },
      { label: 'projects.js', to: '/projects' },
      { label: 'skills.json', to: '/skills' },
      { type: 'sep' },
      { label: 'Download Resume', href: '/Stephen_Forbes_Resume.pdf', download: 'Stephen_Forbes_Resume.pdf' },
    ],
  },
  {
    label: 'Edit',
    items: [
      { label: 'Find…', shortcut: 'Ctrl+P', action: 'open-palette' },
      { type: 'sep' },
      { label: 'Select All', shortcut: 'Ctrl+A', action: 'select-all' },
      { label: 'Copy', shortcut: 'Ctrl+C', action: 'copy' },
    ],
  },
  {
    label: 'View',
    items: [
      { label: 'Command Palette', shortcut: 'Ctrl+P', action: 'open-palette' },
      { label: 'Toggle Sidebar', shortcut: 'Ctrl+B', action: 'toggle-sidebar' },
      { label: 'Toggle Terminal', shortcut: 'Ctrl+`', action: 'toggle-terminal' },
      { label: "Stephen's Copilot", shortcut: 'Ctrl+Shift+C', action: 'open-copilot', icon: '✨', special: 'copilot' },
      { type: 'sep' },
      { label: 'Enter Full Screen', shortcut: 'F11', action: 'fullscreen' },
      { label: 'Zoom In', shortcut: 'Ctrl++', action: 'zoom-in' },
      { label: 'Zoom Out', shortcut: 'Ctrl+-', action: 'zoom-out' },
      { label: 'Reset Zoom', action: 'reset-zoom' },
    ],
  },
  {
    label: 'Go',
    items: [
      { label: 'Go to File…', shortcut: 'Ctrl+P', action: 'open-palette' },
      { type: 'sep' },
      { type: 'header', label: 'FILES' },
      { label: 'home.tsx', to: '/' },
      { label: 'about.html', to: '/about' },
      { label: 'projects.js', to: '/projects' },
      { label: 'skills.json', to: '/skills' },
      { label: 'experience.ts', to: '/experience' },
      { label: 'contact.css', to: '/contact' },
      { label: 'README.md', to: '/readme' },
      { label: 'Stephen_Forbes_Resume.pdf', href: '/Stephen_Forbes_Resume.pdf', download: 'Stephen_Forbes_Resume.pdf' },
    ],
  },
  {
    label: 'Run',
    items: [
      { label: 'Start Terminal', shortcut: 'Ctrl+`', action: 'toggle-terminal' },
      { label: 'Run Last Command' },
    ],
  },
  {
    label: 'Terminal',
    items: [
      { label: 'New Terminal', shortcut: 'Ctrl+`', action: 'toggle-terminal' },
      { label: 'Toggle Terminal', shortcut: 'Ctrl+`', action: 'toggle-terminal' },
      { label: 'Clear Terminal', action: 'clear-terminal' },
    ],
  },
  {
    label: 'Help',
    items: [
      { label: 'Command Palette', shortcut: 'Ctrl+P', action: 'open-palette' },
      { type: 'sep' },
      { type: 'header', label: 'KEYBOARD SHORTCUTS' },
      { type: 'kbd-row', keys: 'Ctrl+P', desc: 'Go to file' },
      { type: 'kbd-row', keys: 'Ctrl+B', desc: 'Toggle sidebar' },
      { type: 'kbd-row', keys: 'Ctrl+`', desc: 'Toggle terminal' },
      { type: 'kbd-row', keys: 'Ctrl+Shift+C', desc: 'Toggle Copilot ✨' },
      { type: 'kbd-row', keys: 'Esc', desc: 'Close overlay' },
      { type: 'sep' },
      { label: 'GitHub ↗', href: 'https://github.com/adidas3559', target: '_blank' },
      { label: 'About', to: '/about' },
    ],
  },
  { label: 'Copilot', items: [], action: 'open-copilot' },
]

const style = css`
  .menu-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: ${MENU_BAR_HEIGHT}px;
    background: ${colors.bg3};
    border-bottom: 1px solid ${colors.border};
    display: flex;
    align-items: center;
    padding: 0 4px;
    z-index: 1999;
    user-select: none;
    flex-shrink: 0;
  }
  @media (max-width: 1100px) {
    .menu-bar {
      display: none;
    }
  }
  .menu-bar__btn {
    height: 22px;
    padding: 0 8px;
    font-size: 13px;
    color: ${colors.text};
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 3px;
    font-family: inherit;
    transition: background 0.1s;
  }
  .menu-bar__btn:hover,
  .menu-bar__btn--open {
    background: ${colors.bg4};
  }
  .menu-bar__dropdown {
    position: fixed;
    top: ${MENU_BAR_HEIGHT}px;
    z-index: 2000;
    min-width: 260px;
    background: ${colors.bg3};
    border: 1px solid ${colors.border};
    border-top: none;
    box-shadow: 0 8px 24px rgba(0,0,0,0.55);
    border-radius: 0 0 3px 3px;
    padding: 4px 0;
  }
  .menu-bar__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 5px 18px;
    font-size: 13px;
    color: ${colors.text};
    cursor: pointer;
    text-decoration: none;
    transition: background 0.05s;
  }
  .menu-bar__item:hover {
    background: ${colors.blue2};
    color: ${colors.bright};
  }
  .menu-bar__item:hover .menu-bar__shortcut {
    color: ${colors.bright};
  }
  .menu-bar__item--copilot {
    color: ${colors.purple};
  }
  .menu-bar__item--copilot .menu-bar__shortcut {
    color: ${colors.purple};
  }
  .menu-bar__item--copilot:hover {
    color: ${colors.bright};
  }
  .menu-bar__item--copilot:hover .menu-bar__shortcut {
    color: ${colors.bright};
  }
  .menu-bar__shortcut {
    font-size: 12px;
    color: ${colors.dim};
    white-space: nowrap;
    flex-shrink: 0;
  }
  .menu-bar__sep {
    height: 1px;
    background: ${colors.border};
    margin: 4px 0;
  }
  .menu-bar__section-header {
    padding: 6px 18px 3px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${colors.dim};
    cursor: default;
  }
  .menu-bar__kbd-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 4px 18px;
    cursor: default;
  }
  .menu-bar__kbd-key {
    font-size: 11px;
    color: ${colors.text};
    background: ${colors.bg5};
    border: 1px solid ${colors.border};
    border-radius: 4px;
    padding: 2px 7px;
    white-space: nowrap;
    flex-shrink: 0;
    font-family: inherit;
  }
  .menu-bar__kbd-desc {
    font-size: 13px;
    color: ${colors.dim};
  }
`

function Dropdown({ menu, left, onClose, onAction, dropdownRef }) {
  const navigate = useNavigate()

  function handleItemClick(item) {
    onClose()
    if (item.to) {
      navigate({ to: item.to })
    } else if (item.action) {
      setTimeout(() => onAction(item.action), 0)
    }
  }

  return (
    <div ref={dropdownRef} className="menu-bar__dropdown" style={{ left }}>
      {menu.items.map((item, i) => {
        if (item.type === 'sep') return <div key={i} className="menu-bar__sep" />
        if (item.type === 'header') return <div key={i} className="menu-bar__section-header">{item.label}</div>
        if (item.type === 'kbd-row') {
          return (
            <div key={i} className="menu-bar__kbd-row">
              <span className="menu-bar__kbd-key">{item.keys}</span>
              <span className="menu-bar__kbd-desc">{item.desc}</span>
            </div>
          )
        }
        if (item.href) {
          return (
            <a
              key={i}
              className="menu-bar__item"
              href={item.href}
              download={item.download}
              target={item.target}
              rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
              onClick={onClose}
            >
              <span>{item.label}</span>
            </a>
          )
        }
        const cls = `menu-bar__item${item.special ? ` menu-bar__item--${item.special}` : ''}`
        return (
          <div key={i} className={cls} onClick={() => handleItemClick(item)}>
            <span>{item.icon ? `${item.icon} ${item.label}` : item.label}</span>
            {item.shortcut && <span className="menu-bar__shortcut">{item.shortcut}</span>}
          </div>
        )
      })}
    </div>
  )
}

function MenuBar() {
  const [openIdx, setOpenIdx] = useState(-1)
  const [dropdownLeft, setDropdownLeft] = useState(0)
  const barRef = useRef(null)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()
  const { location } = useRouterState()
  const { open: openPalette } = useCommandPalette()
  const { toggle: toggleSidebar } = useSidebar()
  const { toggle: toggleTerminal } = useTerminal()
  const { tabs, setTabs, closeAll } = useTabs()
  const { toggle: toggleCopilot } = useCopilot()

  function handleAction(action) {
    switch (action) {
      case 'open-palette':
        openPalette()
        break
      case 'toggle-sidebar':
        toggleSidebar()
        break
      case 'toggle-terminal':
        toggleTerminal()
        break
      case 'open-copilot':
        toggleCopilot()
        break
      case 'select-all': {
        const sel = window.getSelection()
        const range = document.createRange()
        range.selectNodeContents(document.body)
        sel?.removeAllRanges()
        sel?.addRange(range)
        break
      }
      case 'copy': {
        const text = window.getSelection()?.toString() || ''
        if (text) navigator.clipboard.writeText(text)
        break
      }
      case 'fullscreen':
        document.documentElement.requestFullscreen?.().catch(() => {})
        break
      case 'zoom-in':
        applyZoom(_zoomLevel + ZOOM_STEP)
        break
      case 'zoom-out':
        applyZoom(_zoomLevel - ZOOM_STEP)
        break
      case 'reset-zoom':
        applyZoom(1)
        break
      case 'clear-terminal':
        break
      case 'close-tab': {
        const path = location.pathname
        const idx = tabs.findIndex(t => t.to === path)
        if (idx === -1) break
        const remaining = tabs.filter(t => t.to !== path)
        const next = tabs[idx + 1] ?? tabs[idx - 1]
        setTabs(remaining)
        navigate({ to: remaining.length === 0 ? '/no-tabs' : next?.to ?? '/' })
        break
      }
      case 'close-all-tabs':
        closeAll()
        navigate({ to: '/no-tabs' })
        break
    }
  }

  useEffect(() => {
    function onKey(e) {
      if (e.ctrlKey && !e.shiftKey && e.key === 'p') {
        e.preventDefault()
        openPalette()
      }
      if (e.ctrlKey && !e.shiftKey && e.key === 'b') {
        e.preventDefault()
        toggleSidebar()
      }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault()
        toggleCopilot()
      }
      if (e.key === 'F11') {
        e.preventDefault()
        document.documentElement.requestFullscreen?.().catch(() => {})
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openPalette, toggleSidebar, toggleCopilot])

  useEffect(() => {
    if (openIdx === -1) return
    function onMouseDown(e) {
      if (barRef.current?.contains(e.target)) return
      if (dropdownRef.current?.contains(e.target)) return
      setOpenIdx(-1)
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [openIdx])

  function handleMenuClick(idx, e) {
    if (MENUS[idx].items.length === 0) {
      setOpenIdx(-1)
      if (MENUS[idx].action) handleAction(MENUS[idx].action)
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    setDropdownLeft(rect.left)
    setOpenIdx(v => (v === idx ? -1 : idx))
  }

  const openMenu = openIdx >= 0 ? MENUS[openIdx] : null

  return (
    <>
      <Global styles={style} />
      <div ref={barRef} className="menu-bar">
        {MENUS.map((menu, idx) => (
          <button
            key={menu.label}
            className={`menu-bar__btn${openIdx === idx ? ' menu-bar__btn--open' : ''}`}
            onClick={(e) => handleMenuClick(idx, e)}
          >
            {menu.label}
          </button>
        ))}
      </div>
      {openMenu && openMenu.items.length > 0 && (
        <Dropdown
          menu={openMenu}
          left={dropdownLeft}
          onClose={() => setOpenIdx(-1)}
          onAction={handleAction}
          dropdownRef={dropdownRef}
        />
      )}
    </>
  )
}

export default MenuBar
