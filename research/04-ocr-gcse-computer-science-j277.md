# OCR GCSE (9–1) Computer Science — J277

## Qualification at a glance

- Linear GCSE, single tier.
- Two externally marked papers in the same May/June series.
- Each paper: 1 hour 30 minutes, 80 marks, 50%.
- Non-calculator.
- All questions are compulsory.
- Overall assessment objectives: AO1 30%; AO2 40%; AO3 30%.
- Paper 1 profile: AO1 21%, AO2 29% of the qualification.
- Paper 2 profile: AO1 9%, AO2 11%, AO3 30%.

## Paper 1 — J277/01 Computer systems

Multiple-choice, short-response, medium-response and extended-response questions. It includes one eight-mark level-of-response question, usually on impacts/ethics/legal or another synoptic systems issue.

### 1.1 Systems architecture

#### 1.1.1 Architecture of the CPU

- Purpose of the CPU.
- Von Neumann architecture.
- Fetch–decode–execute cycle.
- Arithmetic Logic Unit, Control Unit and cache.
- Registers and their purposes: Memory Address Register, Memory Data Register, Program Counter and Accumulator.

#### 1.1.2 CPU performance

- Clock speed.
- Cache size.
- Number of cores.
- Why a change may improve performance and why the effect is not unlimited.

#### 1.1.3 Embedded systems

- Purpose-built computer systems inside larger devices.
- Characteristics, examples and why they are used.

### 1.2 Memory and storage

#### 1.2.1 Primary storage

- Need for primary storage.
- RAM and ROM: purpose, volatility, capacity and use.
- Virtual memory.
- Cache memory.

#### 1.2.2 Secondary storage

- Need for secondary storage.
- Optical, magnetic and solid-state media.
- Capacity, speed, portability, durability, reliability and cost.
- Choosing storage for a stated scenario.

#### 1.2.3 Units

- Bit, nibble, byte, kilobyte, megabyte, gigabyte, terabyte and petabyte.
- OCR uses decimal steps (`1 KB = 1000 bytes`); answers using 1024 are also accepted where shown correctly.
- Calculating file/storage capacity.

#### 1.2.4 Data representation

Numbers:

- Binary, denary and hexadecimal conversions.
- Binary addition with eight-bit results and overflow.
- Binary shifts and their effect.

Text:

- Character sets, number of characters and bits per character.
- ASCII/Unicode concepts at the required level.

Images:

- Pixels, metadata, resolution and colour depth.
- How properties change quality and file size.
- `image size in bits = colour depth × width × height`.

Sound:

- Sampling, sample rate and bit depth.
- How properties change quality and file size.
- `sound size in bits = sample rate × duration × bit depth`.

Text size:

- `text size in bits = number of characters × bits per character`.

Compression:

- Need for compression.
- Lossy and lossless methods, benefits, drawbacks and suitable contexts.

### 1.3 Computer networks, connections and protocols

#### 1.3.1 Networks and topologies

- LAN and WAN.
- Factors affecting network performance.
- Client-server and peer-to-peer networks.
- Network hardware and roles.
- Star and mesh topologies.

#### 1.3.2 Wired and wireless networks, protocols and layers

- Ethernet, Wi-Fi and Bluetooth.
- Encryption.
- IP and MAC addresses.
- Standards and why they matter.
- Internet concepts: DNS, hosting, cloud, servers and clients.
- Protocols: TCP/IP, HTTP, HTTPS, FTP, POP, IMAP and SMTP.
- Concept and benefit of layers.

Students must learn precise roles. Examiners frequently see switches, hubs, routers and servers incorrectly treated as interchangeable.

### 1.4 Network security

#### Threats

- Malware.
- Social engineering, including phishing.
- Brute-force attack.
- Denial-of-service attack.
- Data interception/theft.
- SQL injection.

#### Prevention

- Penetration testing.
- Anti-malware.
- Firewalls.
- User access levels.
- Passwords.
- Encryption.
- Physical security.

For scenario questions, explain how the control blocks or reduces the named threat rather than list controls.

### 1.5 Systems software

#### Operating systems

- User interface.
- Memory management and multitasking.
- Peripheral management and drivers.
- User management.
- File management.

#### Utility software

- Encryption software.
- Defragmentation.
- Data compression.

### 1.6 Ethical, legal, cultural and environmental impacts

- Ethical, legal, cultural, environmental and privacy issues created by digital technology.
- Stakeholders and competing perspectives.
- Data Protection Act 2018.
- Computer Misuse Act 1990.
- Copyright, Designs and Patents Act 1988.
- Open-source and proprietary software: features, benefits and drawbacks.

Extended answers should cover the specific bullets in the question, consider more than one perspective and reach a supported conclusion. A generic “technology is good and bad” response does not show developed reasoning.

## Paper 2 — J277/02 Computational thinking, algorithms and programming

### Assessment format

