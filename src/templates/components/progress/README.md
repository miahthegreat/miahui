# Progress

A progress bar component for displaying completion status.

## Usage

```tsx
import { Progress } from "@/components/progress"

// Basic usage
<Progress value={50} />

// With custom max value
<Progress value={75} max={100} />

// Animated example
const [progress, setProgress] = useState(0)

useEffect(() => {
  const timer = setInterval(() => {
    setProgress((prev) => (prev >= 100 ? 0 : prev + 10))
  }, 500)
  return () => clearInterval(timer)
}, [])

<Progress value={progress} />
```

## Props

- `value` - Current progress value (0-100 by default)
- `max` - Maximum value (default: 100)
- All standard `div` HTML attributes

## Accessibility

The component includes proper ARIA attributes for screen readers.

