# Miahui

A highly customizable UI component library with support for CSS, SCSS, and Tailwind CSS.

## Features

- 🎨 **Multiple Styling Options**: Choose between vanilla CSS, SCSS, or Tailwind CSS
- ⚡ **Highly Optimized**: Lightweight and performant components
- 🔧 **Fully Customizable**: Easy to modify and extend
- 📦 **Copy, Don't Install**: Components are copied to your project, not installed as dependencies
- 🚀 **TypeScript First**: Built with TypeScript for better DX

## Installation

```bash
npm install -g miahui
```

## Getting Started

### Initialize Miahui in your project

```bash
miahui init
```

This will:
- Create a `components.json` configuration file
- Set up the necessary directory structure
- Let you choose your preferred styling approach (CSS/SCSS/Tailwind)

### Add Components

```bash
miahui add button
miahui add card
miahui add input
```

### Update Components

```bash
miahui update          # Update all components
miahui update button   # Update specific component
```

### List Components

```bash
miahui list              # List all components
miahui list --search tab # Search components
```

## Configuration

After initialization, you'll have a `components.json` file:

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

## Styling Options

### Tailwind CSS (Default)
Components use Tailwind utility classes with CSS variables for theming.

**Required dependencies:**
```bash
npm install clsx tailwind-merge
```

### Vanilla CSS
Components come with standalone CSS files that can be imported directly.
No additional dependencies required.

### SCSS
Components come with SCSS files for more advanced styling capabilities.
Requires a SCSS compiler (usually included in build tools like Vite, Next.js, etc.).

## Components

- **Button** - Versatile button with multiple variants and sizes
- **Card** - Container component with header, content, and footer
- **Input** - Styled input component with focus states
- **Dialog** - Modal dialog component
- **Label** - Form label component
- **Badge** - Small status indicator component
- **Tabs** - Tabbed interface component
- **Separator** - Visual separator component
- **Avatar** - User profile picture component with fallback
- **Alert** - Alert/notification component
- **Switch** - Toggle switch component
- **Checkbox** - Checkbox input component
- **Tooltip** - Tooltip component with positioning
- **Accordion** - Collapsible content sections
- **Popover** - Floating popover panel

Run `miahui list` to see all available components, or `miahui list --search <term>` to search.

## Comparison with shadcn/ui

Miahui is inspired by shadcn/ui but offers several advantages:

- **Multiple Styling Options**: Choose between Tailwind CSS, vanilla CSS, or SCSS
- **Better Optimization**: Components are optimized for each styling approach
- **More Flexible**: Easier to customize and extend
- **No Runtime Dependencies**: Components are copied, not installed
- **Type-Safe**: Full TypeScript support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

