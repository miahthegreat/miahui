# Sheet

A slide-over panel component (drawer) that appears from the side of the screen.

## Usage

```tsx
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/sheet"
import { Button } from "@/components/button"

const [open, setOpen] = useState(false)

<Sheet open={open} onOpenChange={setOpen} side="right">
  <SheetTrigger asChild>
    <Button>Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit Profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here.
      </SheetDescription>
    </SheetHeader>
    <div className="py-4">
      Content goes here
    </div>
    <SheetFooter>
      <Button onClick={() => setOpen(false)}>Save</Button>
    </SheetFooter>
    <SheetClose onClose={() => setOpen(false)} />
  </SheetContent>
</Sheet>
```

## Components

- `Sheet` - Root component
- `SheetTrigger` - Trigger button
- `SheetContent` - Main content container
- `SheetHeader` - Header section
- `SheetTitle` - Sheet title
- `SheetDescription` - Sheet description
- `SheetFooter` - Footer section
- `SheetClose` - Close button

## Props

- `side` - Position: "top" | "right" | "bottom" | "left" (default: "right")
- `open` - Controlled open state
- `onOpenChange` - Callback when open state changes

