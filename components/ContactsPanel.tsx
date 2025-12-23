"use client"
import React from 'react'

type Contact = {
  name: string
  phone: string
}

type Props = {
  contacts: Contact[]
  onAdd?: () => void
  onContactClick?: (c: Contact) => void
}

const ContactsPanel: React.FC<Props> = ({ contacts, onAdd, onContactClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-slate-800 font-semibold">Contatos</h4>
        <button className="bg-emerald-500 text-white text-sm px-3 py-1 rounded hover:bg-emerald-600 transition-colors" onClick={() => (onAdd ? onAdd() : alert('Adicionar'))}>Adicionar</button>
      </div>

      <div className="space-y-3">
        {contacts.map((c, i) => (
          <div key={i} className="flex items-center justify-between hover:bg-slate-50 rounded p-2 transition-colors">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onContactClick && onContactClick(c)}>
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">{c.name.split(' ')[0][0]}</div>
              <div>
                <div className="text-sm text-slate-800">{c.name}</div>
                <div className="text-xs text-slate-400">{c.phone}</div>
              </div>
            </div>
            <div className="text-xs text-slate-400">há 2 horas</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContactsPanel
