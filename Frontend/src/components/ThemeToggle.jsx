import React from "react"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm"
    >
      {dark ? "Light" : "Dark"}
    </button>
  )
}