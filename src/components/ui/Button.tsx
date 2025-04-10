// src/components/ui/Button.tsx
import { clsx } from "clsx";
import LoadingIndicator from "./LoadingIndicator";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  href?: string;
  isLoading?: boolean;
  loadingText?: string;
}

export function Button({
  variant = "primary",
  href,
  className,
  isLoading = false,
  loadingText = "加载中...",
  disabled,
  children,
  type,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50";

  const variants = {
    primary:
      "bg-primary text-surface hover:bg-primary-hover active:bg-primary-active disabled:bg-primary/50 disabled:cursor-not-allowed",
    secondary:
      "bg-primary-subtle text-primary border border-primary/30 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed",
  };

  const composed = clsx(base, variants[variant], className);

  const content = isLoading ? (
    <LoadingIndicator text={loadingText} size={20} />
  ) : (
    children
  );

  // 设置默认按钮类型（智能推断）
  const buttonType = type ?? "submit";

  if (href) {
    return (
      <a
        href={href}
        className={clsx(
          composed,
          disabled || isLoading ? "pointer-events-none opacity-50" : ""
        )}
        aria-disabled={isLoading || disabled}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={buttonType}
      className={composed}
      disabled={disabled || isLoading}
      {...rest}
    >
      {content}
    </button>
  );
}
