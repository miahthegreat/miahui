# Miahui Examples

## Basic Usage

### Button Component

```tsx
import { Button } from "@/components/button"

// Default button
<Button>Click me</Button>

// Variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🚀</Button>

// With custom className
<Button className="my-custom-class">Custom</Button>
```

### Card Component

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/card"
import { Button } from "@/components/button"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>This is the card content area.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Input Component

```tsx
import { Input } from "@/components/input"

<Input type="text" placeholder="Enter text..." />
<Input type="email" placeholder="Email address" />
<Input type="password" placeholder="Password" />
<Input disabled placeholder="Disabled input" />
```

## Form Example

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/card"
import { Input } from "@/components/input"
import { Button } from "@/components/button"

function LoginForm() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <label htmlFor="email">Email</label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Sign In</Button>
      </CardFooter>
    </Card>
  )
}
```

## Styling Examples

### Tailwind CSS Mode

Components automatically use Tailwind classes. Customize via className:

```tsx
<Button className="bg-blue-500 hover:bg-blue-600">
  Custom Styled
</Button>
```

### CSS/SCSS Mode

Import the stylesheet and use CSS variables:

```tsx
import { Button } from "@/components/button"
import "@/components/button/button.css" // or .scss

// CSS variables can be overridden:
// :root {
//   --miahui-primary: 220 90% 56%;
// }
```

## Advanced Examples

### Composing Components

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card"
import { Button } from "@/components/button"

function ProductCard({ product }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{product.description}</p>
        <div className="mt-4 flex gap-2">
          <Button variant="default">Add to Cart</Button>
          <Button variant="outline">View Details</Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

### Extending Components

```tsx
import { Button, ButtonProps } from "@/components/button"

interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode
  iconPosition?: "left" | "right"
}

export function IconButton({ 
  icon, 
  iconPosition = "left", 
  children, 
  ...props 
}: IconButtonProps) {
  return (
    <Button {...props}>
      {iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </Button>
  )
}
```

