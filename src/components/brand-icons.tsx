import type { SVGProps } from 'react';

type BrandIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function OpenRouter({ size, className, ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3 7.5h10.6L17 4.1v6.8l-3.4-3.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 16.5H10.4L7 19.9v-6.8l3.4 3.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Groq({ size, className, ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 3a9 9 0 1 0 8.2 12.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 7.5a4.5 4.5 0 1 0 4.5 4.5h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 4.5h4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MCP({ size, className, ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6.5 8.5 12 3l5.5 5.5L12 14 6.5 8.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="m6.5 15.5 3 3L12 16l2.5 2.5 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
