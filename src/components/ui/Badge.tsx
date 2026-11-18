import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "primary" | "warning" | "danger" | "muted" | "accent";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "muted",
  children,
  ...props
}) => {
  const variantStyles = {
    success: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
    primary: "bg-blue-50 text-blue-900 border-blue-200/80",
    warning: "bg-amber-50 text-amber-900 border-amber-200/80",
    danger: "bg-red-50 text-red-800 border-red-200/80",
    muted: "bg-slate-100 text-slate-700 border-slate-200",
    accent: "bg-indigo-50 text-indigo-900 border-indigo-200/80",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
