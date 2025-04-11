// components/builder/BuilderHeader.tsx
'use client'

import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import {
    Download,
    FilePlus,
    Share2,
    Sparkles,
    Undo2,
    Clock,
    RefreshCcw,
    Eye,
    LineChart,
} from 'lucide-react'
import ActionMenu from '@/components/ui/ActionMenu'

export default function BuilderHeader({
    onSave,
    onOptimize,
    onDownload,
    onShare,
    onClear,
    onHistory,
    onCompare,
    showCompare,
    matchScore,
}: {
    onSave: () => void
    onOptimize: () => void
    onDownload: () => void
    onShare: () => void
    onClear: () => void
    onHistory: () => void
    onCompare: () => void
    showCompare: boolean
    matchScore: number | null
}) {
    return (
        <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-2 px-6 py-3 bg-[hsl(var(--surface))] text-[hsl(var(--fg))] border-b border-[hsl(var(--border))] shadow-sm">
            <div className="flex items-center gap-3">
                <Button variant="primary" onClick={onOptimize} size="sm" className="gap-1">
                    <Sparkles size={16} /> 优化
                </Button>

                {matchScore !== null && (
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <LineChart size={16} className="text-[hsl(var(--primary))]" />
                        匹配度：<span className="font-medium">{matchScore}%</span>
                    </div>
                )}
            </div>

            <div className="flex gap-2 flex-wrap">
                <Button variant="ghost" onClick={onSave} size="sm" className="gap-1">
                    <FilePlus size={16} /> 保存
                </Button>
                <Button variant="ghost" onClick={onDownload} size="sm" className="gap-1">
                    <Download size={16} /> 下载
                </Button>
                <Button variant="ghost" onClick={onShare} size="sm" className="gap-1">
                    <Share2 size={16} /> 分享
                </Button>

                <ActionMenu
                    button={<span className="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-md hover:bg-highlight transition">更多操作 ▾</span>}
                    items={[
                        {
                            label: showCompare ? '隐藏对比' : '查看对比',
                            icon: <Eye size={16} />, onClick: onCompare,
                        },
                        {
                            label: '历史记录', icon: <Clock size={16} />, onClick: onHistory,
                        },
                        {
                            label: '清空表单', icon: <RefreshCcw size={16} />, onClick: onClear,
                        },
                    ]}
                />
            </div>
        </div>
    )
}