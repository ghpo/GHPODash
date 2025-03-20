import React from 'react'
import { Link } from 'react-router-dom'

export default function CaixaMenu() {
  return (
    <div className="flex gap-4">
      <Link
        to="/caixa/contas"
        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
      >
        Contas
      </Link>
    </div>
  )
}
