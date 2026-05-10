import { createContext, useContext, useState } from 'react'

const SidebarContext = createContext(null)

export function SidebarProvider({ children }) {
  const [isVisible, setIsVisible] = useState(true)
  return (
    <SidebarContext.Provider value={{ isVisible, toggle: () => setIsVisible(v => !v) }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  return useContext(SidebarContext)
}
