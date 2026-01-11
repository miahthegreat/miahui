# Fix: Component Not Found Error

## The Issue

When running `miahui add button`, you get:
```
✗ Component "button" not found.
```

This happens because the CLI can't find the `src/templates/` directory when the package is installed.

## Root Cause

When the package is installed:
- CLI executable: `node_modules/miahui/dist/cli.mjs`
- Templates should be: `node_modules/miahui/src/templates/`

The path resolution needs to go from `dist/` up to package root, then into `src/templates/`.

## Solution Applied

Updated `src/utils/paths.ts` to check multiple possible paths:
1. `dist/../src/templates` (most likely when installed)
2. `dist/../../src/templates` (alternative)
3. `dist/../templates` (fallback)
4. Absolute path from `process.cwd()`

## Verification

After rebuilding, test with:
```bash
npm run build
npm link  # or reinstall globally
miahui list  # Should show all components
miahui add button  # Should work now
```

## If Still Not Working

1. **Check package contents:**
   ```bash
   npm pack --dry-run | grep templates
   ```

2. **Verify installation:**
   ```bash
   npm list -g miahui
   ls $(npm root -g)/miahui/src/templates
   ```

3. **Check .npmignore:**
   Make sure `src/templates/` is NOT ignored

4. **Add debug logging:**
   Uncomment the console.log lines in `getTemplatesDir()` to see what paths are being checked.

