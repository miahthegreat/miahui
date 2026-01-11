# Breadcrumb

A breadcrumb navigation component for showing the current page's location in a hierarchy.

## Usage

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Components</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Components

- `Breadcrumb` - Root navigation element
- `BreadcrumbList` - Ordered list container
- `BreadcrumbItem` - Individual breadcrumb item
- `BreadcrumbLink` - Link component
- `BreadcrumbPage` - Current page indicator
- `BreadcrumbSeparator` - Separator between items
- `BreadcrumbEllipsis` - Ellipsis for truncated items

