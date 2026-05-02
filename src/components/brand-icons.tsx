import type { SVGProps } from 'react';

type BrandIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function OpenRouter({ size, className, ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3 248.945C18 248.945 76 236 106 219C136 202 136 202 198 158C276.497 102.293 332 120.945 423 120.945" strokeWidth="90" />
      <path d="M511 121.5L357.25 210.268L357.25 32.7324L511 121.5Z" />
      <path d="M0 249C15 249 73 261.945 103 278.945C133 295.945 133 295.945 195 339.945C273.497 395.652 329 377 420 377" strokeWidth="90" />
      <path d="M508 376.445L354.25 287.678L354.25 465.213L508 376.445Z" />
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
