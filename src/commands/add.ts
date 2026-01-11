import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs-extra';
import { join, dirname } from 'path';
import { logger } from '../utils/logger.js';
import { getConfig } from '../utils/config.js';
import { getComponentsDir, resolvePath } from '../utils/paths.js';
import { transformComponent } from '../utils/transform.js';
import { validateConfig } from '../utils/validation.js';
import { glob } from 'glob';
import chalk from 'chalk';

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
      // Convert CSS to SCSS if needed
      if (file.endsWith('.css') && !file.endsWith('.scss')) {
        const scssPath = targetPath.replace('.css', '.scss');
        let content = readFileSync(sourcePath, 'utf-8');
        writeFileSync(scssPath, content, 'utf-8');
        logger.success(`  ✓ ${file.replace('.css', '.scss')} (converted)`);
        continue;
      }
      // Use CSS version if available for SCSS mode
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

    // Handle style file extensions
    if (file.endsWith('.css') || file.endsWith('.scss')) {
      const ext = config.style === 'scss' ? '.scss' : '.css';
      if (!targetPath.endsWith(ext)) {
        const newPath = targetPath.replace(/\.(css|scss)$/, ext);
        writeFileSync(newPath, content, 'utf-8');
        logger.success(`  ✓ ${file.replace(/\.(css|scss)$/, ext)}`);
        continue;
      }
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
      logger.info(`CSS variables may need to be added to your ${chalk.cyan(config.tailwind.css)} file.`);
    }
  } else if (config.css) {
    // Import CSS/SCSS files
    const styleExt = config.css.scss ? 'scss' : 'css';
    logger.info(`\n${chalk.yellow('Note:')} Don't forget to import the styles:`);
    logger.info(`  ${chalk.gray(`import './${componentName}/${componentName}.${styleExt}'`)}`);
    logger.info(`Or add to your global stylesheet.`);
  }

  logger.success(`\n✓ Component ${chalk.cyan(componentName)} added successfully!`);
}
