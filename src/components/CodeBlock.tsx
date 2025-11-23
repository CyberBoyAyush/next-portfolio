'use client';

import { useState, useRef, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  children: React.ReactNode;
}

export default function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState('');
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      const codeElement = codeRef.current.querySelector('code');
      if (codeElement) {
        const classes = codeElement.className.split(' ');
        const langClass = classes.find(c => c.startsWith('language-'));
        if (langClass) {
          setLanguage(langClass.replace('language-', ''));
        }
      }
    }
  }, []);

  const handleCopy = async () => {
    if (codeRef.current) {
      const codeElement = codeRef.current.querySelector('code');
      if (codeElement) {
        const text = codeElement.textContent || '';
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div ref={codeRef} className="relative group my-6 border border-white/10 bg-[#050505] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <span className="text-xs font-medium text-gray-400 uppercase font-code">{language}</span>
        <button
          onClick={handleCopy}
          className="p-1.5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check size={14} className="text-green-400" />
          ) : (
            <Copy size={14} className="text-gray-400 hover:text-white transition-colors" />
          )}
        </button>
      </div>
      <div className="overflow-x-auto">
        {children}
      </div>
    </div>
  );
}
