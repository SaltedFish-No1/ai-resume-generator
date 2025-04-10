// components/ui/Logo.tsx
import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  hoverEffect?: boolean;
}

export default function Logo({
  className,
  size = 32,
  hoverEffect = false, 
  ...rest
}: LogoProps) {
  const dimensionStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div
      className={clsx(
        'inline-block text-primary dark:text-white',
        hoverEffect && 'group',
        className
      )}
      style={dimensionStyle}
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        className={clsx(
          'w-full h-full transition-transform duration-700 ease-in-out',
          hoverEffect && 'group-hover:rotate-180'
        )}
      >
        {/* 六边形结构 */}
        <polygon
          points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
          className="stroke-[2]"
        />

        {/* 三条横线：默认显示，hover 时淡出 + scale 动效 */}
        {[0, 1, 2].map((i) => (
          <line
            key={i}
            x1="30"
            y1={40 + i * 10}
            x2="70"
            y2={40 + i * 10}
            className={clsx(
              'stroke-[2] transition-all duration-300',
              hoverEffect &&
                `group-hover:opacity-0 group-hover:scale-90 ${
                  i === 1 ? 'delay-75' : i === 2 ? 'delay-150' : ''
                }`
            )}
          />
        ))}
      </svg>
    </div>
  );
}
