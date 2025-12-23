"use client"
import React, { useState } from 'react'
import StatCard from '../../components/StatCard'
import ChartCard from '../../components/ChartCard'
import RecentMessages from '../../components/RecentMessages'
import ContactsPanel from '../../components/ContactsPanel'
import Modal from '../../components/Modal'
import { FiArrowRightCircle, FiPlusSquare, FiLayout } from 'react-icons/fi'

type Message = { name: string; phone: string; msg: string; status: string }
type Contact = { name: string; phone: string }

const initialMessages: Message[] = [
  { name: 'Maria Santos', phone: '+55 11 99999-1234', msg: 'Ok! Seu pedido #1234 foi enviado e chegara em...', status: 'Entregue' },
  { name: 'Carlos Oliveira', phone: '+55 11 98888-5678', msg: 'Lembrete: Sua fatura vence amanhã. Evite juros!', status: 'Enviado' },
  { name: 'Ana Costa', phone: '+55 21 97777-9012', msg: 'Promoção exclusiva! 20% de desconto em toda a lo...', status: 'Enviado' }
]

const initialContacts: Contact[] = [
  { name: 'Maria Santos', phone: '+55 11 99999-1234' },
  { name: 'Carlos Oliveira', phone: '+55 11 98888-5678' },
  { name: 'Ana Costa', phone: '+55 21 97777-9012' },
  { name: 'Pedro Lima', phone: '+55 31 96666-3456' }
]

const Dashboard: React.FC = () => {
  const [modal, setModal] = useState<string | null>(null)
  const [messages] = useState<Message[]>(initialMessages)
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)

  function openModal(name: string) {
    setModal(name)
  }
  function closeModal() {
    setModal(null)
  }

  function handleQuickSend(e: React.FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const data = new FormData(form)
    console.log('Quick send', { to: data.get('to'), message: data.get('message') })
    alert('Mensagem enviada (simulada)')
    closeModal()
  }

  function handleAddContact(e: React.FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const data = new FormData(form)
    const name = (data.get('name') || '').toString()
    const phone = (data.get('phone') || '').toString()
    if (name && phone) {
      setContacts(prev => [...prev, { name, phone }])
      closeModal()
    }
  }

  function handleContactClick(c: Contact) {
    alert(`Contato: ${c.name}\n${c.phone}`)
  }

  return (
    <main className="p-8">
      <header className="mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="text-sm text-slate-500">Visão geral do módulo de mensagens WhatsApp</p>
      </header>

      <section className="grid grid-cols-4 gap-4 mb-6">
        <StatCard title="Mensagens Enviadas" value="24.5K" hint="+12% semana" />
        <StatCard title="Taxa de Entrega" value="98.2%" hint="+1% semana" />
        <StatCard title="Contatos Ativos" value="8.432" hint="+3%" />
        <StatCard title="Campanhas Ativas" value="6" hint="2 agendadas" />
      </section>

      <section className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <ChartCard />
          <RecentMessages messages={messages} onViewAll={() => openModal('messages')} />
        </div>

        <aside className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h4 className="text-slate-800 font-semibold mb-3">Ações Rápidas</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 border border-slate-100 rounded px-3 py-2 text-slate-700 hover:bg-slate-100 transition-colors" onClick={() => openModal('quick')}>
                <FiArrowRightCircle /> Disparo Rápido
              </button>
              <button className="w-full flex items-center gap-3 border border-slate-100 rounded px-3 py-2 text-slate-700 hover:bg-slate-100 transition-colors" onClick={() => openModal('campaign')}>
                <FiPlusSquare /> Nova Campanha
              </button>
              <button className="w-full flex items-center gap-3 border border-slate-100 rounded px-3 py-2 text-slate-700 hover:bg-slate-100 transition-colors" onClick={() => openModal('templates')}>
                <FiLayout /> Templates
              </button>
            </div>
          </div>

          <ContactsPanel contacts={contacts} onAdd={() => openModal('addContact')} onContactClick={handleContactClick} />
        </aside>
      </section>

      {modal === 'quick' && (
        <Modal title="Disparo Rápido" onClose={closeModal}>
          <form onSubmit={handleQuickSend} className="space-y-3">
            <div>
              <label className="text-xs text-slate-600">Para</label>
              <input name="to" className="w-full border rounded px-2 py-1 mt-1" placeholder="+55 11 9...." />
            </div>
            <div>
              <label className="text-xs text-slate-600">Mensagem</label>
              <textarea name="message" className="w-full border rounded px-2 py-1 mt-1" rows={4} />
            </div>
            <div className="text-right">
              <button type="submit" className="bg-emerald-500 text-white px-4 py-1 rounded hover:bg-emerald-600 transition-colors">Enviar</button>
            </div>
          </form>
        </Modal>
      )}

      {modal === 'campaign' && (
        <Modal title="Nova Campanha" onClose={closeModal}>
          <p className="text-sm text-slate-600">Formulário de criação de campanha (simulado)</p>
          <div className="mt-4">
            <button className="bg-emerald-500 text-white px-4 py-1 rounded hover:bg-emerald-600 transition-colors" onClick={() => { alert('Campanha criada (simulado)'); closeModal() }}>Criar</button>
          </div>
        </Modal>
      )}

      {modal === 'templates' && (
        <Modal title="Templates" onClose={closeModal}>
          <ul className="space-y-2">
            <li className="p-2 border rounded">Confirmação de agendamento</li>
            <li className="p-2 border rounded">Lembrete de pagamento</li>
            <li className="p-2 border rounded">Promoção</li>
          </ul>
        </Modal>
      )}

      {modal === 'addContact' && (
        <Modal title="Adicionar Contato" onClose={closeModal}>
          <form onSubmit={handleAddContact} className="space-y-3">
            <div>
              <label className="text-xs text-slate-600">Nome</label>
              <input name="name" required className="w-full border rounded px-2 py-1 mt-1" />
            </div>
            <div>
              <label className="text-xs text-slate-600">Telefone</label>
              <input name="phone" required className="w-full border rounded px-2 py-1 mt-1" />
            </div>
            <div className="text-right">
              <button type="submit" className="bg-emerald-500 text-white px-4 py-1 rounded">Adicionar</button>
            </div>
          </form>
        </Modal>
      )}

      {modal === 'messages' && (
        <Modal title="Todas as Mensagens" onClose={closeModal}>
          <ul className="space-y-3">
            {messages.map((m, i) => (
              <li key={i} className="p-3 border rounded">
                <div className="font-medium">{m.name}</div>
                <div className="text-xs text-slate-500">{m.phone} • {m.status}</div>
                <div className="mt-1 text-sm">{m.msg}</div>
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </main>
  )
}

export default Dashboard
