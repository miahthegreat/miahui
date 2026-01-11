import * as React from "react"
import { cn } from "@/lib/utils"
import "./checkbox.css"

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked)
      onChange?.(e)
    }

    return (
      <input
        type="checkbox"
        className={cn("miahui-checkbox", className)}
        checked={checked}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }

