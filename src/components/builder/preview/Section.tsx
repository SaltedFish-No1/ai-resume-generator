// components/preview/Section.tsx
export default function Section({
    title,
    children,
    optional = false,
  }: {
    title: string
    children: React.ReactNode
    optional?: boolean
  }) {
    if (optional && !children) return null
    return (
      <section className="py-6">
        <h3 className="text-lg font-semibold text-[hsl(var(--fg))] mb-3">
          {title}
        </h3>
        <div>{children}</div>
      </section>
    )
  }
  