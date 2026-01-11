import * as React from "react"
import { cn } from "@/lib/utils"

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
      <div className="relative flex w-full touch-none select-none items-center">
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={currentValue[0]}
          onChange={(e) => handleChange([Number(e.target.value)])}
          className={cn(
            "peer relative h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary",
            className
          )}
          {...props}
        />
        <div
          className="pointer-events-none absolute h-2 rounded-full bg-primary"
          style={{ width: `${percentage}%` }}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }

