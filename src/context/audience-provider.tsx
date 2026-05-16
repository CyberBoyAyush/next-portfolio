"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "@tanstack/react-router";

export type Audience = "founder" | "engineer";

interface AudienceContextType {
  audience: Audience;
  setAudience: (audience: Audience) => void;
  toggleAudience: () => void;
}

const AudienceContext = createContext<AudienceContextType | null>(null);

const AUDIENCE_STORAGE_KEY = "portfolio-audience";
const AUDIENCE_URL_PARAM = "for";
const URL_VALUE_FOUNDER = "founders";
const URL_VALUE_ENGINEER = "engineers";

export function useAudience() {
  const context = useContext(AudienceContext);
  if (!context) {
    throw new Error("useAudience must be used within an AudienceProvider");
  }
  return context;
}

export function useAudienceSafe() {
  return useContext(AudienceContext);
}

function urlValueFromAudience(audience: Audience): string {
  return audience === "founder" ? URL_VALUE_FOUNDER : URL_VALUE_ENGINEER;
}

function audienceFromUrlValue(value: string | null): Audience | null {
  if (!value) return null;
  const normalized = value.toLowerCase();
  if (normalized === URL_VALUE_FOUNDER || normalized === "founder") return "founder";
  if (normalized === URL_VALUE_ENGINEER || normalized === "engineer" || normalized === "dev" || normalized === "devs") return "engineer";
  return null;
}

function getInitialAudience(): Audience {
  if (typeof window === "undefined") return "founder";

  // URL param takes precedence over localStorage so shareable links always work
  try {
    const url = new URL(window.location.href);
    const fromUrl = audienceFromUrlValue(url.searchParams.get(AUDIENCE_URL_PARAM));
    if (fromUrl) return fromUrl;
  } catch {
    // URL parsing failed
  }

  try {
    const stored = localStorage.getItem(AUDIENCE_STORAGE_KEY);
    if (stored === "founder" || stored === "engineer") return stored;
  } catch {
    // localStorage not available
  }

  return "founder";
}

export function AudienceProvider({ children }: { children: React.ReactNode }) {
  const [audience, setAudienceState] = useState<Audience>("founder");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setAudienceState(getInitialAudience());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(AUDIENCE_STORAGE_KEY, audience);
    } catch {
      // localStorage not available
    }

    // Only sync URL when the user is on the homepage. Routing through
    // router.navigate (instead of window.history.replaceState) keeps
    // TanStack Router's search state and Route.useSearch() in sync.
    const pathname = router.state.location.pathname;
    if (pathname !== "/" && pathname !== "") return;

    void router
      .navigate({
        search: ((prev: Record<string, unknown> | undefined) => {
          const next: Record<string, unknown> = { ...(prev ?? {}) };
          if (audience === "founder") {
            delete next[AUDIENCE_URL_PARAM];
          } else {
            next[AUDIENCE_URL_PARAM] = urlValueFromAudience(audience);
          }
          return next;
        }) as never,
        replace: true,
      })
      .catch(() => {
        // Ignore navigation cancellation / failures
      });
  }, [audience, mounted, router]);

  // Keep the in-memory audience in sync with browser navigation (back/forward).
  // We only react to URL changes on the homepage to avoid noisy state churn.
  useEffect(() => {
    if (!mounted) return;
    const unsubscribe = router.subscribe("onResolved", () => {
      if (typeof window === "undefined") return;
      try {
        const url = new URL(window.location.href);
        if (url.pathname !== "/" && url.pathname !== "") return;
        const fromUrl = audienceFromUrlValue(url.searchParams.get(AUDIENCE_URL_PARAM));
        if (fromUrl && fromUrl !== audience) {
          setAudienceState(fromUrl);
        }
      } catch {
        // ignore
      }
    });
    return unsubscribe;
  }, [router, mounted, audience]);

  const setAudience = useCallback((next: Audience) => {
    setAudienceState(next);
  }, []);

  const toggleAudience = useCallback(() => {
    setAudienceState((prev) => (prev === "founder" ? "engineer" : "founder"));
  }, []);

  return (
    <AudienceContext.Provider value={{ audience, setAudience, toggleAudience }}>
      {children}
    </AudienceContext.Provider>
  );
}
