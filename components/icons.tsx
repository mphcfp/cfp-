import type { SVGProps } from 'react';

type ArrowDirection = 'up-right' | 'down-right' | 'up' | 'down';
type ArrowProps = SVGProps<SVGSVGElement> & { direction?: ArrowDirection };

export function ArrowIcon({ direction = 'up-right', className = '', ...props }: ArrowProps) {
  const paths: Record<ArrowDirection, string> = {
    'up-right': 'M6 18 18 6M7 6h11v11',
    'down-right': 'M6 6 18 18M7 18h11V7',
    up: 'M12 20V4M5 11l7-7 7 7',
    down: 'M12 4v16M5 13l7 7 7-7',
  };
  return (
    <svg className={`arrow-svg ${className}`.trim()} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d={paths[direction]} />
    </svg>
  );
}

export function SparkIcon({ className = '', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={`spark-svg ${className}`.trim()} viewBox="0 0 48 48" fill="currentColor" aria-hidden="true" {...props}>
      <g transform="translate(24 24)">
        <rect x="-3" y="-22" width="6" height="44" rx="1" />
        <rect x="-3" y="-22" width="6" height="44" rx="1" transform="rotate(60)" />
        <rect x="-3" y="-22" width="6" height="44" rx="1" transform="rotate(120)" />
      </g>
    </svg>
  );
}
