import LoadingIndicator from "@/components/ui/animations/LoadingIndicator"

export default function page() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <LoadingIndicator text="加载中..." size={64} variant="spin" />
        <LoadingIndicator text="加载中..." size={64} variant="pulse" />
        <LoadingIndicator text="加载中..." size={64} variant="orbit" />
        
    </div>
  )
}
