import { useState, useEffect, useRef } from 'react'
import { Global, css } from '@emotion/react'
import { useNavigate } from '@tanstack/react-router'
import { colors } from '../styles'
import { useCommandPalette } from '../utils/commandPaletteContext'
import {
  ReactIcon, HtmlIcon, TsIcon, JsIcon, JsonIcon, CssIcon, MdIcon,
} from './FileIcons'

const allFiles = [
  { to: '/',           filename: 'home.tsx',      dir: 'src',  Icon: ReactIcon },
  { to: '/about',      filename: 'about.html',    dir: 'src',  Icon: HtmlIcon  },
  { to: '/projects',   filename: 'projects.js',   dir: 'src',  Icon: JsIcon    },
  { to: '/skills',     filename: 'skills.json',   dir: 'data', Icon: JsonIcon  },
  { to: '/experience', filename: 'experience.ts', dir: 'src',  Icon: TsIcon    },
  // { to: '/contact',    filename: 'contact.css',   dir: 'src',  Icon: CssIcon   },
  // { to: '/readme',     filename: 'README.md',     dir: 'src',  Icon: MdIcon    },
]

const style = css`
  .cp-overlay {
    position: fixed;
    inset: 0;
    z-index: 200;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 14vh;
    background: rgba(0, 0, 0, 0.55);
  }
  .cp-modal {
    width: 620px;
    max-width: calc(100vw - 32px);
    background: ${colors.bg3};
    border: 1px solid ${colors.border};
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-height: 70vh;
  }
  .cp-input-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    border-bottom: 1px solid ${colors.border};
    flex-shrink: 0;
  }
  .cp-prompt {
    font-size: 16px;
    color: ${colors.dim};
    flex-shrink: 0;
    line-height: 1;
  }
  .cp-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: 15px;
    color: ${colors.text};
    font-family: inherit;
    caret-color: ${colors.blue};
    caret-shape: block;
    &::placeholder {
      color: ${colors.dim};
    }
  }
  .cp-esc {
    font-size: 11px;
    color: ${colors.dim};
    background: ${colors.bg4};
    border: 1px solid ${colors.border};
    border-radius: 4px;
    padding: 3px 7px;
    flex-shrink: 0;
    cursor: pointer;
    transition: color 0.1s;
    &:hover {
      color: ${colors.text};
    }
  }
  .cp-list {
    overflow-y: auto;
    flex: 1;
    scrollbar-width: thin;
    scrollbar-color: ${colors.bg4} transparent;
  }
  .cp-section-label {
    padding: 8px 16px 6px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${colors.dim};
    border-bottom: 1px solid ${colors.border};
  }
  .cp-cmd-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 9px 16px;
    cursor: pointer;
    position: relative;
    transition: background 0.1s;
    &:hover {
      background: ${colors.purple + '22'};
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 2px;
        background: ${colors.purple};
      }
    }
  }
  .cp-cmd-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .cp-cmd-icon {
    color: ${colors.purple};
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  .cp-cmd-name {
    font-size: 14px;
    color: ${colors.purple};
  }
  .cp-cmd-shortcut {
    font-size: 11px;
    color: ${colors.dim};
    background: ${colors.bg4};
    border: 1px solid ${colors.border};
    border-radius: 4px;
    padding: 3px 7px;
    flex-shrink: 0;
  }
  .cp-file-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background 0.1s;
    &:hover {
      background: ${colors.bg4};
    }
  }
  .cp-file-item--selected {
    background: ${colors.bg4};
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 2px;
      background: ${colors.green};
    }
  }
  .cp-file-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .cp-file-name {
    flex: 1;
    font-size: 14px;
    color: ${colors.text};
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .cp-file-dir {
    font-size: 13px;
    color: ${colors.dim};
    flex-shrink: 0;
  }
  .cp-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 14px;
    border-top: 1px solid ${colors.border};
    flex-shrink: 0;
  }
  .cp-footer-hints {
    font-size: 11px;
    color: ${colors.dim};
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .cp-footer-sep {
    color: ${colors.border};
  }
  .cp-footer-tip {
    font-size: 11px;
    color: ${colors.dim};
  }
`

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/>
  </svg>
)

function CommandPaletteInner() {
  const { close } = useCommandPalette()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  const showQuery = query.trim().toLowerCase()
  const filtered = showQuery
    ? allFiles.filter(f => f.filename.toLowerCase().includes(showQuery))
    : allFiles
  const showCommands = !showQuery

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') { close(); return }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(i => Math.min(i + 1, filtered.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(i => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter' && filtered[selectedIndex]) {
        navigate({ to: filtered[selectedIndex].to })
        close()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [close, filtered, selectedIndex, navigate])

  function handleQueryChange(e) {
    setQuery(e.target.value)
    setSelectedIndex(0)
  }

  function handleFileClick(to) {
    navigate({ to })
    close()
  }

  return (
    <div className="cp-overlay" onMouseDown={close}>
        <div className="cp-modal" onMouseDown={e => e.stopPropagation()}>
          <div className="cp-input-row">
            <span className="cp-prompt">{'>'}</span>
            <input
              ref={inputRef}
              className="cp-input"
              value={query}
              onChange={handleQueryChange}
              placeholder="Go to file or run command..."
            />
            <span className="cp-esc" onClick={close}>Esc</span>
          </div>
          <div className="cp-list">
            {showCommands && (
              <>
                <div className="cp-section-label">Commands</div>
                {/* <div className="cp-cmd-item">
                  <div className="cp-cmd-left">
                    <span className="cp-cmd-icon"><SparkleIcon /></span>
                    <span className="cp-cmd-name">Open Stephen's Copilot</span>
                  </div>
                  <span className="cp-cmd-shortcut">Ctrl+Shift+C</span>
                </div> */}
                <div className="cp-section-label">Files</div>
              </>
            )}
            {filtered.map(({ to, filename, dir, Icon }, i) => (
              <div
                key={to}
                className={`cp-file-item${i === selectedIndex ? ' cp-file-item--selected' : ''}`}
                onClick={() => handleFileClick(to)}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <span className="cp-file-icon"><Icon size={28} /></span>
                <span className="cp-file-name">{filename}</span>
                <span className="cp-file-dir">{dir}/</span>
              </div>
            ))}
          </div>
          <div className="cp-footer">
            <div className="cp-footer-hints">
              <span>↑↓ navigate</span>
              <span className="cp-footer-sep">·</span>
              <span>↵ open</span>
              <span className="cp-footer-sep">·</span>
              <span>Esc close</span>
            </div>
            <span className="cp-footer-tip">Tip: type "copilot" to open AI chat</span>
          </div>
        </div>
      </div>
  )
}

function CommandPalette() {
  const { isOpen } = useCommandPalette()
  return (
    <>
      <Global styles={style} />
      {isOpen && <CommandPaletteInner />}
    </>
  )
}

export default CommandPalette
