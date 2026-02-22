import { createContext, useState } from "react"

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true)

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <div className={dark ? "dark bg-[#060B16]" : "bg-white"}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}