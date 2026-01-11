# Popover

A popover component that displays content in a floating panel.

## Usage

```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@/components/popover"
import { Button } from "@/components/button"

<Popover>
  <PopoverTrigger asChild>
    <Button>Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="space-y-2">
      <h4 className="font-medium leading-none">Dimensions</h4>
      <p className="text-sm text-muted-foreground">
        Set the dimensions for the layer.
      </p>
    </div>
  </PopoverContent>
</Popover>
```

## Components

- `Popover` - Root component
- `PopoverTrigger` - Element that triggers the popover
- `PopoverContent` - Content displayed in the popover

## Props

- `open` - Controlled open state
- `onOpenChange` - Callback when open state changes
- `trigger` - Trigger element

