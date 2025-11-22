"use client";

import { useState, useEffect } from "react";
import { Share2, X, Copy, Check, Link as LinkIcon } from "lucide-react";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";

interface BlogShareButtonProps {
  title: string;
}

export default function BlogShareButton({ title }: BlogShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

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
        className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium text-zinc-400 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 hover:text-zinc-200 hover:border-white/20 transition-all group"
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
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-md bg-[#0D1117] border border-gray-800 rounded-lg shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between px-6 py-5 border-b border-gray-800">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Share this article</span>
                  <h3 className="text-lg font-bold text-white leading-snug line-clamp-2">
                    {title}
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 bg-gray-800/50 hover:bg-gray-700 text-gray-400 hover:text-white rounded-md transition-colors ml-4"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Social Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={shareToTwitter}
                    className="flex flex-col items-center justify-center gap-3 p-4 bg-[#161B22] hover:bg-[#1C2128] border border-gray-700 hover:border-gray-600 rounded-md transition-all group"
                  >
                    <FaXTwitter className="text-white text-2xl group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                      X / Twitter
                    </span>
                  </button>
                  <button
                    onClick={shareToLinkedin}
                    className="flex flex-col items-center justify-center gap-3 p-4 bg-[#161B22] hover:bg-[#1C2128] border border-gray-700 hover:border-gray-600 rounded-md transition-all group"
                  >
                    <FaLinkedin className="text-[#0077b5] text-2xl group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                      LinkedIn
                    </span>
                  </button>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-800"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#0D1117] px-2 text-gray-500 font-medium tracking-wider">
                      Or copy link
                    </span>
                  </div>
                </div>

                {/* Copy Link Section */}
                <div className="relative group/input">
                  <div className="flex items-center gap-3 bg-[#161B22] border border-gray-700 rounded-md p-1.5 pl-4 transition-colors focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20">
                    <LinkIcon size={16} className="text-gray-500 group-focus-within/input:text-blue-400 transition-colors" />
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="bg-transparent border-none text-sm text-gray-300 w-full focus:outline-none py-2 placeholder-gray-600"
                    />
                    <button
                      onClick={handleCopy}
                      className={`flex items-center justify-center p-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
                        copied
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
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
