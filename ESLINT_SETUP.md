# ESLint Configuration

## Overview

ESLint is now configured for the Next.js application with TypeScript support and best practices.

## Configuration Files

### `.eslintrc.json`
Main ESLint configuration with:
- **Next.js defaults**: `next/core-web-vitals` and `next/typescript`
- **TypeScript rules**: Warnings for `any` types, unused vars, etc.
- **React rules**: Hooks validation, display names
- **Import ordering**: Alphabetical with grouping
- **Console warnings**: Allows `console.error` and `console.warn`

### `.eslintignore`
Ignores build outputs, dependencies, and config files from linting.

### `.vscode/settings.json`
VS Code integration for automatic linting on save.

## NPM Scripts

```bash
# Run ESLint to check for issues
npm run lint

# Run ESLint and automatically fix issues
npm run lint:fix

# Type check without emitting files
npm run type-check
```

## Key Rules

### TypeScript
- ⚠️ `@typescript-eslint/no-explicit-any` - Warns on `any` types
- ⚠️ `@typescript-eslint/no-unused-vars` - Warns on unused variables (allows `_` prefix)
- ⚠️ `@typescript-eslint/no-non-null-assertion` - Warns on `!` assertions

### React
- ❌ `react-hooks/rules-of-hooks` - Error on hook rule violations
- ⚠️ `react-hooks/exhaustive-deps` - Warns on missing dependencies
- ⚠️ `react/display-name` - Warns on components without display names

### Imports
- ⚠️ Import ordering with alphabetical sorting
- Groups: builtin → external → internal → parent → sibling → index

### General
- ⚠️ `no-console` - Warns on `console.log` (allows `error` and `warn`)
- ⚠️ `prefer-const` - Warns when `let` could be `const`
- ❌ `no-var` - Error on `var` usage

### Next.js Specific
- ❌ `@next/next/no-html-link-for-pages` - Error on `<a>` instead of `<Link>`
- ⚠️ `@next/next/no-img-element` - Warns on `<img>` instead of `<Image>`

## VS Code Integration

If you're using VS Code:
1. Install the **ESLint extension** (`dbaeumer.vscode-eslint`)
2. The `.vscode/settings.json` file will:
   - Auto-fix ESLint issues on save
   - Validate TypeScript/React files
   - Organize imports automatically

## CI/CD Integration

Add to your CI pipeline:

```yaml
- name: Lint
  run: npm run lint

- name: Type Check
  run: npm run type-check
```

## Common Fixes

### Unused Variables
```typescript
// ❌ Bad
const [data, setData] = useState();
// Only using 'data'

// ✅ Good
const [data, _setData] = useState();
// Prefix with _ to ignore
```

### Console Logs
```typescript
// ❌ Bad
console.log('Debug info');

// ✅ Good
console.error('Error:', error);
console.warn('Warning:', warning);
// Or remove debug logs
```

### Any Types
```typescript
// ❌ Bad
const data: any = fetchData();

// ✅ Good
interface Data {
  id: string;
  name: string;
}
const data: Data = fetchData();
```

### Missing Dependencies
```typescript
// ⚠️ Warning
useEffect(() => {
  fetchData(id);
}, []); // Missing 'id' dependency

// ✅ Good
useEffect(() => {
  fetchData(id);
}, [id]);
```

## Customization

To adjust rules, edit `.eslintrc.json`:

```json
{
  "rules": {
    "no-console": "off",  // Disable console warnings
    "@typescript-eslint/no-explicit-any": "off"  // Allow any types
  }
}
```

## Best Practices

1. **Run lint before commits**: `npm run lint`
2. **Fix automatically when possible**: `npm run lint:fix`
3. **Keep rules strict**: Only disable rules when absolutely necessary
4. **Document exceptions**: Use `eslint-disable` comments with reasons

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = legacyApiCall(); // TODO: Add proper typing
```

## Integration with DRY Principles

ESLint helps enforce the DRY principles from `.cursorrules`:
- Warns on duplicate code patterns
- Enforces consistent import ordering
- Catches unused variables and functions
- Ensures hooks follow React rules

---

**Your Next.js app now has professional-grade linting! 🎉**


















