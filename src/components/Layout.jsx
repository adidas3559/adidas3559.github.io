import { useEffect, useState } from 'react'
import { Global, css } from '@emotion/react'
import { Outlet, useRouterState, useNavigate } from '@tanstack/react-router'
import { GlobalColors, GlobalFonts, GlobalBase, colors } from '../styles'
import StatusBar from './StatusBar.jsx'
import BreadcrumbBar from './BreadcrumbBar.jsx'
import ActivityBar from './ActivityBar.jsx'
import Sidebar from './Sidebar.jsx'
import TabBar from './TabBar.jsx'
import { routeConfig } from '../utils/routeConfig.js'
import { CommandPaletteProvider } from '../utils/commandPaletteContext.jsx'
import CommandPalette from './CommandPalette.jsx'
import { TerminalProvider, useTerminal } from '../utils/terminalContext.jsx'
import Terminal, { TERMINAL_HEIGHT } from './Terminal.jsx'
import MenuBar from './MenuBar.jsx'
import MobileMenuBar from './MobileMenuBar.jsx'
import { SidebarProvider, useSidebar } from '../utils/sidebarContext.jsx'
import { TabsProvider, useTabs } from '../utils/tabsContext.jsx'
import { CopilotProvider, useCopilot } from '../utils/copilotContext.jsx'
import CopilotPanel from './CopilotPanel.jsx'

const style = css`
  .layout-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    background: ${colors.bg};
  }
  .layout-content {
    flex: 1;
    overflow-y: auto;
    scrollbar-gutter: stable;
    scrollbar-color: ${colors.bg4} ${colors.bg};
    min-height: 0;
  }
`

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 1100px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1100px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return isMobile
}

function LayoutInner() {
  const { location } = useRouterState()
  const navigate = useNavigate()


  const { tabs, setTabs } = useTabs()

  useEffect(() => {
    const path = location.pathname
    const config = routeConfig[path]
    if (!config) return
     
    setTabs(prev =>
      prev.find(t => t.to === path) ? prev : [...prev, { to: path, ...config }]
    )
  }, [location.pathname, setTabs])

  function handleClose(to) {
    const idx = tabs.findIndex(t => t.to === to)
    const next = tabs[idx + 1] ?? tabs[idx - 1]
    const remaining = tabs.filter(t => t.to !== to)
    setTabs(remaining)
    if (to === location.pathname) {
      navigate({ to: next?.to ?? (remaining.length === 0 ? '/no-tabs' : '/') })
    }
  }

  const { isOpen: terminalOpen } = useTerminal()
  const { isVisible: sidebarVisible } = useSidebar()
  const { isOpen: copilotOpen } = useCopilot()
  const isMobile = useIsMobile()

  return (
    <CommandPaletteProvider>
      <GlobalBase />
      <GlobalColors />
      <GlobalFonts />
      <Global styles={style} />
      <MenuBar />
      <MobileMenuBar />
      <ActivityBar />
      {sidebarVisible && <Sidebar />}
      <div
        className="layout-main"
        style={{ height: `calc(100svh - var(--menu-height) - 22px${terminalOpen ? ` - ${TERMINAL_HEIGHT}px` : ''})` }}
      >
        {tabs.length > 0 && (
          <TabBar tabs={tabs} activeTab={location.pathname} onClose={handleClose} />
        )}
        {location.pathname !== '/no-tabs' && <BreadcrumbBar />}
        <div className="layout-content">
          <Outlet />
        </div>
      </div>
      <StatusBar />
      {!isMobile && <Terminal />}
      <CommandPalette />
      {copilotOpen && <CopilotPanel />}
    </CommandPaletteProvider>
  )
}

function Layout() {
  return (
    <TerminalProvider>
      <SidebarProvider>
        <TabsProvider>
          <CopilotProvider>
            <LayoutInner />
          </CopilotProvider>
        </TabsProvider>
      </SidebarProvider>
    </TerminalProvider>
  )
}

export default Layout
