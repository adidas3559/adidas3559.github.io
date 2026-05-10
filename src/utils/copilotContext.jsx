import { createContext, useContext, useState } from 'react'

const CopilotContext = createContext(null)

export function CopilotProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <CopilotContext.Provider value={{
      isOpen,
      open:   () => setIsOpen(true),
      close:  () => setIsOpen(false),
      toggle: () => setIsOpen(v => !v),
    }}>
      {children}
    </CopilotContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCopilot() {
  return useContext(CopilotContext)
}
