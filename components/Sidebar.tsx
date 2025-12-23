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
  const [contactOpen, setContactOpen] = useState<boolean>(false)

  function go(path: string) {
    router.push(path)
  }

  const active = (p: string) => pathname === p || pathname.startsWith(p + '/')

  return (
    <aside className="flex min-h-screen">
      {/* Narrow icon rail */}
      <div className="w-16 bg-slate-900 text-slate-100 flex flex-col items-center py-6 rounded-tr-md rounded-br-md">
        {/* Logo (static) */}
        <div className="mb-2 w-16 h-16 rounded-md flex items-center justify-center overflow-hidden">
          <Image src="/sannus-logo.png" alt="Sannus" width={48} height={48} quality={100} className="object-contain" />
        </div>

        {/* CRM toggle button (icon-only) */}
          <button
            aria-label="Toggle CRM sections"
            aria-expanded={openGroup === 'crm'}
            aria-pressed={openGroup === 'crm'}
            onClick={() => setOpenGroup(openGroup === 'crm' ? null : 'crm')}
            className={`mb-4 w-9 h-9 rounded-md flex items-center justify-center transition-transform duration-150 ${openGroup === 'crm' ? 'bg-white/20 ring-2 ring-white/30 shadow-sm scale-105' : 'hover:bg-slate-800'}`}
            title="CRM"
          >
            <FiUsers className={`${openGroup === 'crm' ? 'text-white' : 'text-white/90'}`} />
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

          <div>
            <button
              onClick={() => setCampaignOpen(prev => !prev)}
              className={`w-full text-left flex items-center justify-between gap-3 rounded-md px-3 py-2 transition-colors ${campaignOpen ? 'bg-slate-700 text-white' : 'hover:bg-slate-700'}`}>
              <div className="flex items-center gap-3">
                <MdCampaign />
                <span>Campanha</span>
              </div>
              <FiChevronRight className={`${campaignOpen ? 'rotate-90' : ''} transition-transform`} />
            </button>

            {campaignOpen && (
              <div className="mt-2 ml-4 flex flex-col gap-1">
                <button onClick={() => go('/dashboard')} className={`text-sm text-left px-2 py-1 rounded ${active('/dashboard') ? 'bg-slate-700' : 'hover:bg-slate-700'}`}>
                  Dashboard
                </button>

                <button onClick={() => go('/disparo')} className={`text-sm text-left px-2 py-1 rounded ${active('/disparo') ? 'bg-slate-700' : 'hover:bg-slate-700'}`}>
                  Disparo
                </button>

                <button onClick={() => go('/campanhas')} className={`text-sm text-left px-2 py-1 rounded ${active('/campanhas') ? 'bg-slate-700' : 'hover:bg-slate-700'}`}>
                  Lista de Campanhas
                </button>

                <button onClick={() => go('/templates')} className={`text-sm text-left px-2 py-1 rounded ${active('/templates') ? 'bg-slate-700' : 'hover:bg-slate-700'}`}>
                  Templates
                </button>
              </div>
            )}

            <div className="mt-3">
              <button
                onClick={() => setContactOpen(prev => !prev)}
                className={`w-full text-left flex items-center justify-between gap-3 rounded-md px-3 py-2 transition-colors ${contactOpen ? 'bg-slate-700 text-white' : 'hover:bg-slate-700'}`}>
                <div className="flex items-center gap-3">
                  <FiUsers />
                  <span>Contato</span>
                </div>
                <FiChevronRight className={`${contactOpen ? 'rotate-90' : ''} transition-transform`} />
              </button>

              {contactOpen && (
                <div className="mt-2 ml-4 flex flex-col gap-1">
                  <button onClick={() => go('/contatos')} className={`text-sm text-left px-2 py-1 rounded ${active('/contatos') ? 'bg-slate-700' : 'hover:bg-slate-700'}`}>
                    Lista de Contatos
                  </button>

                  <button onClick={() => go('/contatos/importar')} className={`text-sm text-left px-2 py-1 rounded ${active('/contatos/importar') ? 'bg-slate-700' : 'hover:bg-slate-700'}`}>
                    Importar
                  </button>

                  <button onClick={() => go('/contatos/exportar')} className={`text-sm text-left px-2 py-1 rounded ${active('/contatos/exportar') ? 'bg-slate-700' : 'hover:bg-slate-700'}`}>
                    Exportar
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 text-xs text-slate-500">Versão CRM • Módulo Mensagens</div>
        </div>
      )}
    </aside>
  )
}
