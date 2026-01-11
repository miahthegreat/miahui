import * as React from "react"
import { cn } from "@/lib/utils"
import "./slider.css"

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
  min?: number
  max?: number
  step?: number
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, defaultValue, onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState<number[]>(defaultValue || [50])
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue
    const handleChange = (newValue: number[]) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    const percentage = ((currentValue[0] - min) / (max - min)) * 100

    return (
      <div className="miahui-slider">
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={currentValue[0]}
          onChange={(e) => handleChange([Number(e.target.value)])}
          className={cn("miahui-slider__input", className)}
          {...props}
        />
        <div
          className="miahui-slider__track"
          style={{ width: `${percentage}%` }}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }

