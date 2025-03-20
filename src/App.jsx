import React, { useState } from 'react'
import Header from './components/Header.jsx'
import ContasForm from './components/ContasForm.jsx'
import ContasList from './components/ContasList.jsx'
import Relatorios from './components/Relatorios.jsx'

function App() {
  const [contas, setContas] = useState([
    { id: 1, descricao: 'Aluguel', valor: 1200, tipo: 'A Pagar', data: '2025-03-20' },
    { id: 2, descricao: 'Salário', valor: 5000, tipo: 'A Receber', data: '2025-03-25' },
    { id: 3, descricao: 'Internet', valor: 120, tipo: 'A Pagar', data: '2025-03-28' }
  ])

  const handleAddConta = (novaConta) => {
    setContas([...contas, { ...novaConta, id: contas.length + 1 }])
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pt-20 p-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <ContasForm onAddConta={handleAddConta} />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <Relatorios contas={contas} />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <ContasList contas={contas} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
