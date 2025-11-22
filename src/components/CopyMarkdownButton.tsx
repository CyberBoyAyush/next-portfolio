'use client';

import { useState } from 'react';
import { FileText, Check } from 'lucide-react';

interface CopyMarkdownButtonProps {
  content: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
  };
}

export default function CopyMarkdownButton({ content, frontmatter }: CopyMarkdownButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const fullMarkdown = `# ${frontmatter.title}

**Author:** ${frontmatter.author}
**Date:** ${frontmatter.date}
**Tags:** ${frontmatter.tags.join(', ')}

${frontmatter.description}

---

${content}`;

    try {
      await navigator.clipboard.writeText(fullMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center justify-center w-9 h-9 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 hover:border-white/20 transition-all group"
      title="Copy page as markdown to ask AI about it"
      aria-label="Copy as Markdown"
    >
      {copied ? (
        <Check size={16} className="text-green-400" />
      ) : (
        <FileText size={16} className="group-hover:scale-110 transition-transform" />
      )}
    </button>
  );
}
