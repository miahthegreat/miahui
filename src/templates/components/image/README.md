# Image

An optimized image component that automatically uses Next.js Image when available, otherwise falls back to a regular `<img>` tag.

## Usage

```tsx
import { Image } from "@/components/image"

// Basic usage
<Image 
  src="/image.jpg" 
  alt="Description" 
  width={500} 
  height={300} 
/>

// With Next.js (automatically detected)
<Image 
  src="/image.jpg" 
  alt="Description" 
  width={500} 
  height={300}
  priority
  quality={90}
/>

// Fallback to regular img (when Next.js not available)
<Image 
  src="/image.jpg" 
  alt="Description" 
  width={500} 
  height={300}
/>
```

## Props

- `src` - Image source URL (required)
- `alt` - Alt text for accessibility (required)
- `width` - Image width
- `height` - Image height
- `fill` - Fill parent container (Next.js only)
- `priority` - Load with priority (Next.js only)
- `quality` - Image quality 1-100 (Next.js only)
- `placeholder` - Placeholder type: "blur" | "empty" (Next.js only)
- `blurDataURL` - Base64 encoded blur placeholder (Next.js only)
- All standard `<img>` HTML attributes

## Features

- **Automatic Detection**: Automatically detects if Next.js is available
- **Next.js Optimized**: Uses Next.js Image component when available for automatic optimization
- **Fallback Support**: Falls back to regular `<img>` tag when Next.js is not available
- **Type Safe**: Full TypeScript support with proper types

## Note

The component will automatically use Next.js Image if:
- Next.js is installed in your project
- The component is used in a Next.js environment

Otherwise, it will use a standard `<img>` tag with the same props.

