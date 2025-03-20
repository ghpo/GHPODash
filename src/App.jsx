import React, { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import ContasForm from './components/ContasForm.jsx'
import ContasList from './components/ContasList.jsx'
import Relatorios from './components/Relatorios.jsx'
import { supabase } from './supabaseClient'

function App() {
  const [contas, setContas] = useState([])

  useEffect(() => {
    fetchContas()
  }, [])

  const fetchContas = async () => {
    const { data, error } = await supabase
      .from('contas')
      .select('*')
      .order('data', { ascending: true })
    
    if (error) {
      console.error('Error fetching contas:', error)
    } else {
      console.log('Contas carregadas:', data) // Adicionado log
      setContas(data)
    }
  }

  const handleAddConta = async (novaConta) => {
    const { data, error } = await supabase
      .from('contas')
      .insert([novaConta])
      .select()
    
    if (error) {
      console.error('Error adding conta:', error)
    } else {
      console.log('Nova conta adicionada:', data[0]) // Adicionado log
      setContas([...contas, data[0]])
    }
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
