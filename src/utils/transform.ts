import { MiahuiConfig } from '../types/config.js';

export function transformComponent(
  content: string,
  config: MiahuiConfig,
  componentName: string
): string {
  let transformed = content;

  // Replace aliases
  transformed = transformed.replace(
    /@\/components/g,
    config.aliases.components
  );
  transformed = transformed.replace(
    /@\/lib\/utils/g,
    config.aliases.utils
  );

  // Transform based on style type
  if (config.style === 'tailwind') {
    transformed = transformTailwind(transformed, config);
  } else if (config.style === 'css' || config.style === 'scss') {
    transformed = transformCSS(transformed, config, componentName);
  }

  return transformed;
}

function transformTailwind(content: string, config: MiahuiConfig): string {
  // For Tailwind, ensure cn utility is available
  // The template already uses cn, so we just need to make sure it's properly imported
  return content;
}

function transformCSS(
  content: string,
  config: MiahuiConfig,
  componentName: string
): string {
  const baseClassName = `miahui-${componentName.toLowerCase()}`;
  let transformed = content;
  
  // For CSS/SCSS mode:
  // 1. Keep cn() utility (it's simple for CSS mode)
  // 2. Components should use CSS classes instead of Tailwind
  // 3. Import the CSS/SCSS file
  
  // Add style import if not present
  const styleExt = config.style === 'scss' ? 'scss' : 'css';
  const styleImport = `import "./${componentName}.${styleExt}"`;
  
  // Check if style import already exists
  if (!transformed.includes(`import "./${componentName}`) && !transformed.includes(`import './${componentName}`)) {
    // Add import after other imports
    const importRegex = /(import\s+.*?from\s+["'][^"']+["'];?\s*\n)/g;
    const imports = transformed.match(importRegex);
    if (imports && imports.length > 0) {
      // Add after last import
      const lastImportIndex = transformed.lastIndexOf(imports[imports.length - 1]);
      const insertIndex = lastImportIndex + imports[imports.length - 1].length;
      transformed = transformed.slice(0, insertIndex) + styleImport + '\n' + transformed.slice(insertIndex);
    } else {
      // Add at the beginning
      transformed = styleImport + '\n' + transformed;
    }
  }

  // Transform Tailwind classes to CSS classes in className
  // This is a simplified transformation - complex cases may need manual adjustment
  transformed = transformed.replace(
    /className=\{cn\(([^)]+)\)\}/g,
    (match, args) => {
      // Extract variant and size if present
      const variantMatch = content.match(/variant\s*[=:]\s*["'](\w+)["']/);
      const sizeMatch = content.match(/size\s*[=:]\s*["'](\w+)["']/);
      
      const classes = [baseClassName];
      if (variantMatch) {
        classes.push(`${baseClassName}--${variantMatch[1]}`);
      }
      if (sizeMatch && sizeMatch[1] !== 'default') {
        classes.push(`${baseClassName}--${sizeMatch[1]}`);
      } else if (sizeMatch && sizeMatch[1] === 'default') {
        classes.push(`${baseClassName}--default-size`);
      }
      classes.push('className');
      
      return `className={cn("${classes.join(' ')}")}`;
    }
  );

  return transformed;
}

export function extractStyles(
  content: string,
  config: MiahuiConfig
): string | null {
  if (config.style === 'tailwind') {
    return null; // Tailwind doesn't need separate style files
  }

  // Extract style block if it exists in the template
  // This would parse JSX style blocks or extract from a separate style template
  return null;
}

