import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles, X, ChevronRight, BarChart2, Table, AlertTriangle, Users, DollarSign, RotateCw, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  inlineComponentType?: 'chart' | 'table' | 'alert';
}

export const DockedAIAssistant: React.FC = () => {
  const [isDockOpen, setIsDockOpen] = useState(true);
  const [inputQuery, setInputQuery] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Hello Alex! I am your Workforce AI Co-Pilot. Ask me anything about payroll deltas, overtime risks, or shift coverage.',
      timestamp: '05:20 PM'
    },
    {
      id: 'msg-2',
      sender: 'user',
      text: 'Show me total overtime hours by department for this pay cycle.',
      timestamp: '05:21 PM'
    },
    {
      id: 'msg-3',
      sender: 'ai',
      text: 'Here is the breakdown of overtime hours across all active facility departments for the current pay period:',
      timestamp: '05:21 PM',
      inlineComponentType: 'chart'
    }
  ]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsStreaming(true);

    // Simulate AI response streaming with inline UI rendering
    setTimeout(() => {
      let componentType: ChatMessage['inlineComponentType'] = undefined;
      let replyText = 'I have analyzed the roster data. Everything is within standard operating parameters.';

      if (query.toLowerCase().includes('overtime') || query.toLowerCase().includes('payroll') || query.toLowerCase().includes('cost')) {
        componentType = 'chart';
        replyText = 'I generated an inline department breakdown of overtime hours and projected wage impact:';
      } else if (query.toLowerCase().includes('shift') || query.toLowerCase().includes('roster') || query.toLowerCase().includes('gap')) {
        componentType = 'table';
        replyText = 'Here are the open shift slots requiring supervisor assignment for Friday, Aug 7:';
      } else if (query.toLowerCase().includes('risk') || query.toLowerCase().includes('breach')) {
        componentType = 'alert';
        replyText = 'I detected 2 active compliance risks requiring immediate attention:';
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        inlineComponentType: componentType
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsStreaming(false);
    }, 900);
  };

  return (
    <div className="relative flex">
      {/* Main Container */}
      <div className={`transition-all duration-300 ${isDockOpen ? 'w-full md:w-80 lg:w-96' : 'w-14'}`}>
        <div className="bg-[var(--bg-surface-raised)] border-l border-[var(--border-default)] h-[680px] rounded-2xl shadow-[var(--shadow-3)] flex flex-col overflow-hidden">
          
          {/* Dock Header */}
          <div className="p-4 bg-[var(--ink-950)] text-white border-b border-[var(--ink-800)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--accent-500)] to-indigo-600 flex items-center justify-center font-bold text-xs shadow-md">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              {isDockOpen && (
                <div>
                  <h3 className="text-xs font-bold tracking-tight">Workforce AI Co-Pilot</h3>
                  <span className="text-[10px] font-mono text-[var(--accent-400)]">DOCKED ENGINE ACTIVE</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsDockOpen(!isDockOpen)}
              className="text-[var(--ink-400)] hover:text-white transition-colors p-1"
            >
              {isDockOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
            </button>
          </div>

          {isDockOpen && (
            <>
              {/* Chat Messages Stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                {messages.map((msg) => {
                  const isAi = msg.sender === 'ai';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col space-y-1.5 ${isAi ? 'items-start' : 'items-end'}`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-tertiary)] font-mono">
                        <span>{isAi ? 'AI Assistant' : 'You'}</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <div
                        className={`
                          p-3.5 rounded-2xl max-w-[90%] leading-relaxed select-text
                          ${isAi ? 'bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-primary)]' : 'bg-[var(--accent-500)] text-white font-medium shadow-sm'}
                        `}
                      >
                        <p>{msg.text}</p>

                        {/* INLINE UI COMPONENT RENDERING DIRECTLY INSIDE CHAT BUBBLE! */}
                        {isAi && msg.inlineComponentType === 'chart' && (
                          <div className="mt-3 p-3 rounded-xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] space-y-2 font-mono tabular-nums text-[11px]">
                            <div className="flex items-center justify-between text-[10px] font-sans font-bold text-[var(--accent-500)]">
                              <span>OVERTIME HOURS BY DEPT</span>
                              <span>THIS CYCLE</span>
                            </div>

                            <div className="space-y-1.5">
                              <div>
                                <div className="flex justify-between text-[10px]">
                                  <span>Logistics & Warehouse</span>
                                  <span className="font-bold text-rose-400">42.5 hrs</span>
                                </div>
                                <div className="w-full bg-[var(--bg-canvas)] h-2 rounded-full overflow-hidden border border-[var(--border-subtle)]">
                                  <div className="bg-rose-500 h-full w-[85%]" />
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-[10px]">
                                  <span>Shift Operations</span>
                                  <span className="font-bold text-amber-400">28.0 hrs</span>
                                </div>
                                <div className="w-full bg-[var(--bg-canvas)] h-2 rounded-full overflow-hidden border border-[var(--border-subtle)]">
                                  <div className="bg-amber-500 h-full w-[55%]" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {isAi && msg.inlineComponentType === 'table' && (
                          <div className="mt-3 p-3 rounded-xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] space-y-2 text-[11px]">
                            <div className="font-sans font-bold text-xs text-[var(--text-primary)]">Open Shift Slots (Aug 7)</div>
                            <div className="space-y-1 text-[10px] font-mono">
                              <div className="flex justify-between p-1.5 rounded bg-[var(--bg-canvas)]">
                                <span>Morning Lead (Austin)</span>
                                <span className="text-[var(--accent-500)] font-bold">Unassigned</span>
                              </div>
                              <div className="flex justify-between p-1.5 rounded bg-[var(--bg-canvas)]">
                                <span>Night Dispatch (Dallas)</span>
                                <span className="text-[var(--accent-500)] font-bold">Unassigned</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isStreaming && (
                  <div className="flex items-center gap-2 text-xs text-[var(--accent-500)] font-mono">
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    <span>AI streaming response...</span>
                  </div>
                )}
              </div>

              {/* Quick Suggestion Chips */}
              <div className="p-2 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)] flex flex-wrap gap-1.5 text-[10px]">
                <button 
                  onClick={() => handleSend('Show me total overtime hours')} 
                  className="px-2 py-1 rounded-lg bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  Overtime breakdown
                </button>
                <button 
                  onClick={() => handleSend('Which shifts have open gaps?')} 
                  className="px-2 py-1 rounded-lg bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  Open shift gaps
                </button>
              </div>

              {/* Input Area */}
              <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] flex items-center gap-2">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={e => setInputQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Workforce AI..."
                  className="flex-1 text-xs bg-[var(--bg-canvas)] border border-[var(--border-default)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-accent)]"
                />
                <Button
                  variant="accent"
                  size="icon"
                  onClick={() => handleSend()}
                  disabled={!inputQuery.trim() || isStreaming}
                >
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
