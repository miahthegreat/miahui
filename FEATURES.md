# Miahui Features

## Core Features

### 🎨 Multiple Styling Options
- **Tailwind CSS** - Utility-first CSS framework with automatic variable injection
- **Vanilla CSS** - Standalone CSS files with CSS custom properties
- **SCSS** - Advanced styling with SCSS features (variables, mixins, nesting)

### ⚡ Optimized Components
- Lightweight and performant
- Tree-shakeable
- No runtime dependencies (except React)
- Minimal bundle size impact

### 🔧 Fully Customizable
- Components are copied to your project (not installed)
- Modify components directly
- Easy to extend and compose
- No vendor lock-in

### 📦 Copy-Based Installation
- Components become part of your codebase
- Full control over component code
- Easy to version control
- No dependency conflicts

### 🚀 TypeScript First
- Full TypeScript support
- Type-safe props
- Excellent IDE autocomplete
- Type definitions included

## CLI Features

### Commands

#### `miahui init`
Initialize Miahui in your project with interactive setup:
- Choose styling approach
- Configure TypeScript/JavaScript
- Set up directory paths
- Configure style-specific options

#### `miahui add <component>`
Add a component to your project:
- Automatically transforms based on your style preference
- Sets up necessary utilities
- Injects CSS variables (Tailwind mode)
- Creates proper file structure

#### `miahui update [component]`
Update components to latest version:
- Update all components: `miahui update`
- Update specific component: `miahui update button`
- Preserves your customizations
- Smart file handling

#### `miahui list [--search <term>]`
List available components:
- See all components: `miahui list`
- Search components: `miahui list --search tab`
- Shows descriptions
- Easy discovery

## Component Features

### Consistent API
- Similar prop patterns across components
- Predictable naming conventions
- Easy to learn and use

### Accessibility
- ARIA attributes where appropriate
- Keyboard navigation support
- Screen reader friendly
- Focus management

### Variants & Sizes
- Multiple visual variants
- Size options (sm, default, lg)
- Easy to customize
- CSS variable based theming

### Composition
- Composable components
- Flexible prop spreading
- Easy to extend
- Works with other libraries

## Developer Experience

### Smart Transformations
- Automatic style file imports
- Class name mapping
- Variant handling
- Path alias resolution

### Error Handling
- Clear error messages
- Helpful warnings
- Validation checks
- Graceful failures

### Documentation
- Component README files
- Usage examples
- API documentation
- Quick start guides

## Styling Features

### Tailwind CSS Mode
- Automatic CSS variable injection
- Tailwind utility classes
- Dark mode support
- Customizable theme

### CSS/SCSS Mode
- CSS custom properties
- SCSS features (variables, mixins)
- Standalone stylesheets
- Easy theming

### Theming
- CSS variable based
- Light/dark mode support
- Easy to customize
- Consistent color system

## What Makes Miahui Different?

1. **Style Flexibility** - Choose your preferred styling approach
2. **No Runtime** - Components are just React components
3. **Full Control** - Modify components directly
4. **Optimized** - Built for performance
5. **Type-Safe** - Full TypeScript support
6. **Modern** - Uses latest React patterns
7. **Accessible** - Built with a11y in mind
8. **Composable** - Easy to extend and combine

