'use client';

import {
  ImgHTMLAttributes,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

// framer-motion's `motion.img` redefines a handful of pointer/animation event
// props (onDrag, onAnimationStart, onAnimationEnd, onAnimationIteration) using
// its own signatures. We strip those from the inherited HTML img props so the
// spread is type-compatible — MDX never passes these anyway.
type ConflictingMotionProps =
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration';

type BlogImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, ConflictingMotionProps> & {
  src: string;
  alt: string;
};

/**
 * Click-to-zoom image lightbox for MDX blog images.
 *
 * Renders an inline <motion.img> that, on click, opens a fullscreen lightbox
 * with a shared `layoutId` so the image visually grows from its inline
 * position to the centered preview. The portal escapes any clipping ancestors
 * (e.g. the prose container), and is SSR-guarded by a mounted flag.
 */
export function BlogImage({ src, alt, className, onClick, ...rest }: BlogImageProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Stable layoutId per src — multiple images on a page must not collide.
  const layoutId = `blog-image-${src}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape + lock body scroll while the lightbox is open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    // Focus the close button once mounted so keyboard users land on it.
    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  const handleInlineClick = useCallback(
    (e: MouseEvent<HTMLImageElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      setOpen(true);
    },
    [onClick],
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const stopPropagation = useCallback((e: MouseEvent) => {
    e.stopPropagation();
  }, []);

  const lightbox =
    mounted && open
      ? createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="blog-image-lightbox"
                role="dialog"
                aria-modal="true"
                aria-label="Image preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                onClick={handleClose}
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 9999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  padding: '2rem',
                }}
              >
                <motion.img
                  layoutId={layoutId}
                  src={src}
                  alt={alt}
                  onClick={(e) => {
                    stopPropagation(e);
                    handleClose();
                  }}
                  style={{
                    maxWidth: '95vw',
                    maxHeight: '90vh',
                    objectFit: 'contain',
                    borderRadius: '0.75rem',
                    cursor: 'zoom-out',
                    boxShadow:
                      '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.06)',
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={(e) => {
                    stopPropagation(e);
                    handleClose();
                  }}
                  aria-label="Close image preview"
                  className="blog-image-lightbox__close"
                  style={{
                    position: 'fixed',
                    top: 16,
                    right: 16,
                    width: 40,
                    height: 40,
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10000,
                  }}
                >
                  <X size={20} strokeWidth={2.25} />
                </button>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.3, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={stopPropagation}
                  className="blog-image-lightbox__hint"
                  style={{
                    position: 'fixed',
                    bottom: 'max(env(safe-area-inset-bottom, 0px), 16px)',
                    left: 16,
                    right: 16,
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontFamily:
                      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    textAlign: 'center',
                    letterSpacing: '0.04em',
                  }}
                >
                  <span className="blog-image-lightbox__hint--desktop">
                    Press ESC or click anywhere to close
                  </span>
                  <span className="blog-image-lightbox__hint--mobile">
                    Tap anywhere to close
                  </span>
                </motion.div>

                <style>{`
                  .blog-image-lightbox__close {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    color: #fff;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    transition: background 0.18s ease, transform 0.18s ease, border-color 0.18s ease;
                  }
                  .blog-image-lightbox__close:hover {
                    background: rgba(255, 255, 255, 0.18);
                    border-color: rgba(255, 255, 255, 0.25);
                    transform: scale(1.05);
                  }
                  .blog-image-lightbox__close:focus-visible {
                    outline: 2px solid rgba(255, 255, 255, 0.8);
                    outline-offset: 2px;
                  }
                  .blog-image-lightbox__hint {
                    font-size: 12px;
                  }
                  .blog-image-lightbox__hint--mobile { display: none; }
                  @media (hover: none), (max-width: 540px) {
                    .blog-image-lightbox__hint--desktop { display: none; }
                    .blog-image-lightbox__hint--mobile { display: inline; }
                    .blog-image-lightbox__hint { font-size: 11px; }
                  }
                `}</style>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <motion.img
        layoutId={mounted ? layoutId : undefined}
        src={src}
        alt={alt}
        onClick={handleInlineClick}
        whileHover={{ scale: 1.01, filter: 'brightness(1.04)' }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={className}
        style={{ cursor: 'zoom-in' }}
        {...rest}
      />
      {lightbox}
    </>
  );
}

export default BlogImage;
