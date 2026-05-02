import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "yellow";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  asChild?: boolean;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-neon-pink text-primary-foreground hover:bg-neon-yellow hover:text-primary-foreground",
  secondary:
    "bg-neon-cyan text-primary-foreground hover:bg-neon-green hover:text-primary-foreground",
  yellow:
    "bg-neon-yellow text-primary-foreground hover:bg-neon-pink hover:text-foreground",
  ghost:
    "bg-card text-foreground hover:bg-muted",
};

export const PixelButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "pixel-border font-pixel text-xs uppercase px-5 py-3 transition-[transform,box-shadow,background-color] duration-100",
          "shadow-[6px_6px_0_0_var(--color-foreground)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[3px_3px_0_0_var(--color-foreground)]",
          variantClasses[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
PixelButton.displayName = "PixelButton";
