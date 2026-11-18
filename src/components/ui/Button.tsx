import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variantStyles = {
      primary:
        "bg-primary text-white hover:bg-blue-700 active:scale-[0.98] shadow-sm shadow-blue-500/20",
      secondary:
        "bg-white text-ink hover:bg-slate-100 border border-slate-200/90 shadow-xs",
      outline:
        "border border-primary text-primary hover:bg-primary/5 active:bg-primary/10",
      ghost:
        "text-muted hover:text-ink hover:bg-slate-100",
      danger:
        "bg-danger text-white hover:bg-red-700 active:scale-[0.98]",
    };

    const sizeStyles = {
      sm: "h-9 px-3 text-xs gap-1.5",
      md: "h-11 px-5 text-sm gap-2",
      lg: "h-13 px-7 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
