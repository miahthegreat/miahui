# Textarea

A styled textarea component for multi-line text input.

## Usage

```tsx
import { Textarea } from "@/components/textarea"

<Textarea placeholder="Enter your message..." />

// With label
<div className="space-y-2">
  <Label htmlFor="message">Message</Label>
  <Textarea 
    id="message" 
    placeholder="Enter your message..." 
    rows={4}
  />
</div>
```

## Props

All standard `<textarea>` HTML attributes are supported.

