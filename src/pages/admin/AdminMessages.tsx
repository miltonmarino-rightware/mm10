import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Image, Video, Hash } from 'lucide-react';

const conversations = [
  { id: '1', name: 'João Silva', type: 'direct' as const, avatar: 'J', lastMessage: 'Obrigado pela análise!', time: '14:30', unread: 1 },
  { id: '2', name: 'Ana Costa', type: 'direct' as const, avatar: 'A', lastMessage: 'Quando é a próxima sessão?', time: '12:00', unread: 2 },
  { id: '3', name: 'Turma Forex Iniciante', type: 'group' as const, avatar: '#', lastMessage: 'João: Alguém viu o setup?', time: 'Ontem', unread: 0 },
  { id: '4', name: 'Price Action Pro', type: 'group' as const, avatar: '#', lastMessage: 'Análise do GBP/JPY enviada', time: 'Ontem', unread: 0 },
  { id: '5', name: 'Miguel Santos', type: 'direct' as const, avatar: 'M', lastMessage: 'Excelente sessão!', time: '15 Mar', unread: 0 },
];

const mockMessages: Record<string, { id: string; content: string; sender: string; time: string; isMine: boolean }[]> = {
  '1': [
    { id: '1', content: 'Olá Tarik, podemos rever o meu journal?', sender: 'João', time: '14:20', isMine: false },
    { id: '2', content: 'Claro! Vi que tiveste bons resultados esta semana.', sender: 'Tarik', time: '14:25', isMine: true },
    { id: '3', content: 'Obrigado pela análise!', sender: 'João', time: '14:30', isMine: false },
  ],
};

export default function AdminMessages() {
  const [activeConv, setActiveConv] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const conv = conversations.find(c => c.id === activeConv);
  const messages = activeConv ? (mockMessages[activeConv] || []) : [];

  return (
    <div className="flex flex-col h-[calc(100dvh-3.5rem)]">
      <AnimatePresence mode="wait">
        {!activeConv ? (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}
            className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="p-4 lg:p-8 max-w-3xl mx-auto space-y-4">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground text-glow-primary">Mensagens</h1>
                <p className="text-sm text-muted-foreground mt-1">Comunica com alunos e grupos</p>
              </div>
              <div className="space-y-1">
                {conversations.map(c => (
                  <button key={c.id} onClick={() => setActiveConv(c.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-card transition-colors text-left active:scale-[0.99]">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold ${c.type === 'group' ? 'bg-primary/10 text-primary' : 'bg-secondary text-foreground'}`}>
                      {c.type === 'group' ? <Hash size={18} /> : c.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground truncate">{c.name}</span>
                        <span className="text-[11px] text-muted-foreground shrink-0 ml-2">{c.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
                    </div>
                    {c.unread > 0 && (
                      <span className="bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">{c.unread}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="chat" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            className="flex-1 flex flex-col">
            <div className="h-12 border-b border-border flex items-center gap-3 px-4 shrink-0">
              <button onClick={() => setActiveConv(null)} className="p-1 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors">
                <ArrowLeft size={20} />
              </button>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${conv?.type === 'group' ? 'bg-primary/10 text-primary' : 'bg-secondary text-foreground'}`}>
                {conv?.type === 'group' ? <Hash size={14} /> : conv?.avatar}
              </div>
              <p className="text-sm font-semibold text-foreground truncate">{conv?.name}</p>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.isMine ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-card border border-border text-card-foreground rounded-tl-sm'}`}>
                    {msg.content}
                    <p className={`text-[10px] mt-1 ${msg.isMine ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-3 shrink-0">
              <div className="flex items-center gap-2 max-w-3xl mx-auto">
                <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors shrink-0"><Image size={18} /></button>
                <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors shrink-0"><Video size={18} /></button>
                <input value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && setNewMessage('')}
                  placeholder="Escreve uma mensagem..." className="flex-1 h-10 px-4 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                <button onClick={() => setNewMessage('')} disabled={!newMessage.trim()}
                  className="p-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all disabled:opacity-40 shrink-0 active:scale-95"><Send size={16} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
