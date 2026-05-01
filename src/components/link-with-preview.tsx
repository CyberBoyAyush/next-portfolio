'use client';

import {
  AnchorHTMLAttributes,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const SITE_DOMAIN = 'ayushsharma.in';
const SHOW_DELAY_MS = 150;
const CARD_WIDTH = 320;
const CARD_OFFSET = 10;

type LinkWithPreviewProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  children: React.ReactNode;
};

type CardPosition = {
  top: number;
  left: number;
  placement: 'top' | 'bottom';
};

/**
 * Determines whether a URL should be treated as external relative to this site.
 * Internal: relative paths, hashes, mailto:/tel:, or same-domain absolute URLs.
 */
function isExternalLink(href: string): boolean {
  if (!href) return false;
  if (href.startsWith('#') || href.startsWith('/') || href.startsWith('?')) return false;
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  if (!/^https?:\/\//i.test(href)) return false;

  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, '').toLowerCase();
    return host !== SITE_DOMAIN && !host.endsWith(`.${SITE_DOMAIN}`);
  } catch {
    return false;
  }
}

function getDomain(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return href;
  }
}

/**
 * Favicon fallback chain. DuckDuckGo's icon service has the broadest coverage,
 * Google's s2 endpoint is the secondary fallback, and we finally render a
 * domain-initial bubble if both fail.
 */
function getFaviconCandidates(domain: string): string[] {
  if (!domain) return [];
  return [
    `https://icons.duckduckgo.com/ip3/${domain}.ico`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
  ];
}

