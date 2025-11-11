'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
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
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastScrollTime = useRef<number>(0);
  const avatarSrc = '/profile-comp.png';

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
    const now = Date.now();
    // Throttle scroll to once every 500ms to prevent too frequent scrolling
    if (now - lastScrollTime.current < 500) return;

    lastScrollTime.current = now;

    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Only auto-scroll if user is near bottom (within 100px)
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

      if (isNearBottom) {
        scrollToBottom();
      }
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current && isMobile === false) {
      inputRef.current.focus();
    }
  }, [isOpen, isMobile]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setIsKeyboardVisible(false);
    }
  }, [isOpen]);

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

  const formatTime = (date: Date | string) => {
    const value = typeof date === 'string' ? new Date(date) : date;
    return value.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!mounted) return null;

  const isMobileViewport = isMobile === true;
  const chatWindowClassName = `fixed z-[9998] flex flex-col rounded-[32px] border border-white/10 bg-[#050608]/95 shadow-[0_35px_80px_rgba(0,0,0,0.75)] ring-1 ring-white/5 backdrop-blur-2xl transition-all duration-300 ${
    isMobileViewport
      ? `${isKeyboardVisible ? 'bottom-2' : 'bottom-20'} left-4 right-4`
      : 'bottom-32 md:bottom-28 right-4 md:right-10 h-[640px] w-[min(440px,calc(100vw-2rem))]'
  }`;
  const chatWindowStyle = isMobileViewport
    ? {
        height: isKeyboardVisible ? '64dvh' : '82dvh',
        maxHeight: '680px',
        minHeight: isKeyboardVisible ? '420px' : '520px',
      }
    : undefined;
  const formPaddingClass = isMobileViewport ? (isKeyboardVisible ? 'py-2.5' : 'py-3.5') : 'py-4';
  const inputShellPadding = isMobileViewport ? (isKeyboardVisible ? 'py-1.5' : 'py-2') : 'py-2.5';
  const inputTextSizeClass = isMobileViewport ? 'text-base' : 'text-[13px]';

  const chatUI = (
    <>
      {/* Floating Button */}
      <div className="pointer-events-none fixed inset-x-0 bottom-[5.5rem] md:bottom-8 z-[9999] px-4 md:px-10">
        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="pointer-events-auto group flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0A0B12]/90 text-slate-200 shadow-[0_25px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-blue-500/60 hover:text-white active:scale-95"
            aria-label="Toggle CappyBot"
          >
            {isOpen ? (
              <X size={20} className="transition-transform duration-200 group-hover:rotate-90" />
            ) : (
              <MessageCircle size={20} className="transition-transform duration-200 group-hover:scale-110" />
            )}
          </button>
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className={chatWindowClassName} style={chatWindowStyle}>
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/5 px-6 py-4 rounded-t-[32px] bg-black/40">
            <div className="relative h-12 w-12">
              <Image
                src={avatarSrc}
                alt="Ayush Sharma profile thumbnail"
                fill
                sizes="48px"
                className="rounded-2xl border border-white/10 object-cover"
                priority
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-[#050608] bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
            </div>
            <div className="flex-1 leading-tight">
              <p className="text-sm font-semibold text-white">Ayush's Portfolio Assistant</p>
              <p className="text-xs text-slate-400">Always-on insights about Ayush's work</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-xl border border-white/5 p-2 text-slate-400 transition-all hover:border-white/20 hover:text-white"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto space-y-5 bg-gradient-to-b from-[#050608] via-[#050608] to-[#080B14] px-6 py-5 cappybot-scrollbar"
          >
            {displayMessages.map((message, index) => (
              <div
                key={message.id || index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-[26px] px-4 py-3 shadow-2xl ring-1 transition-colors ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-[#3E63FF] to-[#7B5CFF] text-white ring-blue-500/40'
                      : 'bg-[#0E1119]/90 text-slate-100 ring-white/5'
                  }`}
                >
                  <div className="text-[13.5px] leading-relaxed prose prose-invert prose-sm max-w-none prose-p:my-2.5 prose-pre:my-3 prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:p-3 prose-code:text-cyan-300 prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-a:text-blue-200 prose-a:no-underline hover:prose-a:underline">
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
                  <span
                    className={`mt-2 block text-[10px] font-semibold tracking-[0.18em] ${
                      message.role === 'user' ? 'text-white/70' : 'text-slate-500'
                    }`}
                  >
                    {message.role === 'user' ? 'You' : 'CappyBot'}
                    {' · '}
                    {formatTime('createdAt' in message ? message.createdAt : new Date())}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && displayMessages.length > 0 && displayMessages[displayMessages.length - 1].role !== 'assistant' && (
              <div className="flex justify-start">
                <div className="max-w-[70%] rounded-[26px] bg-[#0E1119]/90 px-4 py-3 ring-1 ring-white/5">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Questions - Show only at start */}
            {displayMessages.length === 1 && (
              <div className="pt-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">Quick questions</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {QUICK_QUESTIONS.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(question)}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[12px] text-white/80 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className={`rounded-b-[32px] border-t border-white/5 bg-[#050608]/90 px-5 ${formPaddingClass}`}
          >
            <div
              className={`flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0B0D15]/80 px-4 ${inputShellPadding} shadow-inner shadow-black/60 focus-within:border-blue-500/60`}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => isMobileViewport && setIsKeyboardVisible(true)}
                onBlur={() => setIsKeyboardVisible(false)}
                placeholder="Ask me about my work and experience..."
                className={`flex-1 bg-transparent ${inputTextSizeClass} text-white placeholder:text-white/30 outline-none`}
                disabled={isLoading}
                maxLength={2000}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5D63FF] to-[#3FA2FF] text-white shadow-lg shadow-[#3FA2FF]/30 transition-all hover:shadow-[#3FA2FF]/50 active:scale-95 disabled:opacity-30"
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
