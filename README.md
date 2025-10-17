# My Resume

Read it <a href="https://ricccec.github.io/resume/" target="_blank">here</a> or download it <a href="https://ricccec.github.io/resume/assets/resume.pdf" target="_blank">here</a>.

This repository contains my resume in [JSON Resume](https://jsonresume.org/) format, along with related assets (photo, QR code, etc.). The resume is exported to HTML using the [Even](https://github.com/rbardini/jsonresume-theme-even) theme and to PDF using a custom theme.

The custom theme was built in `theme-src/`, based on [Rafael Bardini's jsonresume-theme-even](https://github.com/rbardini/jsonresume-theme-even), with significant modifications to the styling and layout. The live preview editor also comes from his repository.

## Quick Start

### First Time Setup

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Build custom theme:
   ```bash
   npm run theme:install    # Install theme-src dependencies
   npm run theme:build      # Build and link custom theme
   ```

3. Build resume:
   ```bash
   npm run build            # Generate index.html and assets/resume.pdf
   ```

4. Preview:
   ```bash
   npm run serve            # View at http://localhost:3000
   ```

### Build Scripts

**Individual commands:**
```bash
npm run validate           # Validate resume.json
npm run build:html         # Export to index.html (even theme)
npm run build:pdf          # Export to assets/resume.pdf (custom theme)
npm run serve              # Serve locally at http://localhost:3000
npm run dev                # Build and serve (even theme)
npm run clean              # Remove all dependencies and build artifacts
```

### Custom Theme Development

A custom theme is available in `theme-src/`.

**Making changes to the theme:**
1. Run theme editor with live preview
   ```bash
   npm run theme:preview
   ```
2. Edit files in `theme-src/`
3. Rebuild:
   ```bash
   npm run theme:build      # Build, copy to themes/custom/dist, and link
   npm run build            # Generate resume with new theme
   ```

## Manual Export

**Export to HTML using Resumed:**
```bash
npx resumed render resume.json --theme jsonresume-theme-even -o index.html
```

**Export to PDF using Resumed:**
```bash
npx resumed export resume.json --theme jsonresume-theme-even --output assets/resume.pdf

```
