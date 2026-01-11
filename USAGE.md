# Miahui Usage Guide

## Installation

```bash
npm install -g miahui
```

Or use with npx:

```bash
npx miahui init
```

## Getting Started

### 1. Initialize Miahui

Run the initialization command in your project:

```bash
miahui init
```

This will:
- Create a `components.json` configuration file
- Ask you to choose your styling approach (Tailwind CSS, CSS, or SCSS)
- Set up directory aliases
- Create necessary directories

### 2. Add Components

Add components to your project:

```bash
miahui add button
miahui add card
miahui add input
```

### 3. Use Components

Import and use components in your code:

```tsx
import { Button } from "@/components/button"

function App() {
  return (
    <Button variant="default" size="lg">
      Click me
    </Button>
  )
}
```

## Styling Approaches

### Tailwind CSS (Recommended)

When you choose Tailwind CSS:
- Components use Tailwind utility classes
- No separate CSS files are copied
- Requires Tailwind CSS to be configured in your project
- Uses `clsx` and `tailwind-merge` for className management

**Setup:**
```bash
npm install clsx tailwind-merge
```

### Vanilla CSS

When you choose CSS:
- Components come with standalone CSS files
- CSS files use CSS custom properties (variables) for theming
- Import CSS files in your components or global stylesheet

**Example:**
```tsx
import { Button } from "@/components/button"
import "@/components/button/button.css"
```

### SCSS

When you choose SCSS:
- Components come with SCSS files
- Supports SCSS features like variables, mixins, and nesting
- Import SCSS files in your components or global stylesheet

**Example:**
```tsx
import { Button } from "@/components/button"
import "@/components/button/button.scss"
```

## Configuration

The `components.json` file controls how Miahui works:

```json
{
  "style": "tailwind",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "css": {
    "outputDir": "src/styles/components",
    "scss": false
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### Configuration Options

- **style**: `"tailwind" | "css" | "scss"` - Your preferred styling approach
- **rsc**: `boolean` - Whether to use React Server Components
- **tsx**: `boolean` - Whether to use TypeScript
- **aliases**: Path aliases for components and utils
- **tailwind**: Tailwind-specific configuration (only when style is "tailwind")
- **css**: CSS/SCSS-specific configuration (only when style is "css" or "scss")

## Customization

### Modifying Components

Since components are copied to your project (not installed as dependencies), you can freely modify them:

```tsx
// src/components/button/button.tsx
// Modify this file directly to customize the button
```

### Theming

#### Tailwind CSS

Add CSS variables to your global CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... more variables */
  }
}
```

#### CSS/SCSS

CSS variables are defined in the component CSS files. Override them in your global stylesheet:

```css
:root {
  --miahui-primary: 222.2 47.4% 11.2%;
  --miahui-primary-foreground: 210 40% 98%;
  /* ... */
}
```

## Available Components

- **Button** - Versatile button with multiple variants
- **Card** - Container component with header, content, and footer
- **Input** - Styled input component
- **Dialog** - Modal dialog component
- **Label** - Form label component
- **Badge** - Status indicator
- **Tabs** - Tabbed interface
- **Separator** - Visual separator
- **Avatar** - User profile picture
- **Alert** - Alert/notification
- **Switch** - Toggle switch
- **Checkbox** - Checkbox input

Run `miahui list` to see all available components, or `miahui list --search <term>` to search.

## Troubleshooting

### Components not found

Make sure you've run `miahui init` first.

### Styles not applying

- **Tailwind**: Ensure Tailwind CSS is properly configured and your content paths include your components directory
- **CSS/SCSS**: Make sure you're importing the CSS/SCSS files in your components or global stylesheet

### TypeScript errors

Ensure your `tsconfig.json` includes path aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Advanced Usage

### Creating Custom Components

You can create your own components following the same pattern:

1. Create a component directory
2. Add component files (`.tsx`, `.css`/`.scss` if needed)
3. Export from `index.ts`

### Extending Components

Extend existing components:

```tsx
import { Button, ButtonProps } from "@/components/button"

interface ExtendedButtonProps extends ButtonProps {
  icon?: React.ReactNode
}

export function ExtendedButton({ icon, children, ...props }: ExtendedButtonProps) {
  return (
    <Button {...props}>
      {icon && <span>{icon}</span>}
      {children}
    </Button>
  )
}
```

