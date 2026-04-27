import { Global, css } from '@emotion/react'
import { useRouterState } from '@tanstack/react-router'
import { colors } from '../styles'

const style = css`
  .breadcrumb-bar {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0 16px;
    height: 28px;
    background: ${colors.bg};
    border-bottom: 1px solid ${colors.border};
    flex-shrink: 0;
  }
  .breadcrumb-bar__segment {
    font-size: 12px;
    color: ${colors.dim};
  }
  .breadcrumb-bar__segment--active {
    color: ${colors.text};
    font-weight: 600;
  }
  .breadcrumb-bar__sep {
    font-size: 11px;
    color: ${colors.border};
  }
`

const routeMap = {
  '/':           'home.tsx',
  '/about':      'about.tsx',
  '/experience': 'experience.ts',
  '/projects':   'projects.tsx',
  '/skills':     'skills.json',
  '/contact':    'contact.css',
  '/readme':     'README.md',
}

function BreadcrumbBar() {
  const { location } = useRouterState()
  const filename = routeMap[location.pathname] ?? 'index.tsx'

  return (
    <>
      <Global styles={style} />
      <div className="breadcrumb-bar">
        <span className="breadcrumb-bar__segment">stephen-forbes</span>
        <span className="breadcrumb-bar__sep">›</span>
        <span className="breadcrumb-bar__segment">src</span>
        <span className="breadcrumb-bar__sep">›</span>
        <span className="breadcrumb-bar__segment breadcrumb-bar__segment--active">{filename}</span>
      </div>
    </>
  )
}

export default BreadcrumbBar
