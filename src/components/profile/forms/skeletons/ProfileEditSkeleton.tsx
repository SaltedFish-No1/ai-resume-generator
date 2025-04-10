// src/components/profile/skeletons/ProfileEditSkeleton.tsx
import { Skeleton } from "@/components/ui/Skeleton";

export function ProfileEditSkeleton() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <Skeleton className="h-10 w-48" /> {/* 标题 */}

      {/* 表单块骨架：5组输入 + textarea */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>

      {/* TextArea */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-[100px] w-full" />
      </div>

      {/* 模拟 Skills / 教育经历 / 项目等小卡片区域 */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-2 border border-border rounded-lg p-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>

      {/* 提交按钮 */}
      <div className="flex justify-end">
        <Skeleton className="h-10 w-32" />
      </div>
    </main>
  );
}
