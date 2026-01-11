# Accordion

A vertically stacked set of interactive headings that each reveal a section of content.

## Usage

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that matches the other components.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

## Props

- `type` - "single" | "multiple" (default: "single")
- `defaultValue` - Initial value(s)
- `collapsible` - Whether items can be collapsed (single mode only)

## Components

- `Accordion` - Root component
- `AccordionItem` - Individual accordion item
- `AccordionTrigger` - Clickable header
- `AccordionContent` - Collapsible content

