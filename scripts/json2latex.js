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

function year(d) {
  if (!d) return '';
  if (d.length >= 4) return d.slice(0,4);
  return d;
}

const resume = readJSON(inputPath);
const b = resume.basics || {};

const tpl = `%-------------------------
% Resume in Latex
% Author : __NAME__
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

%----------FONT OPTIONS----------
% sans-serif
% \\usepackage[sfdefault]{FiraSans}
% \\usepackage[sfdefault]{roboto}
% \\usepackage[sfdefault]{noto-sans}
% \\usepackage[default]{sourcesanspro}

% serif
% \\usepackage{CormorantGaramond}
% \\usepackage{charter}

\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge __NAME__} \\\\ \\vspace{8pt}
    __ROLE__ \\\\ \\vspace{2pt}
    \\mbox{\\scriptsize$\\Diamond$ \\small __CITY__}
    \\mbox{\\scriptsize$\\Diamond$ \\small __EMAIL__}
    \\mbox{\\scriptsize$\\Diamond$ \\small __PHONE__}
    \\mbox{\\scriptsize$\\Diamond$ \\small __URL__}
\\end{center}

\\section{Summary}
  \\resumeSubHeadingListStart
    \\item{__SUMMARY__}
  \\resumeSubHeadingListEnd

\\section{Experience}
  \\resumeSubHeadingListStart
__EXPERIENCE__
  \\resumeSubHeadingListEnd

\\section{Education}
  \\resumeSubHeadingListStart
__EDUCATION__
  \\resumeSubHeadingListEnd

\\section{Projects}
  \\resumeSubHeadingListStart
__PROJECTS__
  \\resumeSubHeadingListEnd

\\section{Publications}
  \\resumeSubHeadingListStart
__PUBLICATIONS__
  \\resumeSubHeadingListEnd

\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     __SKILLS__
    }}
 \\end{itemize}

\\section{GDPR}
  \\resumeSubHeadingListStart
    \\item{\\emph{Autorizzo il trattamento dei miei dati personali ai sensi dell'art. 13 Dlgs 196 del 30 giugno 2003 e dell'art. 13 GDPR (Regolamento UE 2016/679) ai fini della ricerca e selezione del personale.}}
    \\item{\\today \\hfill __NAME__}
  \\resumeSubHeadingListEnd

\\end{document}
`;

function joinItems(arr, wrapperStart, wrapperEnd, itemCb) {
  if (!Array.isArray(arr) || arr.length === 0) return '';
  const parts = [];
  for (const it of arr) parts.push(itemCb(it));
  return wrapperStart + '\n' + parts.join('\n') + '\n' + wrapperEnd;
}

// Build EXPERIENCE
let exp = '';
if (Array.isArray(resume.work)) {
  const parts = [];
  for (const w of resume.work) {
    const start = year(w.startDate || '');
    const end = year(w.endDate || '');
    const dates = start && end ? `${start} -- ${end}` : (start || end || '');
    const title = esc(w.position || '');
    const employer = esc(w.location || '');
    
    let txt = '    \\resumeSubheading\n      {' + title + '}{' + dates + '}\n      {' + employer + '}{}';
    
    const itemLines = [];
    if (w.summary) {
      itemLines.push('        \\resumeItem{' + esc(w.summary) + '}');
    }
    if (Array.isArray(w.highlights) && w.highlights.length > 0) {
      itemLines.push('        \\resumeItem{\\emph{' + w.highlights.map(k => esc(k)).join(' $\\cdot$ ') + '}}');
    }
    
    if (itemLines.length > 0) {
      txt += '\n      \\resumeItemListStart\n' + itemLines.join('\n') + '\n      \\resumeItemListEnd';
    }
    parts.push(txt);
  }
  exp = parts.join('\n\n');
}

// Education
let edu = '';
if (Array.isArray(resume.education)) {
  const parts = [];
  for (const e of resume.education) {
    const dates = esc((e.startDate || '') + (e.endDate ? ' -- ' + e.endDate : ''));
    let txt = '    \\resumeSubheading\n      {' + esc(e.studyType || '') + ' in ' + esc(e.area || '') + '}{' + dates + '}\n      {' + esc(e.institution || '') + '}{}';
    if (e.score) {
      txt += '\n      \\resumeItemListStart\n        \\resumeItem{' + esc(e.score || '') + '}\n      \\resumeItemListEnd';
    }
    parts.push(txt);
  }
  edu = parts.join('\n\n');
}

// Projects
let proj = '';
if (Array.isArray(resume.projects)) {
  const parts = [];
  for (const p of resume.projects) {
    let txt = '    \\resumeProjectHeading\n        {\\textbf{' + esc(p.name || '') + '} $|$ \\emph{' + ((p.keywords || []).map(k => esc(k)).join(' $\\cdot$ ')) + '}}{' + esc(p.url || '') + '}';
    if (p.description) {
      txt += '\n        \\resumeItemListStart\n          \\resumeItem{' + esc(p.description) + '}\n        \\resumeItemListEnd';
    }
    parts.push(txt);
  }
  proj = parts.join('\n\n');
}

// Publications
let pubs = '';
if (Array.isArray(resume.publications)) {
  const parts = [];
  for (const p of resume.publications) {
    let txt = '    \\resumeSubheading\n      {' + esc(p.name || '') + '}{}\n      {' + esc(p.publisher || '') + '}{}';
    if (p.url) {
      txt += '\n      \\resumeItemListStart\n        \\resumeItem{Available at \\emph{' + esc(p.url) + '}}\n      \\resumeItemListEnd';
    }
    parts.push(txt);
  }
  pubs = parts.join('\n\n');
}

// Skills
const allSkills = (resume.skills || []).map(s => s.name || '');
let skillsCompiled = `\\textbf{Languages}{: ${esc(allSkills.join(', '))} }`;
if (allSkills.length === 0) {
  skillsCompiled = `\\textbf{Languages}{: Java, TypeScript, Python, C/C++, SQL, PHP, VHDL } \\\\
     \\textbf{Frameworks}{: Electron.js, Node.js, React} \\\\
     \\textbf{Developer Tools}{: Git, VS Code, Eclipse}`;
}

// Location
let city = '';
if (b.location && b.location.city) {
  city = b.location.city;
  if (b.location.countryCode) {
    city += ', ' + b.location.countryCode;
  }
}

const final = tpl
  .replace(/__NAME__/g, esc(b.name || ''))
  .replace('__ROLE__', esc(b.label || ''))
  .replace('__CITY__', esc(city || ''))
  .replace('__EMAIL__', esc(b.email || ''))
  .replace('__PHONE__', esc(b.phone || ''))
  .replace('__URL__', esc(b.url ? b.url.replace(/^https?:\/\//, '') : ''))
  .replace('__SUMMARY__', esc((resume.summary) || (resume.basics && resume.basics.summary) || ''))
  .replace('__EXPERIENCE__', exp)
  .replace('__EDUCATION__', edu)
  .replace('__PROJECTS__', proj)
  .replace('__PUBLICATIONS__', pubs)
  .replace('__SKILLS__', skillsCompiled);

try {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, final, 'utf8');
  console.log('Wrote', outputPath);
} catch (e) {
  console.error('Failed to write', outputPath, e.message);
  process.exit(3);
}
