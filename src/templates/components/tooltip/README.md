# Tooltip

A tooltip component that appears on hover or focus.

## Usage

```tsx
import { Tooltip } from "@/components/tooltip"

<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>

<Tooltip content="Tooltip on the right" side="right">
  <Button>Hover me</Button>
</Tooltip>
```

## Props

- `content` - The tooltip content (required)
- `side` - Position: "top" | "right" | "bottom" | "left" (default: "top")
- `align` - Alignment: "start" | "center" | "end" (default: "center")

## Accessibility

- Uses `role="tooltip"` for screen readers
- Supports keyboard focus
- Properly manages focus/blur events

