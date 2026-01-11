# Publishing Guide

## Pre-Publishing Checklist

### 1. Update package.json
- [x] Name: `miahui`
- [x] Version: `0.1.0`
- [ ] Author: Add your name/email
- [ ] Repository: Already set
- [ ] Keywords: Already set
- [ ] License: MIT ✓

### 2. Prepare Files
- [x] Build output (`dist/cli.mjs`)
- [x] README.md
- [x] LICENSE
- [x] .gitignore (excludes node_modules, dist)

### 3. Test Locally
- [x] Build works
- [x] CLI commands work
- [x] No linting errors
- [ ] Test in a fresh project (recommended)

## Publishing Steps

### Step 1: Login to npm
```bash
npm login
```
Enter your npm username, password, and email.

### Step 2: Verify You're Logged In
```bash
npm whoami
```

### Step 3: Check Package Name Availability
```bash
npm view miahui
```
If it returns 404, the name is available. If it returns package info, you may need to:
- Use a scoped package: `@yourusername/miahui`
- Choose a different name

### Step 4: Update Version (if needed)
```bash
npm version patch  # 0.1.0 -> 0.1.1
npm version minor  # 0.1.0 -> 0.2.0
npm version major  # 0.1.0 -> 1.0.0
```

### Step 5: Build
```bash
npm run build
```

### Step 6: Dry Run (Test without publishing)
```bash
npm publish --dry-run
```
This shows what would be published without actually publishing.

### Step 7: Publish
```bash
npm publish
```

For scoped packages (if name is taken):
```bash
npm publish --access public
```

## Post-Publishing

### 1. Verify Publication
```bash
npm view miahui
```

### 2. Test Installation
```bash
npm install -g miahui
miahui --version
```

### 3. Update Documentation
- Update README with installation instructions
- Add npm badge to README
- Update any version references

## Version Management

### Semantic Versioning
- **PATCH** (0.1.0 → 0.1.1): Bug fixes
- **MINOR** (0.1.0 → 0.2.0): New features, backward compatible
- **MAJOR** (0.1.0 → 1.0.0): Breaking changes

### Update Version
```bash
npm version patch  # Auto-updates package.json and creates git tag
git push --tags     # Push version tag
```

## Important Notes

1. **First Publish**: Make sure package name is available
2. **Scoped Packages**: Use `@username/package-name` if name is taken
3. **Access**: Scoped packages default to private, use `--access public`
4. **Unpublish**: Can unpublish within 72 hours, but avoid if possible
5. **Git Tags**: `npm version` automatically creates git tags

## Troubleshooting

### "Package name already taken"
- Use scoped package: `@yourusername/miahui`
- Update package.json name
- Publish with `--access public`

### "You do not have permission"
- Check you're logged in: `npm whoami`
- Verify package name ownership
- For scoped packages, ensure you own the scope

### Build Errors
- Run `npm run build` first
- Check dist/ folder exists
- Verify all dependencies are in package.json

