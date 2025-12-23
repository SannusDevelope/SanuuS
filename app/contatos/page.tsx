"use client"
import React, { useState, useEffect, useRef } from 'react'
import Modal from '../../components/Modal'
import { FiSearch, FiMoreVertical, FiEdit2, FiTrash2, FiUser } from 'react-icons/fi'

type Contact = {
  id: string
  name: string
  company?: string
  responsible?: string
  messenger?: string
  created?: string
  modified?: string
}

const sample: Contact[] = [
  { id: '1', name: 'Marcos Souza', company: 'Acme Ltda', responsible: 'Ana Laura Lima', messenger: 'WhatsApp', created: 'hoje', modified: 'hoje' },
  { id: '2', name: 'Pedro Castro', company: 'Beta SA', responsible: 'Ana Laura Lima', messenger: 'Messenger', created: '12/07/2025', modified: '12/07/2025' },
  { id: '3', name: 'Marcos Martins', company: 'Gamma LTDA', responsible: 'Sebastião Reis', messenger: 'WhatsApp', created: '10/07/2025', modified: '10/07/2025' }
]

export default function ContatosPage() {
  const [contacts, setContacts] = useState<Contact[]>(sample)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [editing, setEditing] = useState<Contact | null>(null)
  const [openNew, setOpenNew] = useState(false)

  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!menuOpenId) return
      const el = menuRefs.current[menuOpenId]
      if (el && !el.contains(e.target as Node)) setMenuOpenId(null)
    }
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setMenuOpenId(null) }
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpenId])

  const filtered = contacts.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || (c.company || '').toLowerCase().includes(query.toLowerCase()))

  function toggleSelectAll() {
    const all = filtered.every(c => selected[c.id])
    const next: Record<string, boolean> = { ...selected }
    filtered.forEach(c => { next[c.id] = !all })
    setSelected(next)
  }

  function toggleSelect(id: string) {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }))
  }

  function deleteContact(id: string) {
    if (!confirm('Excluir contato?')) return
    setContacts(prev => prev.filter(p => p.id !== id))
    setMenuOpenId(null)
    setSelected(prev => { const n = { ...prev }; delete n[id]; return n })
  }

  function openEdit(c: Contact) {
    setEditing(c)
    setEditOpen(true)
    setMenuOpenId(null)
  }

  function saveEdit(e: React.FormEvent) {
    e.preventDefault()
    if (!editing) return
    setContacts(prev => prev.map(p => p.id === editing.id ? editing : p))
    setEditOpen(false)
    setEditing(null)
  }

  function createContact(e: React.FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const company = (form.elements.namedItem('company') as HTMLInputElement).value
    const c: Contact = { id: String(Date.now()), name, company }
    setContacts(prev => [c, ...prev])
    setOpenNew(false)
  }

  return (
    <div className="p-8">
      <header className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Contatos</h2>
          <p className="text-sm text-slate-500">Gerencie sua lista de contatos</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white border border-slate-100 rounded-full shadow-sm px-3 py-2 w-96 transition focus-within:ring-2 focus-within:ring-emerald-200">
            <FiSearch className="text-slate-400 mr-2" />
            <input placeholder="Buscar contatos..." value={query} onChange={e => setQuery(e.target.value)} className="outline-none text-sm bg-transparent w-full placeholder:text-slate-400" />
          </div>

          <button onClick={() => setOpenNew(true)} className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-lg shadow-md">Novo Contato</button>
        </div>
      </header>

      <div className="bg-white border border-slate-100 rounded-lg p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-500">
              <th className="py-3"><input type="checkbox" onChange={toggleSelectAll} checked={filtered.length>0 && filtered.every(c=>selected[c.id])} /></th>
              <th>Contato</th>
              <th className="text-center">Empresa</th>
              <th className="text-center">Responsável</th>
              <th className="text-center">Messenger</th>
              <th className="text-right">Criado</th>
              <th className="text-right">Modificado</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="py-4 align-middle"><input type="checkbox" checked={!!selected[c.id]} onChange={() => toggleSelect(c.id)} /></td>
                <td className="py-4 align-middle">
                  <div className="font-medium">{c.name}</div>
                </td>
                <td className="text-center align-middle">{c.company || '-'}</td>
                <td className="text-center align-middle">{c.responsible || '-'}</td>
                <td className="text-center align-middle">{c.messenger || '-'}</td>
                <td className="text-right align-middle">{c.created || '-'}</td>
                <td className="text-right align-middle">{c.modified || '-'}</td>
                <td className="text-right align-middle relative">
                  <button onClick={() => setMenuOpenId(menuOpenId===c.id?null:c.id)} className="text-slate-400 hover:text-slate-600 p-2 rounded-full"><FiMoreVertical /></button>

                  {menuOpenId===c.id && (
                    <div ref={el => (menuRefs.current[c.id]=el)} className="absolute right-0 mt-2 w-40 z-50">
                      <div className="bg-white rounded-lg shadow-lg ring-1 ring-slate-200 overflow-hidden">
                        <div className="py-1">
                          <button onClick={() => openEdit(c)} className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-sm text-slate-700"><FiEdit2 className="text-slate-500" /> <span>Editar</span></button>
                          <button onClick={() => deleteContact(c.id)} className="w-full text-left px-4 py-2 hover:bg-rose-50 flex items-center gap-3 text-sm text-rose-600"><FiTrash2 className="text-rose-600" /> <span>Excluir</span></button>
                        </div>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openNew && (
        <Modal title="Novo Contato" onClose={() => setOpenNew(false)}>
          <form onSubmit={createContact} className="space-y-3">
            <div>
              <label className="text-xs text-slate-600">Nome</label>
              <input name="name" required className="w-full border rounded px-2 py-1 mt-1" />
            </div>
            <div>
              <label className="text-xs text-slate-600">Empresa</label>
              <input name="company" className="w-full border rounded px-2 py-1 mt-1" />
            </div>
            <div className="text-right">
              <button type="submit" className="bg-emerald-500 text-white px-4 py-1 rounded">Criar</button>
            </div>
          </form>
        </Modal>
      )}

      {editOpen && editing && (
        <Modal title="Editar Contato" onClose={() => { setEditOpen(false); setEditing(null) }}>
          <form onSubmit={saveEdit} className="space-y-3">
            <div>
              <label className="text-xs text-slate-600">Nome</label>
              <input required value={editing.name} onChange={e => setEditing(prev => prev ? { ...prev, name: e.target.value } : prev)} className="w-full border rounded px-2 py-1 mt-1" />
            </div>
            <div>
              <label className="text-xs text-slate-600">Empresa</label>
              <input value={editing.company} onChange={e => setEditing(prev => prev ? { ...prev, company: e.target.value } : prev)} className="w-full border rounded px-2 py-1 mt-1" />
            </div>
            <div className="text-right">
              <button type="submit" className="bg-emerald-500 text-white px-4 py-1 rounded">Salvar</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
