# Demo Site Setup

## What's Been Created

A complete demo/playground site for showcasing Miahui components:

### Location
`../miahui-demo/`

### Tech Stack
- **Vite** - Fast build tool
- **React + TypeScript** - UI framework
- **Tailwind CSS** - Styling (matches Miahui's Tailwind mode)

### Features
- ✅ Interactive component showcase
- ✅ Dark mode toggle
- ✅ Responsive navigation
- ✅ Hero section with features
- ✅ Component demos for 11 components
- ✅ Modern, clean UI

## Running the Demo

```bash
cd miahui-demo
npm install
npm run dev
```

The site will be available at `http://localhost:5173`

## Components Showcased

1. Button - All variants and sizes
2. Card - With header, content, footer
3. Input - Different input types
4. Badge - All variants
5. Alert - Default and destructive
6. Tabs - Interactive tabs
7. Accordion - Collapsible sections
8. Tooltip - Hover tooltips
9. Avatar - With fallback
10. Switch - Toggle switch
11. Checkbox - Checkbox input

## Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
cd miahui-demo
vercel
```

### Netlify
1. Build: `npm run build`
2. Drag `dist` folder to Netlify
3. Or connect GitHub repo

### GitHub Pages
1. Update `vite.config.ts` with base path
2. Build: `npm run build`
3. Deploy `dist` to gh-pages branch

## Next Steps

1. **Add More Components**: Add demos for remaining components (Dialog, Label, Separator, Popover)
2. **Code Examples**: Show code snippets for each component
3. **Copy to Clipboard**: Add copy button for code examples
4. **Search**: Add component search functionality
5. **Theme Customization**: Show theme customization options

## Customization

- Update colors in `src/index.css` CSS variables
- Modify component demos in `src/components/demos/`
- Add new sections in `src/App.tsx`

