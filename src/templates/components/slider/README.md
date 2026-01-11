# Slider

A range slider component for selecting a value within a range.

## Usage

```tsx
import { Slider } from "@/components/slider"

// Basic usage
<Slider defaultValue={[50]} />

// Controlled
const [value, setValue] = useState([50])
<Slider value={value} onValueChange={setValue} min={0} max={100} step={1} />

// With label
<div className="space-y-2">
  <Label>Volume: {value[0]}</Label>
  <Slider value={value} onValueChange={setValue} />
</div>
```

## Props

- `value` - Controlled value (array)
- `defaultValue` - Uncontrolled default value (array)
- `onValueChange` - Callback when value changes
- `min` - Minimum value (default: 0)
- `max` - Maximum value (default: 100)
- `step` - Step size (default: 1)

