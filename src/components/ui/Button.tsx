// src/components/ui/Button.tsx
import { clsx } from "clsx";
import LoadingIndicator from "@/components/ui/animations/LoadingIndicator";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  href?: string;
  isLoading?: boolean;
  loadingText?: string;
}

export function Button({
  variant = "primary",
  size = "md",
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
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 cursor-pointer";

  const variants = {
    primary:
      "bg-primary text-surface hover:bg-primary-hover active:bg-primary-active disabled:bg-primary/50 disabled:cursor-not-allowed",
    secondary:
      "bg-primary-subtle text-primary border border-primary/30 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed",
    ghost:
      "bg-transparent text-fg hover:bg-highlight disabled:opacity-50 disabled:cursor-not-allowed",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const composed = clsx(base, variants[variant], sizes[size], className);
  const content = isLoading ? (
    <LoadingIndicator text={loadingText} size={20} />
  ) : (
    children
  );
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
