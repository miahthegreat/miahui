export const TAILWIND_CSS_VARIABLES = `
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;

import { existsSync, readFileSync, writeFileSync } from 'fs-extra';

export function injectTailwindVariables(cssFilePath: string): boolean {
  if (!existsSync(cssFilePath)) {
    return false;
  }

  const content = readFileSync(cssFilePath, 'utf-8');
  
  // Check if variables already exist
  if (content.includes('--background:') && content.includes('@layer base')) {
    return false; // Already has variables
  }

  // Inject variables after @tailwind directives or at the beginning
  const tailwindDirectives = /@tailwind\s+(base|components|utilities);?\s*\n/g;
  const hasTailwind = tailwindDirectives.test(content);
  
  let newContent = content;
  
  if (hasTailwind) {
    // Insert after @tailwind base
    newContent = content.replace(
      /(@tailwind\s+base;?\s*\n)/,
      `$1${TAILWIND_CSS_VARIABLES}\n`
    );
  } else {
    // Add at the beginning
    newContent = `${TAILWIND_CSS_VARIABLES}\n\n${content}`;
  }

  writeFileSync(cssFilePath, newContent, 'utf-8');
  return true;
}

