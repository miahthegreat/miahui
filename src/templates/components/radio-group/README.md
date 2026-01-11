# Radio Group

A radio group component for selecting a single option from a list.

## Usage

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/radio-group"
import { Label } from "@/components/label"

<RadioGroup defaultValue="option1" onValueChange={(value) => console.log(value)}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="option1" />
    <Label htmlFor="option1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="option2" />
    <Label htmlFor="option2">Option 2</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option3" id="option3" />
    <Label htmlFor="option3">Option 3</Label>
  </div>
</RadioGroup>
```

## Props

- `value` - Controlled value
- `defaultValue` - Uncontrolled default value
- `onValueChange` - Callback when value changes

