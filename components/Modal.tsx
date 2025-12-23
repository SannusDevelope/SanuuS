"use client"
import React from 'react'

type Props = {
  title?: string
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<Props> = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-6 z-10">
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        <div>{children}</div>
        <div className="mt-4 text-right">
          <button className="px-3 py-1 text-sm bg-slate-100 rounded hover:bg-slate-200 transition-colors" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
