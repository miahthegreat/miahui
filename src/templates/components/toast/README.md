# Toast

A toast notification component for displaying temporary messages.

## Usage

```tsx
import { Toast, ToastTitle, ToastDescription, ToastClose } from "@/components/toast"

const [showToast, setShowToast] = useState(false)

{showToast && (
  <Toast variant="default" onClose={() => setShowToast(false)}>
    <ToastTitle>Success</ToastTitle>
    <ToastDescription>Your changes have been saved.</ToastDescription>
    <ToastClose onClose={() => setShowToast(false)} />
  </Toast>
)}

// Variants
<Toast variant="default">...</Toast>
<Toast variant="destructive">...</Toast>
<Toast variant="success">...</Toast>
```

## Components

- `Toast` - Root toast component
- `ToastTitle` - Toast title
- `ToastDescription` - Toast description
- `ToastClose` - Close button

## Props

- `variant` - "default" | "destructive" | "success"
- `duration` - Auto-close duration in ms (0 to disable)
- `onClose` - Callback when toast closes

