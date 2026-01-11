import * as React from "react"
import { cn } from "@/lib/utils"

export interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple"
  defaultValue?: string | string[]
  collapsible?: boolean
}

const AccordionContext = React.createContext<{
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  type?: "single" | "multiple"
}>({})

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, type = "single", defaultValue, collapsible = false, children, ...props }, ref) => {
    const [value, setValue] = React.useState<string | string[]>(defaultValue || (type === "multiple" ? [] : ""))

    const handleValueChange = (itemValue: string) => {
      if (type === "single") {
        setValue(value === itemValue && collapsible ? "" : itemValue)
      } else {
        const currentValue = (value as string[]) || []
        setValue(
          currentValue.includes(itemValue)
            ? currentValue.filter(v => v !== itemValue)
            : [...currentValue, itemValue]
        )
      }
    }

    return (
      <AccordionContext.Provider value={{ value, onValueChange: handleValueChange, type }}>
        <div
          ref={ref}
          className={cn("w-full", className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string
  }
>(({ className, value, children, ...props }, ref) => {
  const { value: contextValue } = React.useContext(AccordionContext)
  const isOpen = Array.isArray(contextValue)
    ? contextValue.includes(value)
    : contextValue === value

  return (
    <div
      ref={ref}
      className={cn("border-b", className)}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {children}
    </div>
  )
})
AccordionItem.displayName = "AccordionItem"

const AccordionItemContext = React.createContext<{ value: string }>({ value: "" })

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { onValueChange } = React.useContext(AccordionContext)
  const item = React.useContext(AccordionItemContext)
  
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      onClick={() => onValueChange?.(item.value)}
      {...props}
    >
      {children}
      <svg
        className="h-4 w-4 shrink-0 transition-transform duration-200"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { value: contextValue } = React.useContext(AccordionContext)
  const item = React.useContext(AccordionItemContext)
  const isOpen = Array.isArray(contextValue)
    ? contextValue.includes(item.value)
    : contextValue === item.value

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
})
AccordionContent.displayName = "AccordionContent"

// Wrap AccordionItem to provide context
const AccordionItemWithContext = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof AccordionItem>
>((props, ref) => (
  <AccordionItemContext.Provider value={{ value: props.value }}>
    <AccordionItem ref={ref} {...props} />
  </AccordionItemContext.Provider>
))

export { Accordion, AccordionItemWithContext as AccordionItem, AccordionTrigger, AccordionContent }

