import fs from "fs-extra";
const { existsSync } = fs;
import { join } from 'path';
import { MiahuiConfig } from '../types/config.js';
import { logger } from './logger.js';

export function validateConfig(config: MiahuiConfig, cwd: string): boolean {
  let isValid = true;

  // Validate aliases
  if (!config.aliases.components || !config.aliases.utils) {
    logger.error('Invalid configuration: aliases.components and aliases.utils are required');
    isValid = false;
  }

  // Validate style-specific config
  if (config.style === 'tailwind') {
    if (!config.tailwind) {
      logger.error('Invalid configuration: tailwind config is missing');
      isValid = false;
    } else {
      if (!config.tailwind.css || !config.tailwind.config) {
        logger.error('Invalid configuration: tailwind.css and tailwind.config are required');
        isValid = false;
      }
    }
  } else if (config.style === 'css' || config.style === 'scss') {
    if (!config.css) {
      logger.error('Invalid configuration: css config is missing');
      isValid = false;
    }
  }

  return isValid;
}

export function validatePaths(config: MiahuiConfig, cwd: string): boolean {
  let isValid = true;

  // Check if component directory exists or can be created
  const componentPath = resolveAlias(config.aliases.components, cwd);
  const componentDir = join(cwd, componentPath);
  
  // This is just a warning, not an error
  if (!existsSync(componentDir)) {
    logger.warning(`Component directory does not exist: ${componentPath}`);
    logger.info('It will be created when you add your first component');
  }

  return isValid;
}

function resolveAlias(alias: string, cwd: string): string {
  if (alias.startsWith('@/')) {
    return alias.replace('@/', 'src/');
  }
  return alias;
}

