"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { FiChevronRight, FiGrid, FiHome, FiSend, FiUsers } from 'react-icons/fi'
import { MdCampaign } from 'react-icons/md'
import { useRouter, usePathname } from 'next/navigation'

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname() || '/'
  const [openGroup, setOpenGroup] = useState<'crm' | null>('crm')
  const [campaignOpen, setCampaignOpen] = useState<boolean>(true)

  function go(path: string) {
    router.push(path)
  }

  const active = (p: string) => pathname === p || pathname.startsWith(p + '/')

  return (
    <aside className="flex min-h-screen">
      {/* Narrow icon rail */}
      <div className="w-16 bg-slate-900 text-slate-100 flex flex-col items-center py-6 rounded-tr-md rounded-br-md">
        {/* Logo (static) */}
        <div className="mb-2 w-12 h-12 rounded-md flex items-center justify-center">
          <Image src="/sannus-logo.png" alt="Sannus" width={36} height={36} className="object-contain" />
        </div>

        {/* CRM toggle button (icon-only) */}
        <button
          aria-label="Toggle CRM sections"
          aria-expanded={openGroup === 'crm'}
          onClick={() => setOpenGroup(openGroup === 'crm' ? null : 'crm')}
          className="mb-4 w-9 h-9 rounded-md flex items-center justify-center hover:bg-slate-800"
          title="CRM"
        >
          <FiUsers />
        </button>

        <div className="flex-1" />

        <div className="mt-6 text-slate-400 text-xs text-center px-1">CRM</div>
      </div>

      {/* Expanded panel (toggleable) */}
      {openGroup === 'crm' && (
        <div className="w-64 bg-slate-800 text-slate-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-slate-700 rounded flex items-center justify-center">
                <FiGrid />
              </div>
              <div>
                <div className="text-sm font-semibold">CRM</div>
                <div className="text-xs text-slate-400">Campanhas</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs uppercase text-slate-400 font-medium">Seções</div>

            <div className="space-y-1">
              <button onClick={() => go('/dashboard')} className={`w-full text-left flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${active('/dashboard') ? 'bg-slate-700 text-white' : 'hover:bg-slate-700'}`}>
                <FiHome />
                <span>Dashboard</span>
              </button>

              <button onClick={() => go('/disparo')} className={`w-full text-left flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${active('/disparo') ? 'bg-slate-700 text-white' : 'hover:bg-slate-700'}`}>
                <FiSend />
                <span>Disparo</span>
              </button>

              <div>
                <div className="flex items-center justify-between px-3 py-2 rounded-md bg-transparent hover:bg-slate-700 cursor-pointer" onClick={() => setCampaignOpen(prev => !prev)}>
                  <div className="flex items-center gap-3">
                    <MdCampaign />
                    <span>Campanhas</span>
                  </div>
                  <FiChevronRight className={`${campaignOpen ? 'rotate-90' : ''} transition-transform`} />
                </div>
                {campaignOpen && (
                  <div className="mt-1 ml-8 flex flex-col gap-1">
                    <button onClick={() => go('/campanhas')} className={`text-sm text-left px-2 py-1 rounded ${active('/campanhas') ? 'bg-slate-700' : 'hover:bg-slate-700'}`}>
                      Lista de Campanhas
                    </button>
                    <button onClick={() => go('/templates')} className={`text-sm text-left px-2 py-1 rounded ${active('/templates') ? 'bg-slate-700' : 'hover:bg-slate-700'}`}>
                      Templates
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 text-xs text-slate-500">Versão CRM • Módulo Mensagens</div>
        </div>
      )}
    </aside>
  )
}
