"use client"
import React from 'react'

const ChartCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-slate-800 font-semibold">Mensagens por Dia</h3>
          <p className="text-xs text-slate-400">Últimos 7 dias</p>
        </div>
      </div>

      <div className="h-44">
        <svg viewBox="0 0 600 200" className="w-full h-full">
          <defs>
            <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,120 C80,90 160,140 240,110 C320,80 400,40 480,60 C560,80 600,60 600,60 L600,200 L0,200 Z" fill="url(#g)" />
          <path d="M0,130 C80,100 160,150 240,120 C320,90 400,50 480,70 C560,90 600,70" stroke="#10b981" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      <div className="mt-4 text-sm text-slate-500 flex gap-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-400 block" />
          <span>Enviadas</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-slate-300 block" />
          <span>Entregue</span>
        </div>
      </div>
    </div>
  )
}

export default ChartCard
