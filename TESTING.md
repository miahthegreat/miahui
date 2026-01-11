# Testing Guide

## Current Status

The Miahui CLI is being tested and there are some compatibility issues to resolve:

### Issues Found

1. **ESM/CommonJS Compatibility**: `fs-extra` is a CommonJS module but we're using ESM
2. **Windows Shebang**: Shebang causes issues on Windows
3. **Build Output**: Output file extension changed from `.js` to `.mjs` for ESM

### Solutions Needed

1. Update all `fs-extra` imports to use default import:
   ```typescript
   // Instead of:
   import { readFileSync } from 'fs-extra';
   
   // Use:
   import fs from 'fs-extra';
   const { readFileSync } = fs;
   ```

2. Update `package.json` bin field to point to `cli.mjs`

3. Consider using Node's built-in `fs` module instead of `fs-extra` for better ESM compatibility

## Manual Testing Steps

1. **Build the CLI:**
   ```bash
   npm run build
   ```

2. **Test locally:**
   ```bash
   npm link
   cd ../test-project
   npm link miahui
   npx miahui list
   ```

3. **Test component addition:**
   ```bash
   npx miahui init
   npx miahui add button
   ```

## Next Steps

- Fix fs-extra imports across all files
- Update package.json bin reference
- Test on both Windows and Unix systems
- Verify all CLI commands work correctly

