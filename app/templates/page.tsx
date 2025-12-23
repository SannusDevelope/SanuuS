"use client"
import React, { useState } from 'react'
import Modal from '../../components/Modal'
import { FiPlus, FiEdit, FiTrash2, FiFileText, FiEye, FiCopy } from 'react-icons/fi'

type Template = {
  id: string
  name: string
  channel: string
  body: string
  uses: number
}

const sample: Template[] = [
  { id: '1', name: 'Boas-vindas', channel: 'WhatsApp', body: 'Olá {{nome}}! Seja muito bem-vindo(a) à {{empresa}}.', uses: 1250 },
  { id: '2', name: 'Promoção Especial', channel: 'WhatsApp', body: 'Olá {{nome}}, temos uma promoção exclusiva para você!', uses: 860 },
  { id: '3', name: 'Lembrete de Reunião', channel: 'SMS', body: 'Lembrete: sua reunião está agendada para {{data}} às {{hora}}.', uses: 450 },
  { id: '4', name: 'Newsletter Mensal', channel: 'E-mail', body: 'Olá {{nome}}, confira as novidades deste mês.', uses: 3200 }
]

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>(sample)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  // form
  const [name, setName] = useState('')
  const [channel, setChannel] = useState<'WhatsApp' | 'SMS' | 'E-mail'>('WhatsApp')
  const [body, setBody] = useState('')

  function createTemplate(e: React.FormEvent) {
    e.preventDefault()
    if (editingId) {
      setTemplates(prev => prev.map(t => t.id === editingId ? { ...t, name: name || t.name, channel, body } : t))
      setEditingId(null)
    } else {
      const t: Template = { id: String(Date.now()), name: name || 'Novo Template', channel, body, uses: 0 }
      setTemplates(prev => [t, ...prev])
    }
    setOpen(false)
    setName('')
    setBody('')
  }

  function handleEdit(t: Template) {
    setEditingId(t.id)
    setName(t.name)
    setChannel(t.channel as any)
    setBody(t.body)
    setOpen(true)
  }

  function handleDelete(id: string) {
    if (!confirm('Excluir este template?')) return
    setTemplates(prev => prev.filter(t => t.id !== id))
  }

  function extractPlaceholders(text: string) {
    const matches = text.match(/{{\s*([^}]+)\s*}}/g) || []
    const cleaned = matches.map(m => m.replace(/{{\s*|\s*}}/g, ''))
    return Array.from(new Set(cleaned))
  }

  const [preview, setPreview] = useState<Template | null>(null)

  async function handleCopy(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      alert('Template copiado para a área de transferência')
    } catch (e) {
      alert('Não foi possível copiar')
    }
  }

  const filtered = templates.filter(t => t.name.toLowerCase().includes(query.toLowerCase()) || t.body.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="p-8">
      <header className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Templates</h2>
          <p className="text-sm text-slate-500">Gerencie seus modelos de mensagens</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="flex items-center bg-white border border-slate-100 rounded-full shadow-sm px-3 py-2 w-96 transition focus-within:ring-2 focus-within:ring-emerald-200">
              <FiFileText className="text-slate-400 mr-2" />
              <input placeholder="Buscar templates..." value={query} onChange={e => setQuery(e.target.value)} className="outline-none text-sm bg-transparent w-full placeholder:text-slate-400" />
            </div>
          </div>

          <button onClick={() => { setOpen(true); setEditingId(null); setName(''); setBody('') }} className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-300">
            <FiPlus /> Novo Template
          </button>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6">
        {filtered.map(t => (
          <div key={t.id} className="bg-white border border-slate-100 rounded-lg p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="text-slate-500 mt-1"><FiFileText /></div>
              <div className="flex-1">
                <div className="font-medium">{t.name}</div>
                <div className="text-xs text-slate-400">{t.channel}</div>
                <div className="mt-3 text-sm text-slate-700 bg-slate-50 p-3 rounded">
                  {t.body.split(/({{\s*[^}]+\s*}})/g).map((part, i) => {
                    if (/^{{\s*[^}]+\s*}}$/.test(part)) {
                      const key = part.replace(/{{\s*|\s*}}/g, '')
                      return (
                        <span key={i} className="text-sky-600 font-medium">{`{{${key}}}`}</span>
                      )
                    }
                    return <span key={i}>{part}</span>
                  })}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">{t.uses.toLocaleString()} usos</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {extractPlaceholders(t.body).map(ph => (
                        <span key={ph} className="text-sky-600 bg-sky-50 px-2 py-0.5 text-xs rounded">{ph}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <button onClick={() => setPreview(t)} title="Visualizar" className="p-1 hover:text-slate-700"><FiEye /></button>
                    <button onClick={() => handleEdit(t)} className="p-1 hover:text-slate-700" title="Editar"><FiEdit /></button>
                    <button onClick={() => handleCopy(t.body)} className="p-1 hover:text-slate-700" title="Copiar"><FiCopy /></button>
                    <button onClick={() => handleDelete(t.id)} className="p-1 text-red-500 hover:text-red-600" title="Excluir"><FiTrash2 /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <Modal title={editingId ? 'Editar Template' : 'Novo Template'} onClose={() => { setOpen(false); setEditingId(null) }}>
          <form onSubmit={createTemplate} className="space-y-3">
            <div>
              <label className="text-xs text-slate-600">Nome do template</label>
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
              <textarea value={body} onChange={e => setBody(e.target.value)} className="w-full border rounded px-2 py-1 mt-1 h-36" />
            </div>

            <div className="text-right">
              <button type="submit" className="bg-emerald-500 text-white px-4 py-1 rounded">{editingId ? 'Salvar' : 'Criar template'}</button>
            </div>
          </form>
        </Modal>
      )}
      {preview && (
        <Modal title={`Preview — ${preview.name}`} onClose={() => setPreview(null)}>
          <div>
            <div className="text-sm text-slate-500 mb-2">Canal: <strong className="text-slate-700">{preview.channel}</strong></div>
            <div className="text-sm text-slate-700 bg-slate-50 p-3 rounded">
              {preview.body.split(/({{\s*[^}]+\s*}})/g).map((part, i) => {
                if (/^{{\s*[^}]+\s*}}$/.test(part)) {
                  const key = part.replace(/{{\s*|\s*}}/g, '')
                  return <span key={i} className="text-sky-600 font-medium">{`{{${key}}}`}</span>
                }
                return <span key={i}>{part}</span>
              })}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {extractPlaceholders(preview.body).map(ph => (
                <span key={ph} className="text-sky-600 bg-sky-50 px-2 py-0.5 text-xs rounded">{ph}</span>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default Templates
