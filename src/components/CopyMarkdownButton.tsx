"use client";

import { useState } from "react";
import { Check, ClipboardCopy, ClipboardCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "./BlogContentWrapper";

interface CopyMarkdownButtonProps {
  content: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
  };
  orientation?: 'horizontal' | 'vertical';
}

export default function CopyMarkdownButton({
  content,
  frontmatter,
  orientation = 'horizontal',
}: CopyMarkdownButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const fullMarkdown = `# ${frontmatter.title}

**Author:** ${frontmatter.author}
**Date:** ${frontmatter.date}
**Tags:** ${frontmatter.tags.join(", ")}

${frontmatter.description}

---

${content}`;

    try {
      await navigator.clipboard.writeText(fullMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Tooltip content={copied ? "Copied!" : "Copy Markdown"} orientation={orientation}>
      <button
        onClick={handleCopy}
        className="relative inline-flex items-center justify-center w-[38px] h-[38px] bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 hover:border-white/20 transition-all group overflow-hidden"
        aria-label="Copy as Markdown"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ClipboardCheck size={18} className="text-green-400" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ClipboardCopy
                size={18}
                className="text-gray-400 group-hover:text-white transition-colors"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </Tooltip>
  );
}
