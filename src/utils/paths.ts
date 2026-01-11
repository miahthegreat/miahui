import { join, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";
const { existsSync } = fs;

const __filename = fileURLToPath(import.meta.url);
// When built, this file becomes dist/cli.mjs
// So __dirname will be the dist/ directory
const __dirname = dirname(__filename);

export function getTemplatesDir(): string {
  // When installed via npm, the package structure is:
  // node_modules/miahui/
  //   dist/cli.mjs (this file when executed)
  //   src/templates/ (templates are here)
  //   package.json
  
  // The CLI is executed as: node_modules/miahui/dist/cli.mjs
  // So __dirname = node_modules/miahui/dist/
  // We need: node_modules/miahui/src/templates
  
  // Try multiple possible locations (order matters - try most likely first)
  const possiblePaths = [
    join(__dirname, '../src/templates'), // dist/../src/templates = package/src/templates ✓
    join(__dirname, '../../src/templates'), // dist/../../src/templates (if nested)
    join(__dirname, '../templates'), // dist/../templates (alternative)
    join(process.cwd(), 'node_modules/miahui/src/templates'), // Absolute path
  ];
  
  // Debug: uncomment to see what paths are being checked
  // console.log('Checking paths:', possiblePaths);
  // console.log('__dirname:', __dirname);
  
  for (const path of possiblePaths) {
    if (existsSync(path)) {
      return path;
    }
  }
  
  // Fallback - try to find package.json and resolve from there
  try {
    // Go up from dist/ to package root
    const packageUrl = new URL('../package.json', import.meta.url);
    const packagePath = fileURLToPath(packageUrl);
    if (existsSync(packagePath)) {
      const packageDir = dirname(packagePath);
      const templatesPath = join(packageDir, 'src/templates');
      if (existsSync(templatesPath)) {
        return templatesPath;
      }
    }
  } catch {
    // Ignore errors
  }
  
  // Last resort fallback
  return join(__dirname, '../src/templates');
}

export function getComponentsDir(): string {
  const templatesDir = getTemplatesDir();
  return join(templatesDir, 'components');
}

export function resolvePath(path: string, cwd: string = process.cwd()): string {
  if (path.startsWith("@/")) {
    // Try to resolve @ alias
    const possiblePaths = [
      join(cwd, path.replace("@/", "src/")),
      join(cwd, path.replace("@/", "")),
    ];

    for (const possiblePath of possiblePaths) {
      if (existsSync(dirname(possiblePath))) {
        return possiblePath;
      }
    }

    // Default to src/ if directory doesn't exist
    return join(cwd, path.replace("@/", "src/"));
  }

  return join(cwd, path);
}
