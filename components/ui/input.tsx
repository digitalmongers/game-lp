import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-none border border-white/15 bg-white/[0.06] px-4 py-2.5 text-base text-white placeholder:text-[#9f9f9f] transition-colors focus-visible:outline-none focus-visible:border-[#8f00ff] focus-visible:ring-1 focus-visible:ring-[#8f00ff] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

