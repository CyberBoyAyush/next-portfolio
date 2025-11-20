'use client';

import { useState, useRef } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  children: React.ReactNode;
}

export default function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

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
    <div ref={codeRef} className="relative group">
      <button
        onClick={handleCopy}
        className="absolute right-4 top-4 p-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all opacity-0 group-hover:opacity-100 z-10"
        aria-label="Copy code"
      >
        {copied ? (
          <Check size={14} className="text-green-400" />
        ) : (
          <Copy size={14} className="text-gray-400 hover:text-white transition-colors" />
        )}
      </button>
      {children}
    </div>
  );
}
