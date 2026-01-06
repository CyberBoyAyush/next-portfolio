'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { MessageCircle, X, Send, ChevronRight, Cpu, Zap, Briefcase, Mail, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUICK_QUESTIONS } from '@/lib/cappybot-context';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useThemeSafe } from './theme-provider';

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
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === 'light';

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
      parts: [{ type: 'text' as const, text: "Hi! I'm CappyBot, Ayush Sharma's AI portfolio assistant.\n\nAsk me about his experience, skills, or projects.\n\nI can also forward your message directly to Ayush if you share your email and query." }],
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

  const handleReset = () => {
    // Reload the page to reset chat state since useChat doesn't expose a clear method directly
    // Or usually we can just reload the window or setMessages([]) if exposed, but useChat from Vercel AI SDK 
    // usually manages state. We can try passing a new body or just reload. 
    // For a simple portfolio, reload is acceptable or just clear local state if we were managing it.
    // Actually, useChat has setMessages. Let's check if we can destructure it.
    // The current hook usage is: const { messages, sendMessage, status } = useChat({...});
    // I'll just reload for now as it's the cleanest "hard reset".
    window.location.reload();
  };

  const quickQuestionsWithIcons = [
    { text: "What technologies does Ayush work with?", icon: Cpu, label: "Tech Stack" },
    { text: "Tell me about recent projects", icon: Zap, label: "Projects" },
    { text: "What is Ayush's professional background?", icon: Briefcase, label: "Experience" },
    { text: "How can I contact Ayush?", icon: Mail, label: "Contact" },
  ];

  if (!mounted) return null;

  const isMobileViewport = isMobile === true;
  const chatWindowClassName = `fixed z-[9998] flex flex-col border backdrop-blur-2xl transition-all duration-300 ${
    isLight 
      ? 'border-gray-200 bg-white/95 shadow-[0_35px_80px_rgba(0,0,0,0.15)] ring-1 ring-gray-200/50' 
      : 'border-white/10 bg-[#050608]/95 shadow-[0_35px_80px_rgba(0,0,0,0.75)] ring-1 ring-white/5'
  } ${isMobileViewport
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
            className={`pointer-events-auto group flex h-14 w-14 items-center justify-center rounded-full border backdrop-blur-xl transition-all hover:-translate-y-0.5 active:scale-95 ${
              isLight 
                ? 'border-gray-200 bg-white/90 text-gray-600 shadow-[0_25px_60px_rgba(0,0,0,0.15)] hover:border-blue-400 hover:text-gray-900' 
                : 'border-white/10 bg-[#0A0B12]/90 text-slate-200 shadow-[0_25px_60px_rgba(0,0,0,0.65)] hover:border-blue-500/60 hover:text-white'
            }`}
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={chatWindowClassName}
            style={chatWindowStyle}
          >
            {/* Header */}
            <div className={`relative flex items-center gap-4 border-b px-6 py-4 ${
              isLight ? 'border-gray-200 bg-gray-50' : 'border-white/10 bg-[#0A0B12]'
            }`}>
              <div className="relative h-10 w-10 shrink-0">
                <Image
                  src={avatarSrc}
                  alt="Ayush Sharma profile thumbnail"
                  fill
                  sizes="40px"
                  className={`rounded-full border object-cover ${isLight ? 'border-gray-200' : 'border-white/10'}`}
                  priority
                />
                <span className={`absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 ${
                  isLight ? 'border-gray-50 bg-gray-50' : 'border-[#0A0B12] bg-[#0A0B12]'
                }`}>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-[14px] font-bold truncate ${isLight ? 'text-gray-900' : 'text-white'}`}>CappyBot</p>
                  <span className={`flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold border ${
                    isLight ? 'bg-blue-100 text-blue-600 border-blue-200' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  }`}>
                    <Sparkles size={8} />
                    AI
                  </span>
                </div>
                <p className={`text-[11px] truncate ${isLight ? 'text-gray-500' : 'text-slate-400'}`}>Portfolio Assistant</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className={`shrink-0 p-2 transition-all ${
                    isLight ? 'text-gray-400 hover:bg-gray-200 hover:text-gray-700' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                  aria-label="Reset chat"
                  title="Reset Chat"
                >
                  <RefreshCw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`shrink-0 p-2 transition-all ${
                    isLight ? 'text-gray-400 hover:bg-red-100 hover:text-red-500' : 'text-slate-400 hover:bg-red-500/10 hover:text-red-400'
                  }`}
                  aria-label="Close chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className={`flex-1 overflow-y-auto space-y-6 px-5 py-6 cappybot-scrollbar relative scroll-smooth ${
                isLight ? 'bg-white' : 'bg-[#050608]'
              }`}
            >
              {/* Background Grid */}
              <div className={`absolute inset-0 bg-[size:40px_40px] pointer-events-none opacity-50 ${
                isLight 
                  ? 'bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]' 
                  : 'bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]'
              }`} />

              {displayMessages.map((message, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  key={message.id || index}
                  className={`relative flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-5 py-4 shadow-sm text-[14.5px] leading-relaxed ${message.role === 'user'
                      ? isLight ? 'bg-blue-600 text-white font-medium' : 'bg-[#2A2D36] text-white font-medium'
                      : isLight ? 'bg-gray-100 border border-gray-200 text-gray-800' : 'bg-[#0A0B12] border border-white/15 text-slate-200'
                      }`}
                  >
                    <div className={`prose prose-sm max-w-none prose-p:my-1.5 prose-pre:my-3 prose-pre:border ${
                      isLight 
                        ? 'prose-gray prose-strong:text-gray-900 prose-headings:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-pre:bg-gray-200 prose-pre:border-gray-300' 
                        : 'prose-invert prose-strong:text-white prose-headings:text-white prose-ul:text-slate-300 prose-ol:text-slate-300 prose-pre:bg-[#15171F] prose-pre:border-white/10'
                    }`}>
                      {message.parts?.map((part, i) => {
                        if (part.type === 'text' && part.text) {
                          return (
                            <ReactMarkdown
                              key={i}
                              remarkPlugins={[remarkGfm]}
                              components={{
                                a: ({ node, ...props }) => (
                                  <a {...props} target="_blank" rel="noopener noreferrer" className={`underline transition-all ${
                                    isLight ? 'text-blue-600 decoration-blue-600/30 hover:decoration-blue-600' : 'text-blue-400 decoration-blue-400/30 hover:decoration-blue-400'
                                  }`} />
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
                              <div key={i} className={`italic text-xs mt-2 border-t pt-2 ${
                                isLight ? 'text-gray-500 border-gray-200' : 'text-slate-500 border-white/5'
                              }`}>
                                {result.message}
                              </div>
                            );
                          }
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && displayMessages.length > 0 && displayMessages[displayMessages.length - 1].role !== 'assistant' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className={`border px-4 py-3 ${isLight ? 'bg-gray-100 border-gray-200' : 'bg-[#0A0B12] border-white/10'}`}>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 animate-bounce bg-blue-500 [animation-delay:-0.3s]"></div>
                      <div className="h-1.5 w-1.5 animate-bounce bg-blue-500 [animation-delay:-0.15s]"></div>
                      <div className="h-1.5 w-1.5 animate-bounce bg-blue-500"></div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Questions - Grid Layout */}
              {displayMessages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="pt-2"
                >
                  <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className={`w-full border-t ${isLight ? 'border-gray-200' : 'border-white/5'}`}></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className={`px-3 text-[10px] font-medium uppercase tracking-wider ${
                        isLight ? 'bg-white text-gray-500' : 'bg-[#050608] text-slate-500'
                      }`}>I can help you with</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {quickQuestionsWithIcons.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickQuestion(item.text)}
                        className={`group flex items-center gap-3 w-full border p-3 text-left transition-all ${
                          isLight 
                            ? 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50' 
                            : 'border-white/5 bg-[#0A0B12] hover:border-blue-500/20 hover:bg-[#0F111A]'
                        }`}
                      >
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center transition-colors ${
                          isLight 
                            ? 'bg-gray-200 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600' 
                            : 'bg-white/5 text-slate-400 group-hover:bg-blue-500/10 group-hover:text-blue-400'
                        }`}>
                          <item.icon size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-[10px] font-medium mb-0.5 ${isLight ? 'text-gray-500' : 'text-slate-500'}`}>{item.label}</p>
                          <p className={`text-[12px] truncate ${
                            isLight ? 'text-gray-700 group-hover:text-gray-900' : 'text-slate-200 group-hover:text-white'
                          }`}>{item.text}</p>
                        </div>
                        <ChevronRight size={14} className={`opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 ${
                          isLight ? 'text-gray-400 group-hover:text-blue-600' : 'text-slate-600 group-hover:text-blue-400'
                        }`} />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`border-t px-5 ${formPaddingClass} ${
              isLight ? 'border-gray-200 bg-gray-50' : 'border-white/10 bg-[#0A0B12]'
            }`}>
              <form
                onSubmit={handleSubmit}
                className={`flex items-center gap-2 border px-2 py-2 transition-all ${
                  isLight 
                    ? 'border-gray-200 bg-white focus-within:border-blue-400 focus-within:shadow-[0_0_20px_-5px_rgba(59,130,246,0.15)]' 
                    : 'border-white/10 bg-[#15171F] focus-within:border-blue-500/30 focus-within:bg-[#1A1D26] focus-within:shadow-[0_0_20px_-5px_rgba(59,130,246,0.2)]'
                }`}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => isMobileViewport && setIsKeyboardVisible(true)}
                  onBlur={() => setIsKeyboardVisible(false)}
                  placeholder="Ask anything..."
                  className={`flex-1 bg-transparent px-3 ${inputTextSizeClass} outline-none min-w-0 ${
                    isLight ? 'text-gray-900 placeholder:text-gray-400' : 'text-white placeholder:text-slate-500'
                  }`}
                  disabled={isLoading}
                  maxLength={2000}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 ${
                    isLight ? 'bg-gray-900 text-white' : 'bg-white text-black'
                  }`}
                  aria-label="Send message"
                >
                  <Send size={16} className={input.trim() ? 'ml-0.5' : ''} />
                </button>
              </form>
              <div className="mt-2 text-center">
                <span className={`text-[9px] font-medium tracking-wide ${isLight ? 'text-gray-400' : 'text-slate-600'}`}>POWERED BY AI · GEMINI 2.5 FLASH</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return createPortal(chatUI, document.body);
}
