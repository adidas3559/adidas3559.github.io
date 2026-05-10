import { createContext, useContext, useState } from 'react'
import { routeConfig } from './routeConfig'

const TabsContext = createContext(null)

export function TabsProvider({ children }) {
  const [tabs, setTabs] = useState(() => {
    const path = window.location.pathname
    const config = routeConfig[path]
    return config ? [{ to: path, ...config }] : []
  })

  function closeAll() {
    setTabs([])
  }

  return (
    <TabsContext.Provider value={{ tabs, setTabs, closeAll }}>
      {children}
    </TabsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTabs() {
  return useContext(TabsContext)
}
