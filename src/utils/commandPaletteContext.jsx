import { createContext, useContext, useState } from 'react'

const CommandPaletteContext = createContext(null)

export function CommandPaletteProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <CommandPaletteContext.Provider value={{
      isOpen,
      open:  () => setIsOpen(true),
      close: () => setIsOpen(false),
    }}>
      {children}
    </CommandPaletteContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCommandPalette() {
  return useContext(CommandPaletteContext)
}
