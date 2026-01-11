# Tabs

A set of layered sections of content—known as tab panels—that are displayed one at a time.

## Usage

```tsx
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/tabs"

<Tabs defaultValue="account" className="w-full">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Make changes to your account here.
  </TabsContent>
  <TabsContent value="password">
    Change your password here.
  </TabsContent>
</Tabs>
```

## Components

- `Tabs` - Root tabs component
- `TabsList` - Container for tab triggers
- `TabsTrigger` - Individual tab button
- `TabsContent` - Content panel for each tab

## Note

For full functionality, you may need to integrate with a tabs management library or implement state management yourself (e.g., using React state or a library like Radix UI).

