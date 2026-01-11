# Alert

A component for displaying important messages to users.

## Usage

```tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/alert"

<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>
```

## Components

- `Alert` - Root alert component
- `AlertTitle` - Alert title/heading
- `AlertDescription` - Alert description text

## Variants

- `default` - Standard alert
- `destructive` - For errors or destructive actions

