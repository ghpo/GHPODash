import React, { useState, useEffect } from 'react'
import ContasForm from '../components/ContasForm.jsx'
import ContasList from '../components/ContasList.jsx'
import Relatorios from '../components/Relatorios.jsx'
import { supabase } from '../supabaseClient'

export default function ContasPage() {
  const [contas, setContas] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredContas, setFilteredContas] = useState([])

  useEffect(() => {
    fetchContas()
  }, [])

  useEffect(() => {
    filterContas()
  }, [searchTerm, contas])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const fetchContas = async () => {
    const { data, error } = await supabase
      .from('contas')
      .select('*')
      .order('data', { ascending: true })
    
    if (error) {
      console.error('Error fetching contas:', error)
    } else {
      setContas(data)
      setFilteredContas(data)
    }
  }

  const filterContas = () => {
    const filtered = contas.filter(conta => {
      const formattedDate = formatDate(conta.data)
      return (
        conta.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conta.valor.toString().includes(searchTerm) ||
        conta.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formattedDate.includes(searchTerm)
      )
    })
    setFilteredContas(filtered)
  }

  const handleAddConta = async (novaConta) => {
    const { data, error } = await supabase
      .from('contas')
      .insert([novaConta])
      .select()
    
    if (error) {
      console.error('Error adding conta:', error)
    } else {
      setContas([...contas, data[0]])
      setFilteredContas([...filteredContas, data[0]])
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <ContasForm onAddConta={handleAddConta} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <Relatorios contas={filteredContas} />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por descrição, valor, tipo ou data (dd/mm/yyyy)..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
        <ContasList contas={filteredContas} />
      </div>
    </div>
  )
}
