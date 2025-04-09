// components/ui/Logo.tsx
import clsx from 'clsx'

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={clsx('group inline-block text-primary dark:text-white', className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        className="w-full h-full transition-transform duration-700 ease-in-out group-hover:rotate-180"
      >
        {/* 六边形结构 */}
        <polygon
          points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
          className="stroke-[2]"
        />

        {/* 三条横线 */}
        {[0, 1, 2].map((i) => (
          <line
            key={i}
            x1="30"
            y1={40 + i * 10}
            x2="70"
            y2={40 + i * 10}
            className={clsx(
              'stroke-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-300',
              i === 1 ? 'delay-100' : i === 2 ? 'delay-200' : ''
            )}
          />
        ))}
      </svg>
    </div>
  )
}
