"use client";

import { useState, useEffect } from "react";
import { Share2, X, Copy, Check, Link as LinkIcon } from "lucide-react";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { useThemeSafe } from "./theme-provider";

interface BlogShareButtonProps {
  title: string;
}

export default function BlogShareButton({ title }: BlogShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === "light";

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareToLinkedin = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all group border ${
          isLight
            ? "text-gray-600 bg-gray-100 border-gray-200 hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300"
            : "text-zinc-400 bg-white/5 border-white/10 hover:bg-white/10 hover:text-zinc-200 hover:border-white/20"
        }`}
      >
        <Share2 size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
        <span>Share</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className={`absolute inset-0 backdrop-blur-sm ${isLight ? 'bg-black/40' : 'bg-black/60'}`}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`relative w-full max-w-md rounded-lg shadow-2xl overflow-hidden border ${
                isLight 
                  ? 'bg-white border-gray-200' 
                  : 'bg-[#0D1117] border-gray-800'
              }`}
            >
              {/* Header */}
              <div className={`flex items-start justify-between px-6 py-5 border-b ${
                isLight ? 'border-gray-200' : 'border-gray-800'
              }`}>
                <div className="flex flex-col gap-1">
                  <span className={`text-xs font-medium uppercase tracking-wide ${
                    isLight ? 'text-gray-500' : 'text-gray-400'
                  }`}>Share this article</span>
                  <h3 className={`text-lg font-bold leading-snug line-clamp-2 ${
                    isLight ? 'text-gray-900' : 'text-white'
                  }`}>
                    {title}
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-1.5 rounded-md transition-colors ml-4 ${
                    isLight 
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700' 
                      : 'bg-gray-800/50 hover:bg-gray-700 text-gray-400 hover:text-white'
                  }`}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Social Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={shareToTwitter}
                    className={`flex flex-col items-center justify-center gap-3 p-4 border rounded-md transition-all group ${
                      isLight 
                        ? 'bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-gray-300' 
                        : 'bg-[#161B22] hover:bg-[#1C2128] border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <FaXTwitter className={`text-2xl group-hover:scale-110 transition-transform duration-300 ${
                      isLight ? 'text-gray-800' : 'text-white'
                    }`} />
                    <span className={`text-sm font-medium ${
                      isLight ? 'text-gray-600 group-hover:text-gray-900' : 'text-gray-300 group-hover:text-white'
                    }`}>
                      X / Twitter
                    </span>
                  </button>
                  <button
                    onClick={shareToLinkedin}
                    className={`flex flex-col items-center justify-center gap-3 p-4 border rounded-md transition-all group ${
                      isLight 
                        ? 'bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-gray-300' 
                        : 'bg-[#161B22] hover:bg-[#1C2128] border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <FaLinkedin className="text-[#0077b5] text-2xl group-hover:scale-110 transition-transform duration-300" />
                    <span className={`text-sm font-medium ${
                      isLight ? 'text-gray-600 group-hover:text-gray-900' : 'text-gray-300 group-hover:text-white'
                    }`}>
                      LinkedIn
                    </span>
                  </button>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className={`w-full border-t ${isLight ? 'border-gray-200' : 'border-gray-800'}`}></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className={`px-2 font-medium tracking-wider ${
                      isLight ? 'bg-white text-gray-400' : 'bg-[#0D1117] text-gray-500'
                    }`}>
                      Or copy link
                    </span>
                  </div>
                </div>

                {/* Copy Link Section */}
                <div className="relative group/input">
                  <div className={`flex items-center gap-3 border rounded-md p-1.5 pl-4 transition-colors focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20 ${
                    isLight 
                      ? 'bg-gray-50 border-gray-200' 
                      : 'bg-[#161B22] border-gray-700'
                  }`}>
                    <LinkIcon size={16} className={`group-focus-within/input:text-blue-500 transition-colors ${
                      isLight ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className={`bg-transparent border-none text-sm w-full focus:outline-none py-2 ${
                        isLight ? 'text-gray-700 placeholder-gray-400' : 'text-gray-300 placeholder-gray-600'
                      }`}
                    />
                    <button
                      onClick={handleCopy}
                      className={`flex items-center justify-center p-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
                        copied
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : isLight 
                            ? "bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800 border border-gray-300"
                            : "bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white border border-gray-700"
                      }`}
                    >
                      {copied ? (
                        <Check size={18} className="animate-in zoom-in duration-200" />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
