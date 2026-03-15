#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const inputPath = process.argv[2] || 'resume.json';
const outputPath = process.argv[3] || 'assets/resume.tex';

function readJSON(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    console.error('Failed to read or parse', p, e.message);
    process.exit(2);
  }
}

function esc(s) {
  if (s === undefined || s === null) return '';
  return String(s)
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/%/g, '\\%')
    .replace(/&/g, '\\&')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
}

const resume = readJSON(inputPath);
const b = resume.basics || {};

let out = `\\documentclass[a4paper]{article}
    \\usepackage{fullpage}
    \\usepackage{amsmath}
    \\usepackage{amssymb}
    \\usepackage{textcomp}
    \\usepackage[utf8]{inputenc}
    \\usepackage[T1]{fontenc}
    \\textheight=10in
    \\pagestyle{empty}
    \\raggedright
    \\usepackage[left=0.8in,right=0.8in,bottom=0.8in,top=0.8in]{geometry}

    %\\renewcommand{\\encodingdefault}{cg}
%\\renewcommand{\\rmdefault}{lgrcmr}

\\def\\bull{\\vrule height 0.8ex width .7ex depth -.1ex }

% DEFINITIONS FOR RESUME %%%%%%%%%%%%%%%%%%%%%%%

\\newcommand{\\area} [2] {
    \\vspace*{-9pt}
    \\begin{verse}
        \\textbf{#1}   #2
    \\end{verse}
}

\\newcommand{\\lineunder} {
    \\vspace*{-8pt} \\\\\n+    \\hspace*{-18pt} \\hrulefill \\\\\n+}

\\newcommand{\\header} [1] {
    {\\hspace*{-18pt}\\vspace*{6pt} \\textsc{#1}}
    \\vspace*{-6pt} \\lineunder
}

\\newcommand{\\employer} [3] {
    { \\textbf{#1} (#2)\\\\ \\underline{\\textbf{\\emph{#3}}}\\\\  }
}

\\newcommand{\\contact} [3] {
    \\vspace*{-10pt}
    \\begin{center}
        {\\Huge \\scshape {#1}}\\\\
        #2 \\\\ #3
    \\end{center}
    \\vspace*{-8pt}
}

\\begin{document}
\\vspace*{-40pt}

%==== Profile ====%
\\vspace*{-10pt}
\\begin{center}
    {\\Huge \\scshape ${esc(b.name || '')}}\\\\
    ${esc((b.location && b.location.address) || '')} $\\cdot$ ${esc(b.email || '')} $\\cdot$ ${esc(b.phone || '')}\\\\
\\end{center}
\\vspace*{-8pt}
\n`;

// Education
out += `\n%==== Education ====%\n\\header{Education}\n`;
if (Array.isArray(resume.education) && resume.education.length > 0) {
  const edu = resume.education[0];
  out += `\\textbf{${esc(edu.institution || '')}}\\\\\n${esc((edu.studyType ? edu.studyType + ' ' : '') + (edu.area || ''))}\\\\\n`;
  if (edu.score) out += `${esc(edu.score)}\\\\\n`;
  out += `\\vspace{2mm}\n`;
} else {
  out += `\\textbf{${esc(b.location && b.location.city ? b.location.city : '')}}\\\\\n`;
}

// Experience
out += `\n%==== Experience ====%\n\\header{Experience}\n\\vspace{1mm}\n`;
if (Array.isArray(resume.work)) {
  for (const w of resume.work) {
    out += `\\hfill ${esc(w.location || '')}\\\\\n\\textit{${esc(w.position || '')}}\\\\\n\\vspace{-1mm}\n\\begin{itemize} \\itemsep 1pt\n`;
    if (Array.isArray(w.highlights)) {
      for (const h of w.highlights) out += `\\t\\item ${esc(h)}\n`;
    } else if (w.summary) {
      out += `\\t\\item ${esc(w.summary)}\n`;
    }
    out += `\\end{itemize}\n`;
  }
}

// Projects
if (Array.isArray(resume.projects) && resume.projects.length) {
  out += `\\header{Projects}\n`;
  for (const p of resume.projects) {
    out += `{\\textbf{${esc(p.name || '')}}} {\\sl ${esc((p.keywords || []).join(', '))}} \\hfill ${esc(p.url || '')}\\\\\n${esc(p.description || '')}\\\\\n\\vspace*{2mm}\n`;
  }
}

// Publications
if (Array.isArray(resume.publications) && resume.publications.length) {
  out += `\\header{Publications}\\n`;
  for (const pub of resume.publications) {
    out += `\\textbf{${esc(pub.name || '')}} \\hfill ${esc(pub.publisher || '')}\\\\\n${esc(pub.url || '')}\\\\\n\\vspace*{2mm}\n`;
  }
}

out += `\n\\end{document}\n`;

// ensure output directory exists
try {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
} catch (e) {
  console.error('Failed to create output directory', e.message);
  process.exit(3);
}

fs.writeFileSync(outputPath, out, 'utf8');
console.log('Wrote', outputPath);
