# Skeleton

A skeleton loading component for displaying placeholder content while data is loading.

## Usage

```tsx
import { Skeleton } from "@/components/skeleton"

// Basic usage
<Skeleton className="h-4 w-full" />

// Card skeleton
<div className="space-y-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>

// Avatar skeleton
<Skeleton className="h-10 w-10 rounded-full" />
```

## Props

All standard `div` HTML attributes are supported. Use `className` to control size and shape.

## Examples

```tsx
// Text line skeleton
<Skeleton className="h-4 w-full" />

// Circle skeleton (for avatars)
<Skeleton className="h-12 w-12 rounded-full" />

// Rectangle skeleton
<Skeleton className="h-32 w-full rounded-md" />
```

