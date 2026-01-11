import fs from "fs-extra";
const { existsSync, readFileSync, writeFileSync } = fs;
import { join } from 'path';
import { logger } from '../utils/logger.js';
import { getConfig } from '../utils/config.js';
import { getComponentsDir, resolvePath } from '../utils/paths.js';
import { transformComponent } from '../utils/transform.js';
import { glob } from 'glob';
import chalk from 'chalk';

export async function update(componentName?: string) {
  const cwd = process.cwd();
  const config = getConfig(cwd);

  if (!config) {
    logger.error('Miahui is not initialized. Run `miahui init` first.');
    process.exit(1);
  }

  const componentsDir = getComponentsDir();
  const targetDir = resolvePath(config.aliases.components, cwd);

  if (componentName) {
    // Update specific component
    await updateComponent(componentName, componentsDir, targetDir, config, cwd);
  } else {
    // Update all components
    logger.step('Updating all components...');
    
    if (!existsSync(targetDir)) {
      logger.error('Components directory not found.');
      return;
    }

    const installedComponents = (await glob('*', {
      cwd: targetDir,
      onlyDirectories: true,
    })).filter(dir => existsSync(join(componentsDir, dir)));

    if (installedComponents.length === 0) {
      logger.info('No components found to update.');
      return;
    }

    for (const component of installedComponents) {
      await updateComponent(component, componentsDir, targetDir, config, cwd);
    }

    logger.success('\n✓ All components updated!');
  }
}

async function updateComponent(
  componentName: string,
  componentsDir: string,
  targetDir: string,
  config: any,
  cwd: string
) {
  const componentPath = join(componentsDir, componentName);
  const componentTargetDir = join(targetDir, componentName);

  if (!existsSync(componentPath)) {
    logger.warning(`Component "${componentName}" not found in templates. Skipping.`);
    return;
  }

  if (!existsSync(componentTargetDir)) {
    logger.warning(`Component "${componentName}" not installed. Run 'miahui add ${componentName}' first.`);
    return;
  }

  logger.step(`Updating ${chalk.cyan(componentName)}...`);

  // Find all files in component directory
  const files = await glob('**/*', {
    cwd: componentPath,
    dot: false,
    ignore: ['**/*.md'],
  });

  // Backup existing component (optional - could be improved)
  let updatedCount = 0;

  for (const file of files) {
    const sourcePath = join(componentPath, file);
    const targetPath = join(componentTargetDir, file);

    // Skip files based on style preference (same logic as add command)
    if (config.style === 'tailwind') {
      if (file.endsWith('.css') || file.endsWith('.scss') || file.includes('-css.')) {
        continue;
      }
    } else if (config.style === 'css') {
      if (file.endsWith('.scss') || (file.includes('-css.') && !file.includes(componentName))) {
        continue;
      }
      if (file.includes('-css.')) {
        const newFile = file.replace('-css.', '.');
        const newTargetPath = join(componentTargetDir, newFile);
        let content = readFileSync(sourcePath, 'utf-8');
        content = transformComponent(content, config, componentName);
        writeFileSync(newTargetPath, content, 'utf-8');
        updatedCount++;
        continue;
      }
      const cssVersion = file.replace(/\.(tsx|ts|jsx|js)$/, '-css.$1');
      if (files.includes(cssVersion)) {
        continue;
      }
    } else if (config.style === 'scss') {
      if (file.endsWith('.css') && !file.endsWith('.scss')) {
        const scssPath = targetPath.replace('.css', '.scss');
        let content = readFileSync(sourcePath, 'utf-8');
        writeFileSync(scssPath, content, 'utf-8');
        updatedCount++;
        continue;
      }
      if (file.includes('-css.')) {
        const newFile = file.replace('-css.', '.').replace(/\.(tsx|ts|jsx|js)$/, '.$1');
        const newTargetPath = join(componentTargetDir, newFile);
        let content = readFileSync(sourcePath, 'utf-8');
        content = transformComponent(content, config, componentName);
        content = content.replace(/\.css["']/g, '.scss"');
        writeFileSync(newTargetPath, content, 'utf-8');
        updatedCount++;
        continue;
      }
      const cssVersion = file.replace(/\.(tsx|ts|jsx|js)$/, '-css.$1');
      if (files.includes(cssVersion)) {
        continue;
      }
    }

    // Read and transform
    let content = readFileSync(sourcePath, 'utf-8');

    if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
      content = transformComponent(content, config, componentName);
    }

    // Handle style file extensions
    if (file.endsWith('.css') || file.endsWith('.scss')) {
      const ext = config.style === 'scss' ? '.scss' : '.css';
      if (!targetPath.endsWith(ext)) {
        const newPath = targetPath.replace(/\.(css|scss)$/, ext);
        writeFileSync(newPath, content, 'utf-8');
        updatedCount++;
        continue;
      }
    }

    writeFileSync(targetPath, content, 'utf-8');
    updatedCount++;
  }

  if (updatedCount > 0) {
    logger.success(`  ✓ Updated ${updatedCount} file(s)`);
  } else {
    logger.info(`  ℹ No changes needed`);
  }
}

