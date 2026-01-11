# Quick Start Guide

Get up and running with Miahui in 5 minutes!

## Step 1: Install Miahui

```bash
npm install -g miahui
```

Or use with npx (no installation needed):

```bash
npx miahui init
```

## Step 2: Initialize in Your Project

Navigate to your React project and run:

```bash
miahui init
```

You'll be prompted to:
1. Choose your styling approach (Tailwind CSS, CSS, or SCSS)
2. Configure TypeScript/JavaScript
3. Set up directory paths

## Step 3: Add Your First Component

```bash
miahui add button
```

This will:
- Copy the button component to your project
- Transform it based on your style preference
- Set up necessary utilities
- Inject CSS variables (if using Tailwind)

## Step 4: Use the Component

```tsx
import { Button } from "@/components/button"

function App() {
  return (
    <Button variant="default" size="lg">
      Click me!
    </Button>
  )
}
```

## Step 5: Add More Components

```bash
miahui add card
miahui add input
miahui add dialog
miahui add label
```

See all available components:

```bash
miahui list
```

## Styling Setup

### For Tailwind CSS

If you chose Tailwind CSS, make sure you have:

1. **Install dependencies:**
   ```bash
   npm install clsx tailwind-merge
   ```

2. **Configure Tailwind** (if not already done):
   ```js
   // tailwind.config.js
   module.exports = {
     content: [
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {
         // CSS variables are automatically injected
       },
     },
   }
   ```

3. **Import in your main CSS:**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

### For CSS/SCSS

If you chose CSS or SCSS:

1. **Import component styles** in your component or global stylesheet:
   ```tsx
   import { Button } from "@/components/button"
   import "@/components/button/button.css" // or .scss
   ```

2. **Customize CSS variables** in your global stylesheet:
   ```css
   :root {
     --miahui-primary: 222.2 47.4% 11.2%;
     --miahui-primary-foreground: 210 40% 98%;
     /* ... */
   }
   ```

## Example: Complete Form

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/card"
import { Input } from "@/components/input"
import { Label } from "@/components/label"
import { Button } from "@/components/button"

export function LoginForm() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
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

## Customization

Since components are copied to your project, you can modify them directly:

```tsx
// src/components/button/button.tsx
// Edit this file to customize the button
```

## Next Steps

- Read the [Usage Guide](USAGE.md) for detailed documentation
- Check out [Examples](EXAMPLES.md) for more code samples
- See [Contributing](CONTRIBUTING.md) to add your own components

## Troubleshooting

**Components not found?**
- Make sure you've run `miahui init` first
- Check that your `components.json` file exists

**Styles not applying?**
- **Tailwind**: Ensure Tailwind is configured and content paths are correct
- **CSS/SCSS**: Make sure you're importing the style files

**TypeScript errors?**
- Configure path aliases in `tsconfig.json`:
  ```json
  {
    "compilerOptions": {
      "paths": {
        "@/*": ["./src/*"]
      }
    }
  }
  ```

## Need Help?

- Check the [README](README.md) for overview
- Read the [Usage Guide](USAGE.md) for detailed docs
- See [Examples](EXAMPLES.md) for code samples

