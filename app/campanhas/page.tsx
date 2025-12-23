"use client"
import React, { useState } from 'react'
import Modal from '../../components/Modal'
import { FiPlus, FiSearch, FiMoreVertical } from 'react-icons/fi'

type Campaign = {
  id: string
  name: string
  channel: string
  status: string
  recipients: number
  sent?: number
  delivery?: string
  openRate?: string
}

const sample: Campaign[] = [
  { id: '1', name: 'Promoção de Natal', channel: 'WhatsApp', status: 'Ativa', recipients: 5420, sent: 5420, delivery: '99%', openRate: '79%' },
  { id: '2', name: 'Newsletter Dezembro', channel: 'E-mail', status: 'Concluída', recipients: 12300, sent: 12300, delivery: '99%', openRate: '70%' },
  { id: '3', name: 'Boas Festas', channel: 'SMS', status: 'Agendada', recipients: 3200 }
]

const Campanhas: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(sample)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')

  // form state for new campaign
  const [name, setName] = useState('')
  const [channel, setChannel] = useState<'WhatsApp' | 'SMS' | 'E-mail'>('WhatsApp')
  const [message, setMessage] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  function createCampaign(e: React.FormEvent) {
    e.preventDefault()
    const c: Campaign = {
      id: String(Date.now()),
      name: name || 'Nova Campanha',
      channel,
      status: start || end ? 'Agendada' : 'Rascunho',
      recipients: 0
    }
    setCampaigns(prev => [c, ...prev])
    setOpen(false)
    // reset
    setName('')
    setMessage('')
    setStart('')
    setEnd('')
  }

  const filtered = campaigns.filter(c => (statusFilter === 'Todos' || c.status === statusFilter) && (c.name.toLowerCase().includes(query.toLowerCase())))

  return (
    <div className="p-8">
      <header className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Campanha</h2>
          <p className="text-sm text-slate-500">Gerencie suas campanhas de mensagens</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 rounded-md px-3 py-2 w-80 bg-white">
              <FiSearch className="text-slate-400" />
              <input placeholder="Buscar campanhas..." value={query} onChange={e => setQuery(e.target.value)} className="outline-none text-sm bg-transparent w-full" />
            </div>

            <div className="bg-slate-50 rounded-md px-3 py-2 bg-white">
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="text-sm outline-none bg-transparent">
                <option>Todos</option>
                <option>Ativa</option>
                <option>Concluída</option>
                <option>Agendada</option>
                <option>Rascunho</option>
              </select>
            </div>
          </div>

          <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-300">
            <FiPlus /> Nova Campanha
          </button>
        </div>
      </header>
      <div className="bg-white border border-slate-100 rounded-lg p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500">
                <th className="py-3">Campanha</th>
                <th className="text-center">Canal</th>
                <th className="text-center">Status</th>
                <th className="text-right">Destinatários</th>
                <th className="text-right">Entrega</th>
                <th className="text-right">Abertura</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="py-4">
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-slate-400">Criada em 01/12/2024</div>
                  </td>
                  <td className="text-center align-middle">{c.channel}</td>
                  <td className="text-center align-middle">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${c.status === 'Ativa' ? 'bg-emerald-50 text-emerald-700' : c.status === 'Concluída' ? 'bg-indigo-50 text-indigo-700' : c.status === 'Agendada' ? 'bg-amber-50 text-amber-700' : 'bg-slate-50 text-slate-600'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="text-right align-middle text-slate-700">{c.recipients.toLocaleString()}</td>
                  <td className="text-right align-middle">{c.delivery ? <span className="text-emerald-600 font-medium">{c.delivery}</span> : '-'}</td>
                  <td className="text-right align-middle">{c.openRate ? <span className="text-sky-600 font-medium">{c.openRate}</span> : '-'}</td>
                  <td className="text-right align-middle">
                    <button className="text-slate-400 hover:text-slate-600 p-2 rounded-full">
                      <FiMoreVertical />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      {open && (
        <Modal title="Nova Campanha" onClose={() => setOpen(false)}>
          <form onSubmit={createCampaign} className="space-y-3">
            <div>
              <label className="text-xs text-slate-600">Nome da campanha</label>
              <input required value={name} onChange={e => setName(e.target.value)} className="w-full border rounded px-2 py-1 mt-1" />
            </div>

            <div>
              <label className="text-xs text-slate-600">Canal</label>
              <select value={channel} onChange={e => setChannel(e.target.value as any)} className="w-full border rounded px-2 py-1 mt-1">
                <option>WhatsApp</option>
                <option>SMS</option>
                <option>E-mail</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600">Mensagem</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} className="w-full border rounded px-2 py-1 mt-1 h-28" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input type="date" value={start} onChange={e => setStart(e.target.value)} className="border rounded px-2 py-1" />
              <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="border rounded px-2 py-1" />
            </div>

            <div className="text-right">
              <button type="submit" className="bg-emerald-500 text-white px-4 py-1 rounded">Criar campanha</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default Campanhas
