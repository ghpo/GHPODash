import React from 'react'

export default function Relatorios({ contas }) {
  console.log('Contas recebidas:', contas)

  // Verifica se há contas
  if (!contas || contas.length === 0) {
    console.log('Nenhuma conta encontrada')
    return (
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Total a Pagar</h3>
          <p className="text-2xl font-bold text-red-600">R$ 0.00</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Total a Receber</h3>
          <p className="text-2xl font-bold text-green-600">R$ 0.00</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Saldo</h3>
          <p className="text-2xl font-bold text-green-600">R$ 0.00</p>
        </div>
      </div>
    )
  }

  // Convert values to numbers and ensure they're valid
  const totalAPagar = contas
    .filter(conta => {
      console.log('Conta a pagar:', conta)
      return conta.tipo === 'A Pagar'
    })
    .reduce((sum, conta) => {
      const valor = Number(conta.valor || 0)
      console.log('Valor a pagar:', valor)
      return sum + valor
    }, 0)

  const totalAReceber = contas
    .filter(conta => {
      console.log('Conta a receber:', conta)
      return conta.tipo === 'A Receber'
    })
    .reduce((sum, conta) => {
      const valor = Number(conta.valor || 0)
      console.log('Valor a receber:', valor)
      return sum + valor
    }, 0)

  const saldo = totalAReceber - totalAPagar

  console.log('Totais calculados:', {
    totalAPagar,
    totalAReceber,
    saldo
  })

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Total a Pagar</h3>
        <p className="text-2xl font-bold text-red-600">R$ {totalAPagar.toFixed(2)}</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Total a Receber</h3>
        <p className="text-2xl font-bold text-green-600">R$ {totalAReceber.toFixed(2)}</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Saldo</h3>
        <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          R$ {saldo.toFixed(2)}
        </p>
      </div>
    </div>
  )
}
