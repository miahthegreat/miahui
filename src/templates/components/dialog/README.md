# Dialog

A modal dialog component for displaying content in an overlay.

## Usage

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/dialog"
import { Button } from "@/components/button"

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Components

- `Dialog` - Root dialog component
- `DialogTrigger` - Button that opens the dialog
- `DialogContent` - Main dialog content container
- `DialogHeader` - Header section
- `DialogTitle` - Dialog title
- `DialogDescription` - Dialog description text
- `DialogFooter` - Footer section with actions

## Note

For full functionality, you may need to integrate with a dialog management library like Radix UI or implement state management yourself.

