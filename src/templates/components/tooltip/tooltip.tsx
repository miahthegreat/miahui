import * as React from "react"
import { cn } from "@/lib/utils"

export interface TooltipProps
  extends React.HTMLAttributes<HTMLDivElement> {
  content: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, children, content, side = "top", align = "center", ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false)

    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        {...props}
      >
        {children}
        {isVisible && (
          <div
            role="tooltip"
            className={cn(
              "absolute z-50 rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
              {
                "bottom-full left-1/2 -translate-x-1/2 mb-2": side === "top" && align === "center",
                "bottom-full left-0 mb-2": side === "top" && align === "start",
                "bottom-full right-0 mb-2": side === "top" && align === "end",
                "left-full top-1/2 -translate-y-1/2 ml-2": side === "right" && align === "center",
                "left-full top-0 ml-2": side === "right" && align === "start",
                "left-full bottom-0 ml-2": side === "right" && align === "end",
                "top-full left-1/2 -translate-x-1/2 mt-2": side === "bottom" && align === "center",
                "top-full left-0 mt-2": side === "bottom" && align === "start",
                "top-full right-0 mt-2": side === "bottom" && align === "end",
                "right-full top-1/2 -translate-y-1/2 mr-2": side === "left" && align === "center",
                "right-full top-0 mr-2": side === "left" && align === "start",
                "right-full bottom-0 mr-2": side === "left" && align === "end",
              }
            )}
          >
            {content}
            <div
              className={cn(
                "absolute w-2 h-2 rotate-45 bg-popover border",
                {
                  "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-t-0 border-l-0": side === "top",
                  "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 border-t-0 border-r-0": side === "right",
                  "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border-b-0 border-l-0": side === "bottom",
                  "right-0 top-1/2 -translate-y-1/2 translate-x-1/2 border-b-0 border-r-0": side === "left",
                }
              )}
            />
          </div>
        )}
      </div>
    )
  }
)
Tooltip.displayName = "Tooltip"

export { Tooltip }

