#!/usr/bin/env node

import { Command } from 'commander';
import { init } from './commands/init.js';
import { add } from './commands/add.js';
import { list } from './commands/list.js';
import { update } from './commands/update.js';

const program = new Command();

program
  .name('miahui')
  .description('A highly customizable UI component library')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize Miahui in your project')
  .action(init);

program
  .command('add')
  .description('Add a component to your project')
  .argument('<component>', 'Component name to add')
  .option('-y, --yes', 'Skip confirmation prompts')
  .action(add);

program
  .command('list')
  .description('List all available components')
  .option('-s, --search <term>', 'Search components by name')
  .action(list);

program
  .command('update')
  .description('Update component(s) to the latest version')
  .argument('[component]', 'Component name to update (optional, updates all if omitted)')
  .action(update);

program.parse();

