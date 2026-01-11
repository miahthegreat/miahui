# Checkbox

A checkbox input component.

## Usage

```tsx
import { Checkbox } from "@/components/checkbox"

function MyComponent() {
  const [checked, setChecked] = React.useState(false)

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <label htmlFor="terms">Accept terms and conditions</label>
    </div>
  )
}
```

## Props

- `checked` - Whether the checkbox is checked
- `onCheckedChange` - Callback when checked state changes
- Extends all standard input attributes

