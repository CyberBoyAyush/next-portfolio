'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { MessageCircle, X, Send } from 'lucide-react';
import { QUICK_QUESTIONS } from '@/lib/cappybot-context';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function CappyBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  const isLoading = status === 'streaming';

  // Add welcome message if no messages exist
  const displayMessages = messages.length === 0 ? [
    {
      id: 'welcome',
      role: 'assistant' as const,
      parts: [{ type: 'text' as const, text: "Hello, I'm CappyBot, Ayush Sharma's portfolio assistant.\n\nI can help you learn about Ayush's professional experience, technical expertise, and recent projects. How may I assist you today?" }],
      createdAt: new Date(),
    }
  ] : messages;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput && trimmedInput.length <= 2000) {
      sendMessage({ text: trimmedInput });
      setInput('');
    }
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage({ text: question });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!mounted) return null;

  const chatUI = (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          right: '2rem',
          zIndex: 9999,
        }}
        className="group flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/50 text-slate-400 shadow-xl shadow-black/40 transition-all hover:border-blue-500/60 hover:text-blue-400 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-105 active:scale-95 bottom-24 md:bottom-8"
        aria-label="Toggle CappyBot"
      >
        {isOpen ? (
          <X size={20} className="transition-transform duration-200 group-hover:rotate-90" />
        ) : (
          <MessageCircle size={20} className="transition-transform duration-200 group-hover:scale-110" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            right: '1rem',
            zIndex: 9998,
          }}
          className="flex h-[650px] w-[calc(100vw-2rem)] max-w-[480px] flex-col rounded-2xl border border-slate-700/40 bg-[#0A0F1E] shadow-2xl shadow-black/60 backdrop-blur-xl bottom-32 md:bottom-28 md:right-8">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-slate-700/40 bg-[#0D1425]/80 backdrop-blur-sm px-5 py-3.5 rounded-t-2xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 shadow-lg shadow-blue-500/10">
              <MessageCircle size={18} className="text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-slate-100 tracking-tight">Ayush's Portfolio Assistant</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50"></div>
                <span className="text-xs text-slate-500 font-medium">Online</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-slate-500 transition-all hover:bg-slate-800/50 hover:text-slate-300 active:scale-95"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#0A0F1E] cappybot-scrollbar">
            {displayMessages.map((message, index) => (
              <div
                key={message.id || index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex flex-col gap-1.5 max-w-[85%]">
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                        <MessageCircle size={13} className="text-blue-400" />
                      </div>
                      <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Assistant</span>
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white border-0 shadow-blue-600/20'
                        : 'bg-[#1A2332] text-slate-100 border border-slate-700/30 shadow-black/40'
                    }`}
                  >
                    <div className="text-[13.5px] leading-relaxed prose prose-invert prose-sm max-w-none prose-p:my-1.5 prose-p:leading-relaxed prose-pre:my-2.5 prose-pre:bg-black/40 prose-pre:border prose-pre:border-slate-700/50 prose-pre:rounded-xl prose-pre:p-3 prose-pre:shadow-inner prose-code:text-cyan-400 prose-code:bg-slate-900/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-xs prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-a:transition-colors prose-strong:text-slate-50 prose-strong:font-semibold prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-li:text-slate-200 prose-headings:text-slate-50 prose-headings:font-semibold">
                      {message.parts?.map((part, i) => {
                        if (part.type === 'text' && part.text) {
                          return (
                            <ReactMarkdown
                              key={i}
                              remarkPlugins={[remarkGfm]}
                              components={{
                                a: ({ node, ...props }) => (
                                  <a {...props} target="_blank" rel="noopener noreferrer" />
                                ),
                              }}
                            >
                              {part.text}
                            </ReactMarkdown>
                          );
                        }
                        if (part.type === 'tool-result' && 'output' in part && part.output) {
                          const result = part.output as { success?: boolean; message?: string };
                          if (result?.message) {
                            return (
                              <div key={i} className="text-slate-200">
                                {result.message}
                              </div>
                            );
                          }
                        }
                        return null;
                      })}
                    </div>
                  </div>
                  {message.role === 'assistant' && (
                    <span className="text-[10px] text-slate-600 px-1 font-medium">
                      {formatTime('createdAt' in message ? message.createdAt : new Date())}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {isLoading && displayMessages.length > 0 && displayMessages[displayMessages.length - 1].role !== 'assistant' && (
              <div className="flex justify-start">
                <div className="flex flex-col gap-1.5 max-w-[85%]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                      <MessageCircle size={13} className="text-blue-400" />
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Assistant</span>
                  </div>
                  <div className="rounded-2xl bg-[#1A2332] border border-slate-700/30 px-4 py-3 shadow-lg shadow-black/40">
                    <div className="flex gap-1.5 items-center">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Questions - Show only at start */}
            {displayMessages.length === 1 && (
              <div className="space-y-2 pt-2">
                <p className="text-[11px] text-slate-500 font-medium">Quick questions:</p>
                {QUICK_QUESTIONS.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(question)}
                    className="block w-full rounded-xl border border-slate-700/40 bg-[#1A2332]/60 px-3.5 py-2.5 text-left text-[13px] text-slate-300 transition-all hover:border-blue-500/40 hover:bg-[#1A2332] hover:text-slate-200 active:scale-[0.98]"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-700/40 bg-[#0D1425]/80 backdrop-blur-sm px-4 py-3.5 rounded-b-2xl"
          >
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about my work and experience..."
                className="flex-1 rounded-xl border-0 bg-[#1A2332] px-4 py-2.5 text-[13px] text-slate-200 placeholder-slate-500 outline-none transition-all focus:ring-2 focus:ring-blue-500/30"
                disabled={isLoading}
                maxLength={2000}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95 disabled:opacity-40 disabled:shadow-none disabled:hover:bg-blue-600"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );

  return createPortal(chatUI, document.body);
}

