# Quick Publish Guide

## Step-by-Step Publishing

### 1. Check Package Name Availability
```bash
npm view miahui
```
If you get a 404, the name is available. If not, you'll need a scoped name like `@miahthegreat/miahui`.

### 2. Login to npm
```bash
npm login
```
Enter your npm credentials.

### 3. Verify Login
```bash
npm whoami
```

### 4. Final Build Check
```bash
npm run build
```

### 5. Test What Will Be Published
```bash
npm pack --dry-run
```
Verify that `src/templates/` is included in the package.

### 6. Publish!
```bash
npm publish
```

If using a scoped package name:
```bash
npm publish --access public
```

### 7. Verify Publication
```bash
npm view miahui
```

### 8. Test Installation
```bash
npm install -g miahui
miahui --version
miahui list
```

## Important Notes

- **First publish**: Make sure the package name is available
- **Templates must be included**: The `src/templates/` directory is required for the CLI to work
- **Version**: Current version is 0.1.0 (first release)
- **Unpublishing**: You can unpublish within 72 hours if needed, but avoid if possible

## After Publishing

1. Update README with npm installation instructions
2. Add npm badge to README
3. Create a GitHub release
4. Share on social media/communities

## Version Updates

For future updates:
```bash
npm version patch  # 0.1.0 -> 0.1.1 (bug fixes)
npm version minor  # 0.1.0 -> 0.2.0 (new features)
npm version major  # 0.1.0 -> 1.0.0 (breaking changes)
npm publish
git push --tags
```

