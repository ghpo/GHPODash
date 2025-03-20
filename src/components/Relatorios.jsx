import React from 'react'

export default function Relatorios({ contas }) {
  const totalPagar = contas
    .filter(conta => conta.tipo === 'A Pagar')
    .reduce((sum, conta) => sum + parseFloat(conta.valor), 0)

  const totalReceber = contas
    .filter(conta => conta.tipo === 'A Receber')
    .reduce((sum, conta) => sum + parseFloat(conta.valor), 0)

  const saldo = totalReceber - totalPagar

  return (
    <div className="space-y-4">
      <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Total a Pagar</h3>
        <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
          R$ {totalPagar.toFixed(2)}
        </p>
      </div>
      
      <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Total a Receber</h3>
        <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
          R$ {totalReceber.toFixed(2)}
        </p>
      </div>

      <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Saldo</h3>
        <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          R$ {saldo.toFixed(2)}
        </p>
      </div>
    </div>
  )
}
