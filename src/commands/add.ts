import fs from "fs-extra";
const { existsSync, readFileSync, writeFileSync, mkdirSync } = fs;
import { join, dirname } from 'path';
import { logger } from '../utils/logger.js';
import { getConfig } from '../utils/config.js';
import { getComponentsDir, resolvePath } from '../utils/paths.js';
import { transformComponent } from '../utils/transform.js';
import { validateConfig } from '../utils/validation.js';
import { glob } from 'glob';
import chalk from 'chalk';
import { tryInjectComponentImport } from '../utils/css-imports.js';

export async function add(componentName: string, options: { yes?: boolean }) {
  const cwd = process.cwd();
  const config = getConfig(cwd);

  if (!config) {
    logger.error('Miahui is not initialized. Run `miahui init` first.');
    process.exit(1);
  }

  // Validate config
  if (!validateConfig(config, cwd)) {
    logger.error('Invalid configuration. Please run `miahui init` again.');
    process.exit(1);
  }

  const componentsDir = getComponentsDir();
  const componentPath = join(componentsDir, componentName);

  if (!existsSync(componentPath)) {
    logger.error(`Component "${componentName}" not found.`);
    logger.info(`Run ${chalk.cyan('miahui list')} to see available components.`);
    process.exit(1);
  }

  logger.step(`Adding ${chalk.cyan(componentName)} component...`);

  // Find all files in component directory
  const files = await glob('**/*', {
    cwd: componentPath,
    dot: false,
    ignore: ['**/*.md'],
  });

  const targetDir = resolvePath(config.aliases.components, cwd);
  const componentTargetDir = join(targetDir, componentName);

  // Create target directory
  if (!existsSync(componentTargetDir)) {
    mkdirSync(componentTargetDir, { recursive: true });
  }

  // Copy and transform files
  for (const file of files) {
    const sourcePath = join(componentPath, file);
    
    // Skip style-specific component files that don't match our style
    if (file.includes('-css.') && config.style === 'tailwind') {
      continue;
    }
    if (file.includes('-css.') && config.style !== 'tailwind') {
      // Use CSS version, skip Tailwind version
      const tailwindVersion = file.replace('-css.', '.');
      if (files.includes(tailwindVersion)) {
        // We'll handle the main file separately
      }
    }

    const targetPath = join(componentTargetDir, file);

    // Skip files based on style preference
    if (config.style === 'tailwind') {
      // Skip CSS/SCSS files for Tailwind
      if (file.endsWith('.css') || file.endsWith('.scss')) {
        continue;
      }
      // Skip CSS-specific component files
      if (file.includes('-css.')) {
        continue;
      }
    } else if (config.style === 'css') {
      // Skip SCSS files for CSS
      if (file.endsWith('.scss')) {
        continue;
      }
      // Use CSS version if available, otherwise use main version
      if (file.includes('-css.')) {
        // Rename to remove -css suffix
        const newFile = file.replace('-css.', '.');
        const newTargetPath = join(componentTargetDir, newFile);
        let content = readFileSync(sourcePath, 'utf-8');
        content = transformComponent(content, config, componentName);
        const targetDirPath = dirname(newTargetPath);
        if (!existsSync(targetDirPath)) {
          mkdirSync(targetDirPath, { recursive: true });
        }
        writeFileSync(newTargetPath, content, 'utf-8');
        logger.success(`  ✓ ${newFile}`);
        continue;
      }
      // Skip main file if CSS version exists
      const cssVersion = file.replace(/\.(tsx|ts|jsx|js)$/, '-css.$1');
      if (files.includes(cssVersion)) {
        continue;
      }
    } else if (config.style === 'scss') {
      // Skip CSS files here - they'll be converted in the style file extension section
      // But we need to handle -css.tsx files first
      if (file.includes('-css.')) {
        const newFile = file.replace('-css.', '.').replace(/\.(tsx|ts|jsx|js)$/, '.$1');
        const newTargetPath = join(componentTargetDir, newFile);
        let content = readFileSync(sourcePath, 'utf-8');
        content = transformComponent(content, config, componentName);
        // Update import to use .scss
        content = content.replace(/\.css["']/g, '.scss"');
        const targetDirPath = dirname(newTargetPath);
        if (!existsSync(targetDirPath)) {
          mkdirSync(targetDirPath, { recursive: true });
        }
        writeFileSync(newTargetPath, content, 'utf-8');
        logger.success(`  ✓ ${newFile}`);
        continue;
      }
      // Skip main file if CSS version exists
      const cssVersion = file.replace(/\.(tsx|ts|jsx|js)$/, '-css.$1');
      if (files.includes(cssVersion)) {
        continue;
      }
      // CSS files will be converted to SCSS in the style file extension section below
    }

    // Handle style file extensions FIRST (before reading content for other files)
    if (file.endsWith('.css') || file.endsWith('.scss')) {
      const ext = config.style === 'scss' ? '.scss' : '.css';
      let finalPath = targetPath;
      let finalFileName = file;
      let converted = false;
      
      // For SCSS mode, convert CSS to SCSS
      if (config.style === 'scss' && file.endsWith('.css') && !file.endsWith('.scss')) {
        finalPath = targetPath.replace('.css', '.scss');
        finalFileName = file.replace('.css', '.scss');
        converted = true;
      } else if (!targetPath.endsWith(ext)) {
        // For CSS mode, ensure .css extension (convert SCSS to CSS)
        finalPath = targetPath.replace(/\.(css|scss)$/, ext);
        finalFileName = file.replace(/\.(css|scss)$/, ext);
      }
      
      // Ensure directory exists
      const finalDirPath = dirname(finalPath);
      if (!existsSync(finalDirPath)) {
        mkdirSync(finalDirPath, { recursive: true });
      }
      
      // Read CSS/SCSS content
      const styleContent = readFileSync(sourcePath, 'utf-8');
      
      writeFileSync(finalPath, styleContent, 'utf-8');
      logger.success(`  ✓ ${finalFileName}${converted ? ' (converted)' : ''}`);
      continue;
    }

    // Create directory if needed
    const targetDirPath = dirname(targetPath);
    if (!existsSync(targetDirPath)) {
      mkdirSync(targetDirPath, { recursive: true });
    }

    let content = readFileSync(sourcePath, 'utf-8');

    // Transform component based on config
    if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
      content = transformComponent(content, config, componentName);
    }

    writeFileSync(targetPath, content, 'utf-8');
    logger.success(`  ✓ ${file}`);
  }

  // Create utils file if it doesn't exist (for cn utility)
  const utilsPath = resolvePath(config.aliases.utils, cwd);
  const utilsFile = join(utilsPath, config.tsx ? 'utils.ts' : 'utils.js');
  
  if (!existsSync(utilsFile)) {
    mkdirSync(utilsPath, { recursive: true });
    
    // Read from template if available, otherwise generate
    const templatesDir = getComponentsDir().replace('/components', '');
    const utilsTemplatePath = join(templatesDir, config.style === 'tailwind' ? 'utils.ts' : 'utils-css.ts');
    
    let utilsContent: string;
    if (existsSync(utilsTemplatePath)) {
      utilsContent = readFileSync(utilsTemplatePath, 'utf-8');
      // Transform aliases
      utilsContent = utilsContent.replace(/@\/lib\/utils/g, config.aliases.utils);
    } else {
      // Fallback generation
      utilsContent = config.style === 'tailwind'
        ? `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
        : `export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
`;
    }
    
    writeFileSync(utilsFile, utilsContent, 'utf-8');
    logger.success(`  ✓ Created utils file at ${config.aliases.utils}/${config.tsx ? 'utils.ts' : 'utils.js'}`);
  }

  // Handle style-specific setup
  if (config.style === 'tailwind' && config.tailwind) {
    const { injectTailwindVariables } = await import('../utils/tailwind-variables.js');
    const cssPath = resolvePath(config.tailwind.css, cwd);
    
    if (injectTailwindVariables(cssPath)) {
      logger.success(`  ✓ Added CSS variables to ${config.tailwind.css}`);
    } else {
      logger.info(`\n${chalk.yellow('Note:')} Make sure Tailwind CSS is configured in your project.`);
      logger.info(`For Tailwind v4, use ${chalk.cyan('@import "tailwindcss"')} in your CSS file.`);
      logger.info(`For Tailwind v3, use ${chalk.cyan('@tailwind base')} directives.`);
      logger.info(`CSS variables may need to be added manually to your ${chalk.cyan(config.tailwind.css)} file.`);
    }
  } else if (config.css) {
    // Try to automatically inject CSS/SCSS import into global stylesheet
    const styleExt = config.css.scss ? 'scss' : 'css';
    
    // Calculate component path relative to project root
    const componentsResolvedPath = resolvePath(config.aliases.components, cwd);
    const componentPathFromRoot = componentsResolvedPath
      .replace(cwd + '/', '')
      .replace(cwd + '\\', '')
      .replace(/\\/g, '/') + `/${componentName}/${componentName}.${styleExt}`;
    
    const result = tryInjectComponentImport(
      componentName,
      componentPathFromRoot,
      styleExt,
      cwd
    );
    
    if (result.success && result.stylesheet) {
      logger.success(`  ✓ Added import to ${result.stylesheet}`);
    } else {
      logger.info(`\n${chalk.yellow('Note:')} Don't forget to import the styles:`);
      if (result.stylesheet) {
        logger.info(`  Add to ${chalk.cyan(result.stylesheet)}:`);
        logger.info(`  ${chalk.gray(`@import "${relativeComponentPath}";`)}`);
      } else {
        logger.info(`  ${chalk.gray(`import './${componentName}/${componentName}.${styleExt}'`)}`);
        logger.info(`Or add to your global stylesheet (globals.css, App.css, index.css, etc.).`);
      }
    }
  }

  logger.success(`\n✓ Component ${chalk.cyan(componentName)} added successfully!`);
  
  // Ensure process exits cleanly
  process.exit(0);
}