export function LinkWithPreview({
  href,
  children,
  className,
  ...rest
}: LinkWithPreviewProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const showTimerRef = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<CardPosition | null>(null);
  const [canHover, setCanHover] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [faviconIndex, setFaviconIndex] = useState(0);
  const previewId = useId();

  const external = useMemo(() => isExternalLink(href), [href]);
  const domain = useMemo(() => (external ? getDomain(href) : ''), [external, href]);
  const faviconCandidates = useMemo(() => getFaviconCandidates(domain), [domain]);
  const faviconUrl =
    faviconIndex < faviconCandidates.length ? faviconCandidates[faviconIndex] : '';

  // Mount-only effects (avoids SSR mismatch for portal target).
  useEffect(() => {
    setMounted(true);
  }, []);

  // Detect hover-capable input. Touch devices skip the preview entirely.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanHover(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  // Skip the preview if the link is rendered inside a code block.
  const isInsideCodeBlock = useCallback(() => {
    const el = linkRef.current;
    if (!el) return false;
    return Boolean(el.closest('pre, code'));
  }, []);

  /**
   * Computes a viewport-relative (`fixed`) position for the card.
   * Using `fixed` + portal escapes any `<p>` ancestor (avoiding the
   * hydration `<div> in <p>` error) and prevents the card from triggering
   * adjacent-link mouse events that caused flicker in tight lists.
   */
  const computePosition = useCallback((): CardPosition | null => {
    const el = linkRef.current;
    if (!el) return null;

    const rect = el.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const estimatedCardHeight = 80;

    const spaceBelow = viewportHeight - rect.bottom;
    const placement: 'top' | 'bottom' =
      spaceBelow < estimatedCardHeight + CARD_OFFSET + 16 &&
      rect.top > estimatedCardHeight + CARD_OFFSET + 16
        ? 'top'
        : 'bottom';

    const top =
      placement === 'bottom'
        ? rect.bottom + CARD_OFFSET
        : rect.top - CARD_OFFSET - estimatedCardHeight;

    const margin = 12;
    let left = rect.left;
    const maxLeft = viewportWidth - CARD_WIDTH - margin;
    if (left > maxLeft) left = maxLeft;
    if (left < margin) left = margin;

    return { top, left, placement };
  }, []);

  const clearShowTimer = () => {
    if (showTimerRef.current !== null) {
      window.clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
  };

  const handleMouseEnter = useCallback(() => {
    if (!external || !canHover) return;
    if (isInsideCodeBlock()) return;
    clearShowTimer();
    showTimerRef.current = window.setTimeout(() => {
      const pos = computePosition();
      if (pos) {
        setPosition(pos);
        setOpen(true);
      }
    }, SHOW_DELAY_MS);
  }, [external, canHover, isInsideCodeBlock, computePosition]);

  const handleMouseLeave = useCallback(() => {
    clearShowTimer();
    setOpen(false);
  }, []);

  const handleFocus = useCallback(() => {
    if (!external || !canHover) return;
    if (isInsideCodeBlock()) return;
    const pos = computePosition();
    if (pos) {
      setPosition(pos);
      setOpen(true);
    }
  }, [external, canHover, isInsideCodeBlock, computePosition]);

  // Hide the card if the user scrolls or resizes while it is open.
  useEffect(() => {
    if (!open) return;
    const close = () => {
      clearShowTimer();
      setOpen(false);
    };
    window.addEventListener('scroll', close, { passive: true, capture: true });
    window.addEventListener('resize', close);
    return () => {
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [open]);

  useEffect(() => {
    return () => clearShowTimer();
  }, []);

  // Internal links: render plain anchor, no decoration.
  if (!external) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  }

  const card =
    open && position && mounted
      ? createPortal(
          <AnimatePresence>
            <motion.div
              key="link-preview"
              id={previewId}
              role="tooltip"
              initial={{ opacity: 0, y: position.placement === 'bottom' ? -6 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: position.placement === 'bottom' ? -4 : 4 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed',
                top: position.top,
                left: position.left,
                width: CARD_WIDTH,
                maxWidth: 'calc(100vw - 24px)',
                zIndex: 9999,
                pointerEvents: 'none',
              }}
              className="link-preview-card"
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  borderRadius: 12,
                  backdropFilter: 'blur(14px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(14px) saturate(160%)',
                }}
                className="link-preview-card__inner"
              >
                <div
                  style={{
                    flex: '0 0 auto',
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                  className="link-preview-card__favicon"
                >
                  {faviconUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={faviconUrl}
                      alt=""
                      width={28}
                      height={28}
                      referrerPolicy="no-referrer"
                      onError={() => setFaviconIndex((i) => i + 1)}
                      style={{ width: 28, height: 28, display: 'block' }}
                    />
                  ) : (
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        opacity: 0.85,
                      }}
                    >
                      {domain.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    className="link-preview-card__domain"
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: '-0.005em',
                      lineHeight: 1.2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {domain}
                  </div>
                  <div
                    className="link-preview-card__url"
                    style={{
                      marginTop: 3,
                      fontSize: 11.5,
                      lineHeight: 1.35,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {href}
                  </div>
                </div>
              </div>

              <style>{`
                .link-preview-card__inner {
                  background: rgba(15, 15, 18, 0.78);
                  border: 1px solid rgba(255, 255, 255, 0.08);
                  box-shadow:
                    0 1px 0 rgba(255, 255, 255, 0.04) inset,
                    0 12px 32px -8px rgba(0, 0, 0, 0.55),
                    0 4px 12px -4px rgba(0, 0, 0, 0.35);
                  color: #e5e7eb;
                }
                .link-preview-card__favicon {
                  background: rgba(255, 255, 255, 0.06);
                  border: 1px solid rgba(255, 255, 255, 0.08);
                  color: #e5e7eb;
                }
                .link-preview-card__domain {
                  color: #f3f4f6;
                }
                .link-preview-card__url {
                  color: #9ca3af;
                }
                [data-theme="light"] .link-preview-card__inner {
                  background: rgba(255, 255, 255, 0.88);
                  border: 1px solid rgba(15, 23, 42, 0.08);
                  box-shadow:
                    0 1px 0 rgba(255, 255, 255, 0.9) inset,
                    0 12px 32px -8px rgba(15, 23, 42, 0.18),
                    0 4px 12px -4px rgba(15, 23, 42, 0.1);
                  color: #1f2937;
                }
                [data-theme="light"] .link-preview-card__favicon {
                  background: rgba(15, 23, 42, 0.04);
                  border: 1px solid rgba(15, 23, 42, 0.06);
                  color: #1f2937;
                }
                [data-theme="light"] .link-preview-card__domain {
                  color: #111827;
                }
                [data-theme="light"] .link-preview-card__url {
                  color: #6b7280;
                }
              `}</style>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <a
        ref={linkRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleMouseLeave}
        aria-describedby={open ? previewId : undefined}
        {...rest}
      >
        {children}
        <ArrowUpRight
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: '0.85em',
            height: '0.85em',
            verticalAlign: '-0.08em',
            marginLeft: '0.15em',
            strokeWidth: 2.25,
            opacity: 0.75,
          }}
        />
      </a>
      {card}
    </>
  );
}

export default LinkWithPreview;
