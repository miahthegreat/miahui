# Troubleshooting Guide

## Component Not Found Error

If you get `Component "button" not found`, it means the CLI can't find the templates directory.

### Check Template Location

The CLI looks for templates in these locations (in order):
1. `dist/../src/templates` (when installed via npm)
2. `dist/../../src/templates` (alternative structure)
3. `dist/../templates` (development)
4. `node_modules/miahui/src/templates` (absolute path)

### Verify Templates Are Included

Check if templates are in the published package:
```bash
npm pack --dry-run | grep "src/templates"
```

If you see no results, templates aren't being included. Check `.npmignore`.

### Fix Path Resolution

The path resolution should automatically find templates. If it doesn't:

1. **Check package structure:**
   ```bash
   npm pack
   tar -tzf miahui-0.1.0.tgz | grep templates | head -5
   ```

2. **Verify installation:**
   ```bash
   npm list miahui
   ls node_modules/miahui/src/templates
   ```

3. **Manual fix:**
   If templates aren't found, you may need to update the path resolution in `src/utils/paths.ts`

### Common Issues

1. **Templates not in package**: Check `.npmignore` - make sure `src/templates/` is NOT ignored
2. **Wrong path**: The built CLI is in `dist/`, so it looks for `../src/templates`
3. **Package not installed**: Make sure `miahui` is installed: `npm install -g miahui`

### Debug Mode

Add logging to see what path is being checked:
```typescript
console.log('Looking for templates in:', possiblePaths);
```

