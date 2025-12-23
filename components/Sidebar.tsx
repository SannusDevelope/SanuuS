"use client"
import React from 'react'
import Image from 'next/image'
import { FiChevronRight, FiHome, FiSend } from 'react-icons/fi'
import { MdCampaign } from 'react-icons/md'
import { useRouter } from 'next/navigation'

type Props = {
  active?: 'dashboard' | 'disparo' | 'campanhas' | 'templates'
}

const Sidebar: React.FC<Props> = ({ active = 'dashboard' }) => {
  const router = useRouter()
  function go(page: 'dashboard' | 'disparo' | 'campanhas' | 'templates') {
    const path = page === 'dashboard' ? '/dashboard' : `/${page}`
    router.push(path)
  }

  return (
    <aside className="w-64 min-h-screen bg-brand text-slate-100 px-4 py-8">
      <div className="mb-8 flex items-center justify-center">
        <Image src="/sannus-logo.png" alt="Sannus" width={72} height={72} className="object-contain" />
      </div>

      <nav className="space-y-2">
        <button onClick={() => go('dashboard')} className={`w-full text-left flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${active === 'dashboard' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
          <FiHome />
          <span>Dashboard</span>
        </button>
        <button onClick={() => go('disparo')} className={`w-full text-left flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${active === 'disparo' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
          <FiSend />
          <span>Disparo</span>
        </button>
        <button onClick={() => go('campanhas')} className={`w-full text-left flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${active === 'campanhas' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
          <MdCampaign className="h-4 w-4" />
          <span>Campanhas</span>
        </button>

        <button onClick={() => go('templates')} className={`w-full text-left flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${active === 'templates' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18"/></svg>
          <span>Templates</span>
        </button>
      </nav>

      <div className="mt-8 text-sm text-slate-400 flex items-center gap-2">
        <FiChevronRight />
        <span>Visão geral do módulo de mensagens WhatsApp</span>
      </div>
    </aside>
  )
}

export default Sidebar
