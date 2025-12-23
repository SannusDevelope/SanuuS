"use client"
import React from 'react'

type Message = {
  name: string
  phone: string
  msg: string
  status: string
}

type Props = {
  messages?: Message[]
  onViewAll?: () => void
}

const RecentMessages: React.FC<Props> = ({ messages = [], onViewAll }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-slate-800 font-semibold">Mensagens Recentes</h4>
        <button className="text-xs text-slate-500 hover:text-slate-700 hover:underline transition-colors" onClick={() => (onViewAll ? onViewAll() : alert('Ver todas'))}>Ver todas</button>
      </div>

      <ul className="space-y-3">
        {messages.map((it, idx) => (
          <li key={idx} className="flex items-start gap-3 hover:bg-slate-50 rounded p-2 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">{it.name.split(' ')[0][0]}</div>
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-800">{it.name}</div>
              <div className="text-xs text-slate-500">{it.phone}</div>
              <div className="text-sm text-slate-600 mt-1 truncate">{it.msg}</div>
            </div>
            <div className="text-xs text-slate-400">{it.status}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentMessages
