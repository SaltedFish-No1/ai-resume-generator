// src/app/builder/layout.tsx


import { ResumeBuilderProvider } from '@/lib/context/builder/ResumeBuilderContext'


export default function ResumeBuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <ResumeBuilderProvider>
      {children}
    </ResumeBuilderProvider>
  )
}