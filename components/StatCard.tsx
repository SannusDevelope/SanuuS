"use client"
import React from 'react'

type Props = {
  title: string
  value: string
  hint?: string
  color?: string
}

const StatCard: React.FC<Props> = ({ title, value, hint, color = 'bg-white' }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="text-xs text-slate-500">{title}</div>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-2xl font-semibold text-slate-800">{value}</div>
        {hint ? <div className="text-sm text-slate-400">{hint}</div> : null}
      </div>
    </div>
  )
}

export default StatCard
