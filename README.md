# My Resume

Read it [here](https://ricccec.github.io/resume/) or download it [here](https://ricccec.github.io/resume/assets/resume.pdf).

This repository contains my resume in [JSON Resume](https://jsonresume.org/) format, along with related assets (photo, papers, etc.).

## Quick Start

### First Time Setup

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Build custom theme:
   ```bash
   npm run theme:install    # Install theme-src dependencies
   npm run theme:rebuild    # Build and link custom theme
   ```

3. Build resume:
   ```bash
   npm run build:custom     # Generate index.html and assets/resume.pdf
   ```

4. Preview:
   ```bash
   npm run serve           # View at http://localhost:3000
   ```

**Or use the all-in-one command:**
```bash
npm run theme:dev          # Builds theme, generates resume, and serves
```

### Build Scripts

**Build everything (validate + HTML + PDF):**
```bash
npm run build              # Using jsonresume-theme-even
npm run build:custom       # Using custom theme
```

**Individual commands:**
```bash
npm run validate           # Validate resume.json
npm run build:html         # Export to index.html (even theme)
npm run build:html:custom  # Export to index.html (custom theme)
npm run build:pdf          # Export to assets/resume.pdf (even theme)
npm run build:pdf:custom   # Export to assets/resume.pdf (custom theme)
npm run serve              # Serve locally at http://localhost:3000
npm run dev                # Build and serve (even theme)
npm run dev:custom         # Build and serve (custom theme)
```

### Custom Theme Development

A custom theme is available in `theme-src/` (source) and `themes/custom/` (built version).

**Making changes to the theme:**
1. Edit files in `theme-src/`
2. Rebuild:
   ```bash
   npm run theme:rebuild    # Build, copy to themes/custom/dist, and link
   npm run build:custom     # Generate resume with new theme
   ```

**Or use the quick iteration command:**
```bash
npm run theme:dev          # Rebuilds everything and serves
```

See [`themes/custom/README.md`](themes/custom/README.md) for more details.

## Manual Export

**Export to HTML using Resumed:**
```bash
npx resumed render resume.json --theme jsonresume-theme-even -o index.html
```

**Export to PDF using Resumed:**
```bash
npx resumed export resume.json --theme jsonresume-theme-even --output assets/resume.pdf
```

**Working themes:**
- `jsonresume-theme-even` - supports all sections (work, education, projects, publications)
- `@jsonresume/jsonresume-theme-class` - clean design

**Note:** The `@jsonresume/jsonresume-theme-professional` theme is not compatible with `resumed` or `resume-cli`.

