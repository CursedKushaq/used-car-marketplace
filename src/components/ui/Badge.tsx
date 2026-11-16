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
    primary: "bg-teal-50 text-teal-900 border-teal-200/80",
    warning: "bg-amber-50 text-amber-900 border-amber-200/80",
    danger: "bg-red-50 text-red-800 border-red-200/80",
    muted: "bg-gray-100 text-gray-700 border-gray-200",
    accent: "bg-orange-50 text-orange-900 border-orange-200/80",
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
