'use client';

import { FileText } from 'lucide-react';

interface BlogImagePlaceholderProps {
  title: string;
}

export default function BlogImagePlaceholder({ title }: BlogImagePlaceholderProps) {
  return (
    <div className="w-full aspect-[1408/768] bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 flex items-center justify-center rounded-t-2xl border-b border-gray-700/50">
      <div className="flex flex-col items-center gap-3">
        <div className="p-4 rounded-full bg-gray-800/60 border border-gray-700/50">
          <FileText size={32} className="text-gray-400" />
        </div>
        <p className="text-sm text-gray-500 font-medium max-w-[200px] text-center line-clamp-2">
          {title}
        </p>
      </div>
    </div>
  );
}
