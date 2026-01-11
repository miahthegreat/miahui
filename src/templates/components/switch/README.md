# Switch

A toggle switch component.

## Usage

```tsx
import { Switch } from "@/components/switch"

function MyComponent() {
  const [enabled, setEnabled] = React.useState(false)

  return (
    <Switch
      checked={enabled}
      onCheckedChange={setEnabled}
    />
  )
}
```

## Props

- `checked` - Whether the switch is checked
- `onCheckedChange` - Callback when checked state changes
- Extends all standard input attributes

