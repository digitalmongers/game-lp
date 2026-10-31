import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8f00ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101010] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gruxz-cta text-white font-sans font-semibold rounded-none hover:brightness-110 active:scale-[0.98]",
        outline:
          "border-2 border-inset border-[#8f00ff] bg-transparent text-white font-heading font-bold rounded-none hover:bg-[#8f00ff]/15 active:scale-[0.98]",
        play:
          "bg-gruxz-play-btn text-white rounded-[10px] hover:brightness-110 hover:scale-[1.03] active:scale-[0.98]",
        ghost:
          "bg-transparent text-white hover:bg-white/10 rounded-none",
        link:
          "bg-transparent text-white font-heading font-bold underline-offset-4 hover:text-[#ba62ff]",
      },
      size: {
        default: "h-[49px] px-5 py-2.5 text-[20px] leading-[27.24px]",
        compact: "h-[45px] px-[21px] py-[9px] text-[20px] leading-[27.24px]",
        sm: "h-10 px-4 text-base",
        lg: "h-12 px-8 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

