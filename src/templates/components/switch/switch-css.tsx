import * as React from "react"
import { cn } from "@/lib/utils"
import "./switch.css"

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked)
      onChange?.(e)
    }

    return (
      <label className={cn("miahui-switch", className)}>
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        <div className="miahui-switch-track">
          <div className="miahui-switch-thumb" />
        </div>
      </label>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }

