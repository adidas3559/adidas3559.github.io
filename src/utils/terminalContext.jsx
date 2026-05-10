import { createContext, useContext, useState } from 'react'

const TerminalContext = createContext(null)

export function TerminalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <TerminalContext.Provider value={{
      isOpen,
      toggle: () => setIsOpen(v => !v),
      close:  () => setIsOpen(false),
    }}>
      {children}
    </TerminalContext.Provider>
  )
}

export function useTerminal() {
  return useContext(TerminalContext)
}
