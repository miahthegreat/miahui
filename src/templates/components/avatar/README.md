# Avatar

An avatar component for displaying user profile pictures or initials.

## Usage

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/avatar"

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

## Components

- `Avatar` - Root avatar container
- `AvatarImage` - The image element
- `AvatarFallback` - Fallback content when image fails to load

