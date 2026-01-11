# Select

A styled select dropdown component.

## Usage

```tsx
import { Select } from "@/components/select"

<Select>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</Select>

// With label
<div className="space-y-2">
  <Label htmlFor="country">Country</Label>
  <Select id="country">
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="ca">Canada</option>
  </Select>
</div>
```

## Props

All standard `<select>` HTML attributes are supported.

