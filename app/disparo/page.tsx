"use client"
import React, { useEffect, useRef, useState } from 'react'
import { FiChevronRight, FiUsers, FiSend, FiCheckSquare, FiList } from 'react-icons/fi'
import { SiWhatsapp } from 'react-icons/si'
import { FiSmartphone, FiMail } from 'react-icons/fi'

const Disparo: React.FC = () => {
  const [channel, setChannel] = useState<'whatsapp' | 'sms' | 'email'>('whatsapp')
  const [recipients, setRecipients] = useState<string[]>(['+55 11 99999-1234'])
  const [template, setTemplate] = useState('')
  const [message, setMessage] = useState('')
  const [messageMode, setMessageMode] = useState<'template' | 'custom'>('template')
  const [schedule, setSchedule] = useState(false)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [mode, setMode] = useState<'contacts' | 'list'>('contacts')

  const groups = [
    { id: 'clientes', name: 'Clientes VIP', phones: ['+55 11 99999-1234', '+55 21 97777-9012'] },
    { id: 'newsletter', name: 'Newsletter - Junho', phones: ['+55 11 99999-0001', '+55 11 99999-0002'] }
  ]

  const [selectedGroup, setSelectedGroup] = useState<string | null>(groups[0].id)

  const templates = [
    { id: 'confirm', title: 'Confirmação de agendamento', content: 'Olá {{nome}}, seu agendamento foi confirmado para {{data}} às {{hora}}.' },
    { id: 'reminder', title: 'Lembrete de pagamento', content: 'Olá {{nome}}, lembramos que seu pagamento vence em {{data}}. Confira os detalhes.' }
  ]

  function toggleRecipient(phone: string) {
    setRecipients(prev => prev.includes(phone) ? prev.filter(p => p !== phone) : [...prev, phone])
  }

  function sendNow() {
    if (recipients.length === 0) {
      alert('Selecione pelo menos 1 destinatário antes de enviar')
      return
    }
    // Simulação de envio
    alert(`Enviando ${recipients.length} mensagem(ns) via ${channel} (simulado)`)
  }

  function applyGroup() {
    const g = groups.find(x => x.id === selectedGroup)
    if (g) setRecipients(g.phones)
  }

  const messageRef = useRef<HTMLTextAreaElement | null>(null)

  function insertPlaceholder(token: string) {
    const el = messageRef.current
    if (!el) {
      setMessage(prev => prev + token)
      return
    }
    const start = el.selectionStart || 0
    const end = el.selectionEnd || 0
    const before = message.slice(0, start)
    const after = message.slice(end)
    const next = before + token + after
    setMessage(next)
    // update cursor after insertion
    requestAnimationFrame(() => {
      if (messageRef.current) {
        const pos = start + token.length
        messageRef.current.selectionStart = pos
        messageRef.current.selectionEnd = pos
        messageRef.current.focus()
      }
    })
  }

  useEffect(() => {
    if (messageMode === 'template') {
      const t = templates.find(t => t.id === template)
      if (t) setMessage(t.content)
    }
    // when switching to custom we keep whatever message the user had
  }, [messageMode, template])

  return (
    <div className="p-8">
      <header className="mb-6">
        <h2 className="text-2xl font-semibold">Disparo</h2>
        <p className="text-sm text-slate-500">Envie mensagens instantâneas ou agende para depois</p>
      </header>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <section className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <h4 className="font-semibold text-slate-800">Canal de envio</h4>
            </div>

            <div className="">
              <div className="flex gap-4 justify-start">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setChannel('whatsapp')}
                  onKeyDown={(e) => e.key === 'Enter' && setChannel('whatsapp')}
                  className={`flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-lg transition cursor-pointer ${channel === 'whatsapp' ? 'border-2 border-sky-500 bg-sky-50 shadow-sm' : 'border border-slate-200 bg-white hover:bg-slate-50'}`}>
                  <div className="w-9 h-9 rounded-md flex items-center justify-center">
                    <SiWhatsapp className={`text-2xl ${channel === 'whatsapp' ? 'text-sky-600' : 'text-slate-500'}`} />
                  </div>
                  <div className={`text-sm font-medium ${channel === 'whatsapp' ? 'text-sky-600' : 'text-slate-700'}`}>WhatsApp</div>
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setChannel('sms')}
                  onKeyDown={(e) => e.key === 'Enter' && setChannel('sms')}
                  className={`flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-lg transition cursor-pointer ${channel === 'sms' ? 'border-2 border-sky-500 bg-sky-50 shadow-sm' : 'border border-slate-200 bg-white hover:bg-slate-50'}`}>
                  <div className="w-9 h-9 rounded-md flex items-center justify-center">
                    <FiSmartphone className={`text-2xl ${channel === 'sms' ? 'text-sky-600' : 'text-slate-500'}`} />
                  </div>
                  <div className={`text-sm font-medium ${channel === 'sms' ? 'text-sky-600' : 'text-slate-700'}`}>SMS</div>
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setChannel('email')}
                  onKeyDown={(e) => e.key === 'Enter' && setChannel('email')}
                  className={`flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-lg transition cursor-pointer ${channel === 'email' ? 'border-2 border-sky-500 bg-sky-50 shadow-sm' : 'border border-slate-200 bg-white hover:bg-slate-50'}`}>
                  <div className="w-9 h-9 rounded-md flex items-center justify-center">
                    <FiMail className={`text-2xl ${channel === 'email' ? 'text-sky-600' : 'text-slate-500'}`} />
                  </div>
                  <div className={`text-sm font-medium ${channel === 'email' ? 'text-sky-600' : 'text-slate-700'}`}>E-mail</div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <h4 className="font-semibold text-slate-800">Destinatários</h4>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <label className={`flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer ${mode==='contacts' ? 'bg-emerald-50 border border-emerald-100' : 'hover:bg-slate-50'}`}>
                  <input type="radio" name="mode" checked={mode==='contacts'} onChange={() => setMode('contacts')} className="hidden" />
                  <FiCheckSquare className="text-sky-500" />
                  <span>Contatos</span>
                </label>
                <label className={`flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer ${mode==='list' ? 'bg-emerald-50 border border-emerald-100' : 'hover:bg-slate-50'}`}>
                  <input type="radio" name="mode" checked={mode==='list'} onChange={() => setMode('list')} className="hidden" />
                  <FiList className="text-sky-500" />
                  <span>Lista</span>
                </label>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <select value={selectedGroup ?? ''} onChange={e => setSelectedGroup(e.target.value)} className="border rounded px-2 py-1 text-sm">
                  {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
                <button onClick={applyGroup} className="text-sm bg-emerald-500 text-white px-3 py-1 rounded-md hover:bg-emerald-600 transition flex items-center gap-2"><FiUsers /> Usar Grupo</button>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 max-h-44 overflow-y-auto">
              {mode === 'contacts' ? (
                <>
                  <label className="flex items-center gap-4 p-2 rounded-md hover:bg-white transition-colors">
                    <input className="accent-emerald-500 w-4 h-4" type="checkbox" checked={recipients.includes('+55 11 99999-0001')} onChange={() => toggleRecipient('+55 11 99999-0001')} />
                    <div>
                      <div className="text-sm font-medium text-slate-800">João Silva</div>
                      <div className="text-xs text-slate-500">+55 11 99999-0001</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-2 rounded-md hover:bg-white transition-colors">
                    <input className="accent-emerald-500 w-4 h-4" type="checkbox" checked={recipients.includes('+55 11 99999-1234')} onChange={() => toggleRecipient('+55 11 99999-1234')} />
                    <div>
                      <div className="text-sm font-medium text-slate-800">Maria Santos</div>
                      <div className="text-xs text-slate-500">+55 11 99999-1234</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-2 rounded-md hover:bg-white transition-colors">
                    <input className="accent-emerald-500 w-4 h-4" type="checkbox" checked={recipients.includes('+55 21 97777-9012')} onChange={() => toggleRecipient('+55 21 97777-9012')} />
                    <div>
                      <div className="text-sm font-medium text-slate-800">Pedro Oliveira</div>
                      <div className="text-xs text-slate-500">+55 21 97777-9012</div>
                    </div>
                  </label>
                </>
              ) : (
                <div className="space-y-2">
                  {groups.map(g => (
                    <div key={g.id} className="p-2 rounded-md border border-slate-100 bg-white flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-slate-800">{g.name}</div>
                        <div className="text-xs text-slate-500">{g.phones.length} contatos</div>
                      </div>
                      <button className="text-sm text-sky-600 hover:underline" onClick={() => { setSelectedGroup(g.id); applyGroup() }}>Usar este grupo</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <h4 className="font-semibold text-slate-800">Template da Mensagem</h4>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <label className={`flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer ${messageMode === 'template' ? 'bg-emerald-50 border border-emerald-100' : 'hover:bg-slate-50'}`}>
                <input type="radio" name="messageMode" checked={messageMode === 'template'} onChange={() => setMessageMode('template')} className="hidden" />
                <span className="text-sm">Usar template</span>
              </label>
              <label className={`flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer ${messageMode === 'custom' ? 'bg-emerald-50 border border-emerald-100' : 'hover:bg-slate-50'}`}>
                <input type="radio" name="messageMode" checked={messageMode === 'custom'} onChange={() => setMessageMode('custom')} className="hidden" />
                <span className="text-sm">Mensagem personalizada</span>
              </label>
            </div>

            {messageMode === 'template' ? (
              <select value={template} onChange={(e) => setTemplate(e.target.value)} className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-100">
                <option value="">Selecione um template</option>
                {templates.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
              </select>
            ) : (
              <>
                <div className="mb-2 flex items-center gap-2">
                  <div className="text-xs text-slate-500">Inserir variável:</div>
                  <button type="button" onClick={() => insertPlaceholder('{{nome}}')} className="text-sm px-3 py-1 rounded-md bg-slate-50 border border-slate-100 hover:bg-slate-100">Nome</button>
                  <button type="button" onClick={() => insertPlaceholder('{{data}}')} className="text-sm px-3 py-1 rounded-md bg-slate-50 border border-slate-100 hover:bg-slate-100">Data</button>
                  <button type="button" onClick={() => insertPlaceholder('{{hora}}')} className="text-sm px-3 py-1 rounded-md bg-slate-50 border border-slate-100 hover:bg-slate-100">Hora</button>
                </div>

                <textarea ref={messageRef} value={message} onChange={e => setMessage(e.target.value)} rows={5} className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-100" placeholder="Escreva sua mensagem personalizada aqui" />
              </>
            )}

          </section>

          <section className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <h4 className="font-semibold text-slate-800">Agendamento</h4>
            </div>

            <label className="flex items-center gap-3">
              <input className="accent-emerald-500 w-4 h-4" type="checkbox" checked={schedule} onChange={e => setSchedule(e.target.checked)} />
              <span className="text-sm text-slate-700">Agendar envio para depois</span>
            </label>

            {schedule && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
                <input type="time" value={time} onChange={e => setTime(e.target.value)} className="border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl shadow p-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-slate-800">Preview da Mensagem</h4>
              <div className="text-xs text-slate-400">Canal • {channel === 'whatsapp' ? 'WhatsApp' : channel === 'sms' ? 'SMS' : 'E-mail'}</div>
            </div>
            <div className="h-48 border border-slate-100 rounded-md p-4 bg-slate-50 text-sm text-slate-600 overflow-auto">
              {message ? (
                message.split(/({{\s*[^}]+\s*}})/g).map((part, i) => {
                  if (/^{{\s*[^}]+\s*}}$/.test(part)) {
                    const key = part.replace(/{{\s*|\s*}}/g, '')
                    return <span key={i} className="text-sky-600 font-medium">{`{{${key}}}`}</span>
                  }
                  return <span key={i}>{part}</span>
                })
              ) : (
                'Selecione um template ou escreva uma mensagem'
              )}
            </div>

            <div className="mt-4 bg-white border border-slate-100 rounded-md p-3 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Template</div>
                  <div className="mt-1 font-medium">{template ? (template === 'confirm' ? 'Confirmação de agendamento' : template === 'reminder' ? 'Lembrete de pagamento' : template) : 'Personalizada'}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Destinatários</div>
                  <div className="mt-1 font-medium">{recipients.length} selecionado(s)</div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <div>Canal: <span className="text-slate-700">{channel === 'whatsapp' ? 'WhatsApp' : channel === 'sms' ? 'SMS' : 'E-mail'}</span></div>
                <div>{schedule ? `Agendado: ${date || '-'} ${time || ''}` : 'Envio: Imediato'}</div>
              </div>
            </div>

            <div className="mt-4">
              <button onClick={sendNow} className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white px-4 py-3 rounded-2xl hover:from-emerald-600 hover:to-emerald-500 shadow-lg transition">
                <FiSend className="text-lg" />
                <span className="font-medium">Enviar Mensagem</span>
                <FiChevronRight />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Disparo
