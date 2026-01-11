import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function getTemplatesDir(): string {
  return join(__dirname, '../templates');
}

export function getComponentsDir(): string {
  return join(__dirname, '../templates/components');
}

export function resolvePath(path: string, cwd: string = process.cwd()): string {
  if (path.startsWith('@/')) {
    // Try to resolve @ alias
    const possiblePaths = [
      join(cwd, path.replace('@/', 'src/')),
      join(cwd, path.replace('@/', '')),
    ];
    
    for (const possiblePath of possiblePaths) {
      if (existsSync(dirname(possiblePath))) {
        return possiblePath;
      }
    }
    
    // Default to src/ if directory doesn't exist
    return join(cwd, path.replace('@/', 'src/'));
  }
  
  return join(cwd, path);
}

