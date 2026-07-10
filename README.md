# MEA Business and Technology Hub

A local, testable website helping students easily learn and revise topics at MEA in Business and Technology:

- Pearson Edexcel GCSE Business (1BS0)
- OCR Cambridge National Enterprise and Marketing (J837)
- OCR GCSE Computer Science (J277)
- OCR Cambridge National Creative iMedia (J834, including the R095 characters and comics unit)

## Run locally

From `C:\CodexWorkspace\MEAWebsite`:

```powershell
pnpm install
pnpm dev
```

Open `http://127.0.0.1:4173`. The app needs no account or database.

## Verify

```powershell
pnpm test
pnpm build
```

The production output is written to `dist`.

## What is included

- 47 qualification-mapped topic guides with key terms, worked examples, common mistakes, quizzes and exam practice
- 21 accessible visual types, including break-even charts, cash-flow models, CPU cycles, networks, algorithms, brand boards and comic layouts
- universal fuzzy search plus a visibly labelled search inside every qualification
- Learn, Concept map, Remember, Practise and Exam modes on topic pages
- clickable qualification vocabulary indexes that jump directly to the relevant topic explanation
- an Enterprise-only "Say it simpler" mode covering all 16 J837 topics, with shorter explanations, easy examples, clear word banks and section-by-section picture diagrams
- expandable unit and topic concept maps for all 47 topics, with supporting detail, linked vocabulary and text alternatives
- qualification-only quizzes of up to 50 questions and topic quizzes of up to 20
- Low, Medium and High quiz difficulty controls with deterministic, non-repeating question generation
- an MEA Business-only BLT builder for 3-, 6-, 9- and 12-mark answers
- explicit validation that `Because` cannot begin a BLT sentence
- an evidence-checked Pearson Business extended-writing lab covering Explain, Discuss, Analyse, Justify and Evaluate, including four completed Explain answers and three full-length original source-booklet cases with figures and question ladders
- qualification-separated materials with offline official specifications, sample material, public past papers, mark schemes and examiner reports
- responsive navigation, larger-text mode and print-friendly topic guides

## Content and assessment safeguards

BLT is deliberately presented only within Pearson Business. Creative iMedia and Enterprise coursework practice uses fictional or public sample briefs and does not attempt to complete live non-examined assessment work for students.

The research library used to build the prototype is in `research`, including the source catalogue, written qualification guides, the measured Pearson case-study structure and public official documents. The site serves this folder as read-only local content.
