// src/lib/utils/formUtils.ts

/**
 * 通用：去除字符串两端空格，空字符串转为 undefined
 */
export const sanitizeString = (value: unknown): string | undefined => {
    if (typeof value !== "string") return undefined;
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
};

/**
 * 专用于 URL 字段：trim + 空字符串转 undefined
 */
export const setValueAsUrl = (value: unknown): string | undefined => {
    if (typeof value !== "string") return undefined;
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
};

/**
 * 专用于数组输入（如技能技术栈输入框，逗号分隔）
 */
export const setValueAsArray = (value: unknown): string[] => {
    if (typeof value !== "string") return [];
    return value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
};

/**
 * 转成数字（自动跳过 undefined / 空值）
 */
export const setValueAsNumber = (value: unknown): number | undefined => {
    if (typeof value === "number") return value;
    if (typeof value === "string" && value.trim() !== "") {
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }
    return undefined;
};

/**
 * 可选：保留空字符串但仍去空格（仅限显示用途）
 */
export const setValueAsTrimOnly = (value: unknown): string => {
    return typeof value === "string" ? value.trim() : "";
};


/**
 * 递归删除对象中的 undefined 值
 * @param obj - 要处理的对象
 * @return - 删除 undefined 值后的新对象
 */
export const removeUndefined = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(removeUndefined);
    } else if (typeof obj === "object" && obj !== null) {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            if (value !== undefined) {
                acc[key] = removeUndefined(value);
            }
            return acc;
        }, {} as any);
    }
    return obj;
}

/**
 * 递归删除对象中的 DOM ref
 * @param obj - 要处理的对象
 * @return - 删除 DOM ref 后的新对象
 * */
export const stripErrorRefs = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(stripErrorRefs);
    }
    if (obj && typeof obj === 'object') {
        const result: Record<string, any> = {};
        for (const key in obj) {
            if (key === 'ref') continue; // 跳过 DOM ref
            result[key] = stripErrorRefs(obj[key]);
        }
        return result;
    }
    return obj;
}
