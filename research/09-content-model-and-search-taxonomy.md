# Content model and search taxonomy

This is research for a future implementation, not a website design commitment. It records the structures needed to prevent content gaps and make search genuinely useful.

## Core entities

### Qualification

- `id`, `title`, `short_title`, `awarding_body`, `code`, `qualification_type`
- current specification version and checked date
- grade scale and terminal rule
- MEA sequence and local status

### Component or unit

- code and title
- exam/NEA type
- duration, raw marks, UMS, weighting, GLH
- calculator rule
- sections/task structure
- dependencies and terminal-order rules

### Topic and objective

- official number/code and exact title
- student-friendly title and explanation
- parent topic/component
- prerequisite and related topics
- MEA year/term
- “know,” “apply,” “calculate,” “create” or “evaluate” demand

### Concept

- definition and non-example
- common synonyms/abbreviations
- worked example
- misconceptions and contrasts
- formula/diagram/media example as relevant
- sources and last checked date

### Assessment skill

- command word/question family
- marks and assessment objective/performance objective
- success criteria
- common errors
- scaffold levels and model fragments that do not copy live material
- qualification-scoped school method, including whether it is forbidden outside that qualification

For MEA Pearson Business, store BLT as a qualification-scoped scaffold:

- `scaffold_id = business_1bs0_blt`
- `qualification_id = business-1bs0`
- `name = Because, Leads To, Therefore`
- `unit_of_reasoning = one three-mark explanation`
- `steps = because, leads_to, therefore`
- `sentence_pattern = [business point] because [reason]. This leads to [consequence]. Therefore, [final effect].`
- `because_may_start_sentence = false`
- `allowed_qualification_ids = [business-1bs0]`
- `blocked_qualification_ids = [enterprise-j837, computer-science-j277, creative-imedia-j834]`

The renderer, question generator, worked-example library, hints and feedback engine must all respect this scope. A shared concept such as marketing or break-even must not cause the Enterprise interface to inherit the Business BLT scaffold.

### Practical skill

- software/language-independent goal
- MEA tool/language procedure
- evidence/output requirements
- practice brief/task status
- assessment-integrity constraints

### Question

- qualification, component, topic(s), objective(s)
- command, marks, difficulty and estimated time
- stimulus/context
- answer, mark points/level criteria and feedback codes
- copyright/source or original-content status
- live-assignment exclusion flag

### Resource

- type, title, creator, URL
- exact course/version alignment
- free/paid/login
- authority tier
- accessibility/captions
- license/embed status
- checked date and link status

### Misconception

- incorrect belief/pattern
- diagnostic question
- correction and contrasting example
- affected topics/questions
- examiner-report source

### Revision event

- student, topic/skill, due date, reason
- last attempt, outcome, confidence and error type
- next interval and exam/NEA deadline constraints

## Hierarchical keys

Examples:

- `business.1bs0.theme1.1_3.1_3_2.break_even`
- `enterprise.j837.r067.ta3.break_even`
- `computer_science.j277.paper1.1_2.4.image_file_size`
- `imedia.j834.r093.ta3.storyboard`
- `imedia.j834.r095.ta1.comic_panels`

Cross-course concepts such as break-even should be related but not merged blindly. Pearson and OCR may use different depth, context or wording.

## Search fields and weighting

Recommended searchable fields, highest weight first:

1. exact code/title (`R095`, `1.3.2`, `J277/02`);
2. canonical topic/concept title;
3. aliases, abbreviations and common misspellings;
4. plain-language question (“how do I calculate break even?”);
5. definition and keywords;
6. misconception text;
7. resource/video title;
8. source/examiner-report notes.

Search results should show:

- course badge and component;
- result type: learn, practise, exam technique, formula, practical skill, resource or plan;
- why it matched;
- authority/checked date for factual guidance;
- an exact-course warning if a similarly named topic exists elsewhere.

## Facets

- Course/qualification.
- Year 10 or Year 11.
- Paper/unit/task.
- Topic area.
- Content, calculation, exam technique, programming, software skill or NEA skill.
- Learn, retrieve, apply, practise, review.
- Mark tariff/command word.
- Free/external/login/paid.
- Official/MEA/third-party.
- Current, historical or needs confirmation.

## Synonym and alias seed list

### Qualification aliases

