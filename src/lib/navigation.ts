import { useLocation, useNavigate } from '@tanstack/react-router';

export function usePathname() {
  return useLocation({ select: (location) => location.pathname });
}

export function useRouter() {
  const navigate = useNavigate();

  return {
    push: (to: string) => navigate({ to }),
    replace: (to: string) => navigate({ to, replace: true }),
    back: () => window.history.back(),
    refresh: () => window.location.reload(),
  };
}
