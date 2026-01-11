import * as React from "react"
import { cn } from "@/lib/utils"
import "./tooltip.css"

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
        className={cn("miahui-tooltip", className)}
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
              "miahui-tooltip-content",
              `miahui-tooltip-content--${side}-${align}`
            )}
          >
            {content}
            <div className="miahui-tooltip-arrow" />
          </div>
        )}
      </div>
    )
  }
)
Tooltip.displayName = "Tooltip"

export { Tooltip }

