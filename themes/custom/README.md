# Custom JSON Resume Theme

This is a custom theme based on `jsonresume-theme-even`.

## Development

The theme is located in `themes/custom/` and installed as a local package.

### Making Changes

1. Edit files in `themes/custom/` (currently contains the dist files from even theme)
2. Reinstall the theme:
   ```bash
   npm install ./themes/custom --legacy-peer-deps
   ```
3. Rebuild:
   ```bash
   npm run build:custom
   ```

### Files Structure

- `index.js` - ES Module entry point
- `index.cjs` - CommonJS entry point  
- `index.d.ts` - TypeScript definitions
- `package.json` - Theme package metadata

## Next Steps

To customize this theme:

1. **Extract styles from professional theme**: Copy CSS from `@jsonresume/jsonresume-theme-professional`
2. **Modify the render logic**: Edit `index.js` or `index.cjs` to adjust HTML structure
3. **Test frequently**: Run `npm run dev:custom` to see changes
4. **Iterate**: Make incremental changes and test

## Publishing (Optional)

When ready to share:
```bash
cd themes/custom
npm publish
```
