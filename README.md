# My Resume# My Resume

This repository contains my resume in [JSON Resume](https://jsonresume.org/) format, along with related assets (photo, papers, etc.).

The resume can be exported to HTML or PDF using the [JSON Resume CLI](https://github.com/jsonresume/resume-cli) or to PDF using [Resumed](https://github.com/rbardini/resumed)

```bash
# JSON Resume CLI
npm install -g resume-cli@latest
# Resumed
npm install resumed jsonresume-theme-even
```

**Export to HTML using Resumed (recommended):**
```bash
npx resumed render resume.json --theme jsonresume-theme-even -o index.html
```

**Export to PDF using Resumed (recommended):**
```bash
# Install puppeteer (required for PDF generation)
npm install puppeteer
# Export to PDF
npx resumed export resume.json --theme jsonresume-theme-even --output resume.pdf
```

**Note:** I could not make `@jsonresume/jsonresume-theme-professional` work with neither `resumed` or `resume-cli`.

