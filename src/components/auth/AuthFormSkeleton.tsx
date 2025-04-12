// components/auth/AuthFormSkeleton.tsx
'use client'

import { Skeleton } from '@/components/ui/Skeleton'

export default function AuthFormSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Email */}
      <div>
        <div className="h-4 w-20 bg-muted rounded mb-2" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>

      {/* Password */}
      <div>
        <div className="h-4 w-20 bg-muted rounded mb-2" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>

      {/* Confirm Password (显示注册模式时的占位) */}
      <div>
        <div className="h-4 w-24 bg-muted rounded mb-2" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>

      {/* Submit Button */}
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  )
}
