import fs from "fs-extra";
const { existsSync, readdirSync, statSync, readFileSync } = fs;
import { join } from 'path';
import { getComponentsDir } from '../utils/paths.js';
import { logger } from '../utils/logger.js';
import chalk from 'chalk';

export async function list(options?: { search?: string }) {
  const componentsDir = getComponentsDir();

  if (!existsSync(componentsDir)) {
    logger.error('Components directory not found.');
    return;
  }

  let components = readdirSync(componentsDir).filter((item) => {
    const itemPath = join(componentsDir, item);
    return statSync(itemPath).isDirectory();
  });

  if (components.length === 0) {
    logger.info('No components available.');
    return;
  }

  // Filter by search term if provided
  if (options?.search) {
    const searchTerm = options.search.toLowerCase();
    components = components.filter(comp => 
      comp.toLowerCase().includes(searchTerm)
    );
    
    if (components.length === 0) {
      logger.info(`No components found matching "${options.search}"`);
      return;
    }
  }

  logger.info(options?.search 
    ? `Components matching "${options.search}":\n`
    : 'Available components:\n'
  );

  for (const component of components.sort()) {
    const componentPath = join(componentsDir, component);
    const readmePath = join(componentPath, 'README.md');
    
    let description = '';
    if (existsSync(readmePath)) {
      const readme = readFileSync(readmePath, 'utf-8');
      const match = readme.match(/^# .+\n\n(.+)/);
      if (match) {
        description = match[1].split('\n')[0];
      }
    }

    console.log(`  ${chalk.cyan(component.padEnd(20))} ${description || 'No description'}`);
  }

  console.log(`\n${chalk.gray('Install a component:')} ${chalk.cyan('miahui add <component-name>')}`);
}

