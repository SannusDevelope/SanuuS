"use client"
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const labels = (() => {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  const today = new Date()
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (6 - i))
    return days[d.getDay()]
  })
})()

const data = {
  labels,
  datasets: [
    {
      label: 'Enviadas',
      data: [120, 200, 150, 180, 220, 170, 240],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16,185,129,0.12)',
      tension: 0.35,
      fill: true,
      pointRadius: 3,
    },
    {
      label: 'Entregue',
      data: [100, 180, 130, 160, 200, 150, 210],
      borderColor: '#94a3b8',
      backgroundColor: 'rgba(148,163,184,0.06)',
      tension: 0.35,
      fill: true,
      pointRadius: 2,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' as const, labels: { color: '#475569' } },
    title: { display: false },
    tooltip: { mode: 'index' as const, intersect: false },
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
    y: { grid: { color: 'rgba(15,23,42,0.04)' }, ticks: { color: '#94a3b8' }, beginAtZero: true },
  },
}

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
        <Line data={data} options={options} />
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
