import React from 'react'
import Header from './components/Header.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ContasPage from './pages/ContasPage.jsx'
import Dashboard from './pages/Dashboard.jsx'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <main className="pt-20 p-4">
          <div className="container mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/caixa/contas" element={<ContasPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App