- `edexcel business`, `pearson business`, `business gcse`, `1BS0`
- `camnat enterprise`, `enterprise`, `enterprise and marketing`, `J837`, `R067`, `R068`, `R069`
- `OCR computing`, `computer science`, `CS`, `J277`, `paper 1`, `paper 2`
- `imedia`, `creative imedia`, `J834`, `R093`, `R094`, `R095`, `comic course`

### MEA answer-method aliases

- `BLT`, `because leads to therefore`, `business BLT`, `three mark chain`
- BLT searches should route only to Pearson Business 1BS0 answer technique.

### Business/Enterprise

- `break even`, `breakeven`, `break-even`, `BEP`
- `turnover`, `sales revenue`, `revenue`
- `cash flow`, `cashflow`, `net cash flow`
- `market research`, `primary research`, `secondary research`
- `target market`, `customer segment`, `customer profile`
- `4Ps`, `four Ps`, `marketing mix`
- `sole trader`, `sole proprietor`
- `limited company`, `Ltd`, `private limited company`
- `USP`, `unique selling point`, `differentiation`
- `promotion`, `advertising`, `sales promotion`, while keeping their meanings distinct
- `ARR`, `average rate of return`
- `JIT`, `just in time`

### Computer Science

- `CPU`, `processor`, `central processing unit`
- `FDE`, `fetch decode execute`, `fetch–decode–execute`
- `ALU`, `CU`, `MAR`, `MDR`, `PC`, `ACC`
- `RAM`, `ROM`, `primary memory`, `primary storage`
- `secondary storage`, `backing storage`
- `SSD`, `solid state`
- `LAN`, `WAN`, `network topology`
- `IP address`, `internet protocol address`; `MAC address`
- `DoS`, `denial of service`; `SQL injection`, `SQLi`
- `DPA`, `Data Protection Act`; `CMA`, `Computer Misuse Act`; `CDPA`
- `pseudocode`, `pseudo-code`, `ERL`, `exam reference language`
- `subprogram`, `procedure`, `function`, with distinctions preserved
- `validation`, `verification`, with a misconception contrast
- `IDE`, `integrated development environment`
- `Boolean`, `logic gate`, `truth table`

### Creative iMedia

- `client brief`, `brief`, `requirements`
- `target audience`, `audience demographics`
- `mise en scene`, `mise-en-scène`
- `pre production`, `pre-production`
- `moodboard`, `mood board`; `mindmap`, `mind map`
- `wireframe`, `wire frame`
- `visualisation diagram`, `visualization diagram`
- `recce`, `location reconnaissance`
- `raster`, `bitmap`; `vector`
- `resolution`, `dimensions`, `colour depth`
- `lossy`, `lossless`, `compression`
- `speech bubble`, `speech balloon`; `thought bubble`
- `gutter`, `panel`, `splash page`, `spread`, `onomatopoeia`
- `Photoshop`, `Photopea`, `image editor`

## Misspelling seed list

- `entreprenuer`, `enterpreneur` → entrepreneur
- `breakeavan`, `break even point` → break-even
- `heirarchy` → hierarchy
- `reasearch` → research
- `algorythm` → algorithm
- `psuedocode` → pseudocode
- `denary` should not be auto-corrected to binary; it is a valid term
- `defragmention` → defragmentation
- `story board` → storyboard
- `copywrite` → copyright
- `imeda`, `imedia gcse` → Creative iMedia J834, with qualification-type correction

## Intent examples

- “How long is business paper 2?” → exact assessment fact plus current source.
- “9 marker” → ask/filter by course because Business, Enterprise and iMedia differ.
- “cash and profit difference” → show both 1BS0 and J837 results, with course badges.
- “comic task 2” → R095 Task 2 creation requirements and integrity warning.
- “how to do my R068” → teaching/practice content and student NEA rules; never generate a live response.
- “paper 2 arrays” → J277 2.2 arrays plus Section B practice.
- “red colour meaning” → R093 media codes, avoiding universal/stereotyped claims.

## Zero-result and ambiguity behaviour

- Offer corrected spellings and topic neighbours.
- Never silently send an OCR student to a different exam board.
- For ambiguous `paper 1`, ask via filter chips rather than a blocking modal.
- For a live-NEA-looking query, show the integrity boundary and permitted conceptual help.
- Log anonymous zero-result terms to improve aliases, subject to privacy policy.

## Search-ready content checks

Each published page should have:

- one canonical course and topic;
- official code where available;
- plain-language title;
- two or more aliases;
- a 160-character search summary;
- source authority and checked date;
- prerequisites and related content;
- one diagnostic/retrieval item;
- status: current, historical, draft or needs school confirmation.
