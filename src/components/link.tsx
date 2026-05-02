import { Link as RouterLink } from '@tanstack/react-router';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

type AppLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  children?: ReactNode;
};

export default function Link({ href, children, ...props }: AppLinkProps) {
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.includes('#')) {
    return <a href={href} {...props}>{children}</a>;
  }

  return <RouterLink to={href} {...props}>{children}</RouterLink>;
}
