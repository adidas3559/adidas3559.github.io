import { Global, css } from '@emotion/react'
import { Link } from '@tanstack/react-router'
import { colors } from '../styles'
import { ReactIcon, HtmlIcon, TsIcon, JsIcon, JsonIcon, CssIcon, MdIcon } from './FileIcons'

const routeIconMap = {
  '/':           ReactIcon,
  '/about':      HtmlIcon,
  '/experience': TsIcon,
  '/projects':   JsIcon,
  '/skills':     JsonIcon,
  '/contact':    CssIcon,
  '/readme':     MdIcon,
}

const routeAccent = {
  '/':           colors.blue,
  '/about':      colors.orange,
  '/experience': colors.blue2,
  '/projects':   colors.yellow,
  '/skills':     colors.yellow,
  '/contact':    colors.blue,
  '/readme':     colors.blue2,
}

const style = css`
  .tab-bar {
    display: flex;
    align-items: flex-end;
    height: 35px;
    background: ${colors.bg2};
    border-bottom: 1px solid ${colors.border};
    overflow-x: auto;
    overflow-y: hidden;
    flex-shrink: 0;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
  .tab-bar__tab {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 0 12px 0 10px;
    height: 35px;
    border-right: 1px solid ${colors.border};
    border-top: 2px solid transparent;
    background: ${colors.bg2};
    color: ${colors.dim};
    font-size: 13px;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: color 0.1s;
    &:hover {
      color: ${colors.text};
    }
    &:hover .tab-bar__close {
      opacity: 1;
    }
  }
  .tab-bar__tab--active {
    background: ${colors.bg};
    color: ${colors.text};
    border-bottom: 2px solid ${colors.bg};
    margin-bottom: -1px;
    .tab-bar__close {
      opacity: 1;
    }
  }
  .tab-bar__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    flex-shrink: 0;
  }
  .tab-bar__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 3px;
    font-size: 16px;
    line-height: 1;
    opacity: 0;
    flex-shrink: 0;
    color: ${colors.dim};
    transition: opacity 0.1s, color 0.1s, background 0.1s;
    &:hover {
      background: ${colors.bg4};
      color: ${colors.bright};
    }
  }
`

function FileIcon({ to }) {
  const Icon = routeIconMap[to]
  return Icon ? <span className="tab-bar__icon"><Icon size={15} /></span> : null
}

function TabBar({ tabs, activeTab, onClose }) {
  return (
    <>
      <Global styles={style} />
      <div className="tab-bar">
        {tabs.map(({ to, file }) => {
          const isActive = to === activeTab
          const accent = routeAccent[to] ?? colors.dim
          return (
            <Link
              key={to}
              to={to}
              className={`tab-bar__tab${isActive ? ' tab-bar__tab--active' : ''}`}
              style={isActive ? { borderTopColor: accent } : undefined}
            >
              <FileIcon to={to} />
              <span>{file}</span>
              <span
                className="tab-bar__close"
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  onClose(to)
                }}
              >
                ×
              </span>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default TabBar
