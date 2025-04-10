// src/components/ui/SliderWithLabel.tsx
"use client";

type Props = {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
};

export function SliderWithLabel({
  value,
  onChange,
  min = 1,
  max = 10,
  step = 1,
  label,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      {label && (
        <span className="text-sm text-muted w-20 shrink-0 text-right">{label}</span>
      )}
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-full accent-primary"
      />
      <span className="text-sm text-muted w-6 text-right">{value}</span>
    </div>
  );
}
