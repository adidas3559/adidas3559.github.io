import { Global, css } from '@emotion/react'
import { Outlet } from '@tanstack/react-router'
import { GlobalColors, GlobalFonts, GlobalBase, colors } from '../styles'
import StatusBar from './StatusBar.jsx'
import BreadcrumbBar from './BreadcrumbBar.jsx'
import Sidebar from './Sidebar.jsx'

const style = css`
  .layout-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 100svh;
    background: ${colors.bg};
  }
`

function Layout() {
  return (
    <>
      <GlobalBase />
      <GlobalColors />
      <GlobalFonts />
      <Global styles={style} />
      <Sidebar />
      <div className="layout-main">
        <BreadcrumbBar />
        <Outlet />
      </div>
      <StatusBar />
    </>
  )
}

export default Layout
