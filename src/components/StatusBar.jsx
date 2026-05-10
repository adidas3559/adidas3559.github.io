import { Global, css } from '@emotion/react'
import { useState, useEffect } from 'react'
import { colors } from '../styles'
import { useTerminal } from '../utils/terminalContext'

const style = css`
  .status-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 22px;
    background: ${colors.blue2};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4px;
    z-index: 1000;
    user-select: none;
  }
  .status-bar__group {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 6px;
  }
  .status-bar__item {
    font-size: 11px;
    color: ${colors.bright};
    padding: 1px 5px;
    display: flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
    cursor: default;
    border-radius: 0;
    transition: background 0.1s ease;
  }
  .status-bar__item:hover {
    background: ${colors.bright + '26'};
    border-radius: 2px;
  }
  .status-bar__item svg {
    flex-shrink: 0;
  }
  @media (max-width: 1100px) {
    .status-bar__item--terminal {
      display: none;
    }
  }
  @media (max-width: 768px) {
    .status-bar__item--meta {
      display: none;
    }
  }
  @media (max-width: 568px) {
    .status-bar__item--warnings,
    .status-bar__item--branch {
      display: none;
    }
  }
`

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
}

function StatusBar() {
  const [time, setTime] = useState(getTime)
  const { toggle } = useTerminal()

  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 10000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <Global styles={style} />
      <div className="status-bar">
        <div className="status-bar__group">
          <span className="status-bar__item status-bar__item--terminal" style={{ cursor: 'pointer' }} onClick={toggle}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M8 9l4 3-4 3M13 15h3"/>
            </svg>
          </span>
          <span className="status-bar__item status-bar__item--warnings">
            ⚠ 0
          </span>
          <span className="status-bar__item status-bar__item--branch">
            ⎇ main
          </span>
          <span className="status-bar__item">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            Stephen's Portfolio
          </span>
        </div>
        <div className="status-bar__group">
          <span className="status-bar__item status-bar__item--meta">React</span>
          <span className="status-bar__item status-bar__item--meta">Vite</span>
          <span className="status-bar__item status-bar__item--meta">UTF-8</span>
          <span className="status-bar__item status-bar__item--meta">Prettier</span>
          <span className="status-bar__item">VS Dark</span>
          <span className="status-bar__item">{time}</span>
        </div>
      </div>
    </>
  )
}

export default StatusBar
