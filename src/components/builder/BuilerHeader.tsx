'use client'

import { useResumeBuilder } from '@/lib/context/builder/ResumeBuilderContext'
import { Button } from '@/components/ui/Button'
import {
  Download,
  FilePlus,
  Share2,
  Sparkles,
  Clock,
  RefreshCcw,
  Eye,
  EyeOff,
  LineChart,
  Languages,
} from 'lucide-react'
import ActionMenu from '@/components/ui/ActionMenu'

export default function BuilderHeader() {
  const {
    // 状态
    targetLanguage,
    matchScore,
    isComparing,
    // 设置语言
    setTargetLanguage,
    // 操作函数
    handleOptimize,
    handleSave,
    handleDownload,
    handleShare,
    handleClear,
    handleHistory,
    handleToggleCompare,
  } = useResumeBuilder()

  // 切换语言
  const handleToggleLanguage = () => {
    setTargetLanguage(targetLanguage === '中文' ? 'English' : '中文')
  }

  return (
    <div className="sticky top-16 z-10 flex flex-wrap items-center justify-between gap-2 px-6 py-3 bg-[hsl(var(--surface))] text-[hsl(var(--fg))] border-b border-[hsl(var(--border))] shadow-sm">
      <div className="flex items-center gap-3">
        {/* 切换语言 */}
        <Button variant="primary" onClick={handleToggleLanguage} size="sm" className="gap-1">
          <Languages size={16} /> 切换语言
        </Button>

        {/* 优化按钮 */}
        <Button variant="primary" onClick={handleOptimize} size="sm" className="gap-1">
          <Sparkles size={16} /> 优化
        </Button>

        {/* 匹配度 */}
        {matchScore !== null && (
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <LineChart size={16} className="text-[hsl(var(--primary))]" />
            匹配度：<span className="font-medium">{matchScore}%</span>
          </div>
        )}
      </div>

      {/* 操作区 */}
      <div className="flex gap-2 flex-wrap">
        <Button variant="ghost" onClick={handleSave} size="sm" className="gap-1">
          <FilePlus size={16} /> 保存
        </Button>
        <Button variant="ghost" onClick={handleDownload} size="sm" className="gap-1">
          <Download size={16} /> 下载
        </Button>
        <Button variant="ghost" onClick={handleShare} size="sm" className="gap-1">
          <Share2 size={16} /> 分享
        </Button>

        {!isComparing ? (
          <Button variant="ghost" onClick={handleToggleCompare} size="sm" className="gap-1">
            <Eye size={16} /> 对比
          </Button>
        ) : (
          <Button variant="ghost" onClick={handleToggleCompare} size="sm" className="gap-1">
            <EyeOff size={16} /> 隐藏对比
          </Button>
        )}

        {/* 更多操作 */}
        <ActionMenu
          button={
            <span className="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-md hover:bg-highlight transition">
              更多操作 ▾
            </span>
          }
          items={[
            {
              label: '历史记录',
              icon: <Clock size={16} />,
              onClick: handleHistory,
            },
            {
              label: '清空表单',
              icon: <RefreshCcw size={16} />,
              onClick: handleClear,
            },
          ]}
        />
      </div>
    </div>
  )
}
