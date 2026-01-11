# Dropdown Menu

A dropdown menu component for displaying a list of actions.

## Usage

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/dropdown-menu"
import { Button } from "@/components/button"

<DropdownMenu
  trigger={<Button>Open Menu</Button>}
>
  <DropdownMenuContent>
    <DropdownMenuItem onSelect={() => console.log('Edit')}>
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem onSelect={() => console.log('Duplicate')}>
      Duplicate
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onSelect={() => console.log('Delete')}>
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Components

- `DropdownMenu` - Root component
- `DropdownMenuTrigger` - Trigger element wrapper
- `DropdownMenuContent` - Menu container
- `DropdownMenuItem` - Individual menu item
- `DropdownMenuSeparator` - Visual separator

## Props

- `align` - Alignment: "start" | "center" | "end" (default: "start")
- `side` - Position: "top" | "right" | "bottom" | "left" (default: "bottom")
- `onSelect` - Callback when item is selected

