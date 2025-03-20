import React, { useState, useEffect } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function Header() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <header className="bg-gray-900 dark:bg-gray-800 text-white fixed top-0 w-full p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">GHPO System</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
        >
          {darkMode ? (
            <FaSun className="w-6 h-6" />
          ) : (
            <FaMoon className="w-6 h-6" />
          )}
        </button>
      </div>
    </header>
  )
}
