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
   npm run export           # Validate and export HTML, PDF and TeX
   ```

4. Preview:
   ```bash
   npm run serve            # View at http://localhost:3000
   ```

### Build Scripts

**Individual commands:**
```bash
npm run validate           # Validate resume.json
npm run export:html        # Export to index.html (even theme)
npm run export:pdf         # Export to assets/resume.pdf (custom theme)
npm run export:tex         # Export to assets/resume.tex (LaTeX)
npm run export             # Runs validate, export:html, export:pdf, export:tex
npm run serve              # Serve locally at http://localhost:3000
npm run dev                # Export and serve
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
   npm run export           # Generate resume with new theme
   ```

## Manual Export

**Export to HTML using Resumed:**
```bash
npx resumed render resume.json --theme jsonresume-theme-even -o index.html
```

**Export to PDF using Resumed:**
```bash
npx resumed export resume.json --theme jsonresume-theme-custom --output assets/resume.pdf

```

## PDF export troubleshooting

The PDF export uses Puppeteer's bundled Chromium. On some Linux systems Chromium requires additional system libraries; if you see errors like "libnspr4.so: cannot open shared object file", install the OS packages below and retry the build.

Debian / Ubuntu:
```bash
sudo apt-get update
sudo apt-get install -y libnspr4 libnss3 libxss1 libasound2 libatk1.0-0 libcups2 libdrm2 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libpango-1.0-0 fonts-liberation
```

Fedora / CentOS:
```bash
sudo dnf install -y libnspr libnss libXss alsa-lib atk cups libdrm libX11-xcb libXcomposite libXdamage libXrandr mesa-libgbm pango liberation-fonts
```

After installing the packages, re-run:
```bash
npm run export
```
