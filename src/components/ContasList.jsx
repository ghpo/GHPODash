import React, { useState } from 'react'
import { jsPDF } from 'jspdf'

export default function ContasList({ contas }) {
  const [dataInicial, setDataInicial] = useState('')
  const [dataFinal, setDataFinal] = useState('')

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const handleLimparFiltros = () => {
    setDataInicial('')
    setDataFinal('')
  }

  const filteredContas = contas.filter(conta => {
    const contaDate = new Date(conta.data)
    const startDate = dataInicial ? new Date(dataInicial) : null
    const endDate = dataFinal ? new Date(dataFinal) : null

    if (startDate && endDate) {
      return contaDate >= startDate && contaDate <= endDate
    } else if (startDate) {
      return contaDate >= startDate
    } else if (endDate) {
      return contaDate <= endDate
    }
    return true
  })

  const handleExportPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })
      
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(18)
      doc.text('Relatório de Contas', 20, 20)
      
      let yPosition = 40
      doc.setFontSize(12)
      
      // Cabeçalho da tabela
      doc.text('Descrição', 20, yPosition)
      doc.text('Valor', 80, yPosition)
      doc.text('Tipo', 120, yPosition)
      doc.text('Data', 160, yPosition)
      yPosition += 10
      
      // Linhas da tabela
      filteredContas.forEach(conta => {
        doc.text(conta.descricao, 20, yPosition)
        doc.text(`R$ ${conta.valor.toFixed(2)}`, 80, yPosition)
        doc.text(conta.tipo, 120, yPosition)
        doc.text(formatDate(conta.data), 160, yPosition)
        yPosition += 10
        
        // Quebra de página se necessário
        if (yPosition > 280) {
          doc.addPage()
          yPosition = 20
        }
      })
      
      doc.save('relatorio_contas.pdf')
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      alert('Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.')
    }
  }

  return (
    <div>
      <div className="flex gap-4 mb-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Data Inicial</label>
          <input
            type="date"
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Data Final</label>
          <input
            type="date"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleLimparFiltros}
            className="h-[42px] px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors"
          >
            Limpar
          </button>
          <button
            onClick={handleExportPDF}
            className="h-[42px] px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
          >
            Exportar PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Descrição</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Valor</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tipo</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Data</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredContas.map(conta => (
              <tr key={conta.id}>
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100">{conta.descricao}</td>
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100">R$ {conta.valor.toFixed(2)}</td>
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100">{conta.tipo}</td>
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100">{formatDate(conta.data)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
