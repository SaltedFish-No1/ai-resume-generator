// components/builder/ResumePreviewSkeleton.tsx
export default function ResumePreviewSkeleton() {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6 animate-pulse">
        {/* 标题骨架 */}
        <div className="space-y-2 text-center">
          <div className="h-6 w-40 mx-auto bg-muted rounded" />
          <div className="h-4 w-24 mx-auto bg-muted rounded" />
          <div className="h-4 w-[80%] mx-auto bg-muted rounded mt-2" />
        </div>
  
        {/* 分段骨架 */}
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-5 w-32 bg-muted rounded" />
              <div className="space-y-2">
                <div className="h-4 w-[90%] bg-muted rounded" />
                <div className="h-4 w-[80%] bg-muted rounded" />
                <div className="h-4 w-[70%] bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  