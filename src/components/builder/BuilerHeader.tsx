// components/builder/BuilderHeader.tsx
'use client'

import { Button } from '@/components/ui/Button'
import { useState } from 'react'
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


type BuilderHeaderProps = {
    onSave: () => void
    onOptimize: () => void
    onDownload: () => void
    onShare: () => void
    onClear: () => void
    onHistory: () => void
    onCompare: () => void
    onLanChange: () => void
    showCompare?: boolean
    matchScore?: number | null
}

export default function BuilderHeader({
    onSave,
    onOptimize,
    onDownload,
    onShare,
    onClear,
    onHistory,
    onCompare,
    onLanChange,
    showCompare = false,
    matchScore,
}: BuilderHeaderProps) {
    return (
        <div className="sticky top-16 z-10 flex flex-wrap items-center justify-between gap-2 px-6 py-3 bg-[hsl(var(--surface))] text-[hsl(var(--fg))] border-b border-[hsl(var(--border))] shadow-sm">
            <div className="flex items-center gap-3">
                {/* 切换语言 */}
                <Button variant="primary" onClick={onLanChange} size="sm" className="gap-1">
                    <Languages size={16} /> 切换语言
                </Button>
                {/* 优化按钮 */}
                <Button variant="primary" onClick={onOptimize} size="sm" className="gap-1">
                    <Sparkles size={16} /> 优化
                </Button>

                {/* 匹配度打分 */}
                {matchScore !== null && (
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <LineChart size={16} className="text-[hsl(var(--primary))]" />
                        匹配度：<span className="font-medium">{matchScore}%</span>
                    </div>
                )}
            </div>
            {/* 右侧操作按钮组 */}
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
                {!showCompare && (
                    <Button variant="ghost" onClick={onCompare} size="sm" className="gap-1">
                        <Eye size={16} /> 对比
                    </Button>
                )}
                {showCompare && (
                    <Button variant="ghost" onClick={onCompare} size="sm" className="gap-1">
                        <EyeOff size={16} /> 隐藏对比
                    </Button>
                )}

                {/* 更多操作下拉菜单 */}
                <ActionMenu
                    button={<span className="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-md hover:bg-highlight transition">更多操作 ▾</span>}
                    items={[
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