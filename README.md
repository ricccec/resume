# My Resume

Read it [here](https://ricccec.github.io/resume/) or download it [here](https://ricccec.github.io/resume/assets/resume.pdf).

This repository contains my resume in [JSON Resume](https://jsonresume.org/) format, along with related assets (photo, papers, etc.).

## Quick Start

Install dependencies:
```bash
npm install --legacy-peer-deps
```

### Build Scripts

**Build everything (validate + HTML + PDF):**
```bash
npm run build
```

**Individual commands:**
```bash
npm run validate      # Validate resume.json
npm run build:html    # Export to index.html
npm run build:pdf     # Export to assets/resume.pdf
npm run serve         # Serve locally at http://localhost:3000
npm run dev           # Build and serve
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

**Working themes:**
- `jsonresume-theme-even` - supports all sections (work, education, projects, publications)
- `@jsonresume/jsonresume-theme-class` - clean design

**Note:** The `@jsonresume/jsonresume-theme-professional` theme is not compatible with `resumed` or `resume-cli`.

