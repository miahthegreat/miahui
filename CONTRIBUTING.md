# Contributing to Miahui

Thank you for your interest in contributing to Miahui! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/miahui.git`
3. Install dependencies: `npm install`
4. Build the project: `npm run build`

## Project Structure

```
miahui/
├── src/
│   ├── cli.ts              # CLI entry point
│   ├── commands/           # CLI commands (init, add, list)
│   ├── templates/          # Component templates
│   │   └── components/    # Individual component templates
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── dist/                  # Built output (generated)
└── package.json
```

## Adding a New Component

1. Create a new directory in `src/templates/components/` with your component name
2. Add the following files:
   - `component-name.tsx` - Main component file (Tailwind version)
   - `component-name-css.tsx` - CSS/SCSS version (optional, if different)
   - `component-name.css` - CSS styles
   - `component-name.scss` - SCSS styles (optional)
   - `index.ts` - Export file
   - `README.md` - Component documentation

3. Follow the existing component patterns:
   - Use TypeScript
   - Support both Tailwind and CSS/SCSS modes
   - Include proper TypeScript types
   - Use forwardRef for ref support
   - Export from index.ts

## Component Template Structure

### Tailwind Version

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  // Add your props
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("base-classes", className)}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

export { Component }
```

### CSS/SCSS Version

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"
import "./component-name.css" // or .scss

export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  // Add your props
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("miahui-component-name", className)}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

export { Component }
```

## Styling Guidelines

### CSS Variables

Use CSS custom properties for theming:

```css
.miahui-component {
  background-color: var(--miahui-background);
  color: var(--miahui-foreground);
  border: 1px solid var(--miahui-border);
}
```

### SCSS Features

When using SCSS, you can use:
- Variables
- Mixins
- Nesting
- Functions

But keep it simple and maintainable.

## Testing

Before submitting a PR:

1. Build the project: `npm run build`
2. Test the CLI locally: `npm link` (then use `miahui` in a test project)
3. Verify components work in both Tailwind and CSS/SCSS modes
4. Check TypeScript compilation: `npx tsc --noEmit`

## Submitting a Pull Request

1. Create a feature branch: `git checkout -b feature/component-name`
2. Make your changes
3. Commit with clear messages
4. Push to your fork
5. Open a Pull Request with:
   - Description of changes
   - Screenshots (if UI changes)
   - Testing notes

## Code Style

- Use TypeScript
- Follow existing code patterns
- Use meaningful variable names
- Add comments for complex logic
- Keep components focused and composable

## Questions?

Open an issue for questions or discussions about contributions.