- Section A: 50 marks on theory and application, including a six-mark point-based extended response.
- Section B: 30 marks on designing, writing, testing and refining algorithms/programs.
- OCR states that around 10–15% of the qualification assesses precise algorithm creation.
- Design responses may use suitable pseudocode, flowcharts or other clear representations.
- Write/refine responses must use the OCR Exam Reference Language or a high-level language.
- Minor syntax errors are not automatically fatal when the intended algorithm is unambiguous, but logic, assignment direction, boundaries and output still matter.

### 2.1 Algorithms

#### Computational thinking

- Abstraction.
- Decomposition.
- Algorithmic thinking.

#### Designing and evaluating algorithms

- Inputs, processes and outputs.
- Structure diagrams.
- Pseudocode and flowcharts.
- OCR Exam Reference Language.
- Identify, correct and complete algorithms.
- Trace tables and dry runs.
- Sequence, selection, iteration and nested structures.
- Compare algorithms for correctness and efficiency at GCSE level.

#### Searching

- Linear search.
- Binary search.
- Apply the steps, identify suitable conditions and explain the prerequisite of sorted data for binary search.

#### Sorting

- Bubble sort.
- Merge sort.
- Insertion sort.
- Students need to apply/trace and recognise the methods, not memorise a full implementation unless it supports understanding.

### 2.2 Programming fundamentals

- Variables and constants.
- Operators: arithmetic, comparison and Boolean.
- Inputs, outputs and assignment.
- Sequence, selection and iteration.
- Integer/real, Boolean, character and string data types.
- Casting.
- String manipulation.
- File handling.
- Records.
- One-dimensional and two-dimensional arrays.
- Subprograms: procedures and functions, parameters, return values, local/global scope.
- Random-number generation.
- SQL at the required level: `SELECT`, `FROM`, `WHERE`.

Common exam-risk areas:

- confusing assignment with equality;
- off-by-one loop boundaries;
- treating an array as if it contains one value;
- adding new input when a parameter is already supplied;
- failing to update counters/totals;
- printing inside a loop when output belongs after the loop;
- ignoring the exact output or validation rule in the question.

### 2.3 Producing robust programs

#### Defensive design

- Anticipating misuse.
- Authentication.
- Input validation.
- Maintainability: comments, meaningful names, indentation and subprograms.

#### Testing

- Iterative testing and final/terminal testing.
- Syntax and logic errors.
- Normal, boundary, invalid and erroneous test data.
- Test plans, expected results, actual results and corrective action.
- Refine an algorithm/program from evidence.

Maintainability is not the same as testing. A student must state how a technique makes code easier to understand, change, reuse or debug.

### 2.4 Boolean logic

- AND, OR and NOT gates.
- Truth tables.
- Logic diagrams.
- Combined expressions/circuits.
- Translate among description, expression, diagram and truth table.

### 2.5 Programming languages and integrated development environments

#### Languages and translation

- High-level and low-level languages.
- Need for translators.
- Compiler and interpreter: purpose, differences, benefits and drawbacks.

#### IDEs

- Editors.
- Error diagnostics.
- Run-time environment.
- Translators.
- How each feature supports development.

## Practical programming requirement

Students must be given practical programming experience during the course, and the centre submits a statement confirming this. It is not a separately marked NEA. Practical work is essential preparation for Paper 2, especially Section B.

The specification allows any suitable text-based high-level language. MEA should confirm its actual language before the site creates language-specific exercises. A language-independent algorithm view plus a selectable Python/reference-language view would be robust.

## What the 2024 examiner reports highlight

Across both papers:

- Students with regular practical programming experience respond more confidently to algorithms.
- Attempt every subpart; decomposition often allows later marks even if an earlier piece is wrong.
- Definitions must be precise rather than examples or vague benefits.
- Use the scenario: explain why a feature matters here.

Paper 1 issues:

- Confusing network devices and their roles.
- Treating the Program Counter as storing programs rather than an address.
- Confusing sample rate with bit depth.
- Giving invalid IP-address formats.
- One-sided eight-mark responses with no supported recommendation.

Paper 2 issues:

- Examples given where definitions were asked for.
- Weak array and loop control.
- Exclusive boundary tests where inclusive comparison is required.
- Overcomplicated algorithms.
- Taking extra user input instead of using a supplied parameter.
- Confusing code maintainability with test strategy.

## Product implications

- Every topic needs four modes: learn, retrieve, apply and exam practice.
- The algorithm lab should support tracing line by line, variable-state tables, boundary testing and progressive hints.
- Search must recognise both “pseudocode” and “OCR Exam Reference Language/ERL.”
- File-size practice should make units visible and enforce conversion reasoning.
- Threat/security questions should be paired so students justify a control for a named attack.
- Extended responses need bullet coverage and supported conclusion checklists, not memorised essays.

## Primary sources

- Qualification page: https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/
- Assessment page: https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/assessment/
- Specification: https://www.ocr.org.uk/Images/558027-specification-gcse-computer-science-j277.pdf
