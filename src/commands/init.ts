import fs from "fs-extra";
const { existsSync, writeFileSync, mkdirSync } = fs;
import { join } from 'path';
import { createInterface } from 'readline';
import { logger } from '../utils/logger.js';
import { getDefaultConfig, saveConfig, getConfig } from '../utils/config.js';
import { StyleType } from '../types/config.js';
import chalk from 'chalk';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

export async function init() {
  const cwd = process.cwd();
  
  logger.info('Welcome to Miahui! Let\'s set up your project.\n');

  // Check if already initialized
  const existingConfig = getConfig(cwd);
  if (existingConfig) {
    const overwrite = await question(
      chalk.yellow('components.json already exists. Overwrite? (y/N): ')
    );
    if (overwrite.toLowerCase() !== 'y') {
      logger.info('Initialization cancelled.');
      rl.close();
      return;
    }
  }

  // Choose style type
  logger.step('Choose your styling approach:');
  console.log('  1) Tailwind CSS (recommended)');
  console.log('  2) Vanilla CSS');
  console.log('  3) SCSS');
  
  const styleChoice = await question('\nEnter choice (1-3): ');
  let style: StyleType = 'tailwind';
  
  switch (styleChoice.trim()) {
    case '2':
      style = 'css';
      break;
    case '3':
      style = 'scss';
      break;
    default:
      style = 'tailwind';
  }

  // TypeScript or JavaScript
  const useTS = await question('Use TypeScript? (Y/n): ');
  const tsx = useTS.toLowerCase() !== 'n';

  // RSC support
  const useRSC = await question('Use React Server Components? (y/N): ');
  const rsc = useRSC.toLowerCase() === 'y';

  // Component directory
  const componentsDir = await question(
    `Component directory (${chalk.gray('@/components')}): `
  );
  const componentAlias = componentsDir.trim() || '@/components';

  // Utils directory
  const utilsDir = await question(
    `Utils directory (${chalk.gray('@/lib/utils')}): `
  );
  const utilsAlias = utilsDir.trim() || '@/lib/utils';

  // Create config
  const config = getDefaultConfig(style);
  config.tsx = tsx;
  config.rsc = rsc;
  config.aliases.components = componentAlias;
  config.aliases.utils = utilsAlias;

  // Additional config based on style
  if (style === 'tailwind') {
    const tailwindConfig = await question(
      `Tailwind config path (${chalk.gray('tailwind.config.js')}): `
    );
    const tailwindCSS = await question(
      `Global CSS file (${chalk.gray('src/app/globals.css')}): `
    );
    const baseColor = await question(
      `Base color (${chalk.gray('slate')}): `
    );

    if (config.tailwind) {
      config.tailwind.config = tailwindConfig.trim() || 'tailwind.config.js';
      config.tailwind.css = tailwindCSS.trim() || 'src/app/globals.css';
      config.tailwind.baseColor = baseColor.trim() || 'slate';
    }
  } else {
    const outputDir = await question(
      `CSS output directory (${chalk.gray('src/styles/components')}): `
    );
    if (config.css) {
      config.css.outputDir = outputDir.trim() || 'src/styles/components';
    }
  }

  // Save config
  saveConfig(config, cwd);

  // Create directories
  const componentPath = resolveAlias(componentAlias, cwd);
  const utilsPath = resolveAlias(utilsDir.trim() || '@/lib/utils', cwd);

  if (!existsSync(componentPath)) {
    mkdirSync(componentPath, { recursive: true });
    logger.success(`Created directory: ${componentPath}`);
  }

  if (!existsSync(utilsPath)) {
    mkdirSync(utilsPath, { recursive: true });
    logger.success(`Created directory: ${utilsPath}`);
  }

  logger.success('\n✓ Miahui initialized successfully!');
  logger.info(`Configuration saved to ${chalk.cyan('components.json')}`);
  logger.info(`\nNext steps:`);
  logger.info(`  ${chalk.cyan('miahui add button')} - Add a button component`);
  logger.info(`  ${chalk.cyan('miahui list')} - See all available components`);

  rl.close();
}

function resolveAlias(alias: string, cwd: string): string {
  if (alias.startsWith('@/')) {
    return join(cwd, alias.replace('@/', 'src/'));
  }
  return join(cwd, alias);
}

