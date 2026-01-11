import fs from "fs-extra";
const { existsSync, readFileSync, writeFileSync } = fs;
import { join } from 'path';

/**
 * Calculate relative path from stylesheet to component
 */
function calculateRelativePath(stylesheetPath: string, componentPath: string, styleExt: 'css' | 'scss'): string {
  // Normalize paths
  const stylesheetParts = stylesheetPath.split('/').filter(p => p);
  const componentParts = componentPath.split('/').filter(p => p);
  
  // Remove filename from stylesheet
  stylesheetParts.pop();
  
  // Remove filename from component and replace extension
  const componentFile = componentParts.pop()?.replace(/\.(css|scss)$/, `.${styleExt}`) || '';
  
  // Find common path
  let commonLength = 0;
  for (let i = 0; i < Math.min(stylesheetParts.length, componentParts.length); i++) {
    if (stylesheetParts[i] === componentParts[i]) {
      commonLength++;
    } else {
      break;
    }
  }
  
  // Calculate relative path
  const upLevels = stylesheetParts.length - commonLength;
  const downPath = componentParts.slice(commonLength).join('/');
  
  let relativePath = '';
  if (upLevels > 0) {
    relativePath = '../'.repeat(upLevels);
  }
  if (downPath) {
    relativePath += downPath + '/';
  }
  relativePath += componentFile;
  
  return relativePath;
}

/**
 * Find common global stylesheet files in the project
 */
export function findGlobalStylesheet(cwd: string, styleExt: 'css' | 'scss'): string | null {
  const commonPaths = [
    'src/App.css',
    'src/App.scss',
    'src/index.css',
    'src/index.scss',
    'src/main.css',
    'src/main.scss',
    'src/styles/globals.css',
    'src/styles/globals.scss',
    'src/app/globals.css',
    'src/app/globals.scss',
    'app/globals.css',
    'app/globals.scss',
    'styles/globals.css',
    'styles/globals.scss',
    'globals.css',
    'globals.scss',
  ];

  // Filter by extension
  const paths = commonPaths.filter(path => path.endsWith(`.${styleExt}`));

  for (const path of paths) {
    const fullPath = join(cwd, path);
    if (existsSync(fullPath)) {
      return path;
    }
  }

  return null;
}

/**
 * Inject CSS/SCSS import into a global stylesheet
 */
export function injectComponentImport(
  stylesheetPath: string,
  componentName: string,
  componentPath: string,
  styleExt: 'css' | 'scss',
  cwd: string
): boolean {
  const fullPath = join(cwd, stylesheetPath);

  if (!existsSync(fullPath)) {
    return false;
  }

  const content = readFileSync(fullPath, 'utf-8');
  
  // Calculate relative path from stylesheet to component
  const relativePath = calculateRelativePath(stylesheetPath, componentPath, styleExt);
  const importStatement = `@import "${relativePath}";\n`;
  
  // Check if import already exists (check for various patterns)
  const importPatterns = [
    relativePath,
    `./${componentName}`,
    `/${componentName}.${styleExt}`,
    `@import "${relativePath}"`,
    `@import '${relativePath}'`,
  ];
  
  const alreadyImported = importPatterns.some(pattern => content.includes(pattern));
  if (alreadyImported) {
    return false; // Already imported
  }

  // Add import at the end of the file
  const newContent = content.trim() + '\n' + importStatement;
  writeFileSync(fullPath, newContent, 'utf-8');
  return true;
}

/**
 * Try to inject component CSS/SCSS import into global stylesheet
 */
export function tryInjectComponentImport(
  componentName: string,
  componentPath: string,
  styleExt: 'css' | 'scss',
  cwd: string
): { success: boolean; stylesheet?: string } {
  const globalStylesheet = findGlobalStylesheet(cwd, styleExt);
  
  if (!globalStylesheet) {
    return { success: false };
  }

  const success = injectComponentImport(globalStylesheet, componentName, componentPath, styleExt, cwd);
  
  if (success) {
    return { success: true, stylesheet: globalStylesheet };
  }

  return { success: false, stylesheet: globalStylesheet };
}

