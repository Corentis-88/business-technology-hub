# Assessment integrity and content governance

This is a critical requirement because J837 and J834 contain live non-examined assessment (NEA).

## Safe source classes

### Student-public and suitable for linking

- Current specifications.
- Public past papers, mark schemes and examiner/moderator reports.
- Public sample assessment materials and sample assignments.
- OCR’s student guide to NEA and plagiarism poster.
- Awarding-body public blogs/videos.
- Licensed or linkable third-party teaching material.

### Teacher-only or secure — do not expose

- Teach Cambridge candidate exemplars.
- Secure practice papers/materials.
- Live OCR-set assignments.
- Centre-specific student work.
- Marking/standardisation material restricted to teachers.

OCR explicitly says Cambridge National candidate exemplars are strictly for teacher use and must not be shown, printed or electronically shared with students. Misuse can affect acceptance of work and trigger malpractice investigation.

## Live assignment rule

- Live assignments are for formal summative assessment only.
- They must not be used for practice.
- Teachers must not keep past live assignments and later reuse them for practice.
- Public sample assignments are the safe basis for practice.
- The correct live assignment/version must be obtained by authorised staff from Teach Cambridge.

The site should store a resource flag such as `assessment_security = public_sample | public_past | secure_teacher | live_never_store` and hard-block the final two from student publishing.

## Permitted NEA help

- Teach the underlying specification knowledge and practical skills.
- Use unrelated fictional briefs or OCR public sample assignments.
- Explain a command word or technical concept.
- Demonstrate software tools on unrelated assets.
- Teach research ethics, referencing, file management, evidence capture and testing.
- Provide the exact factual “You must” bullets from a task as a completion checklist if authorised, without adding prompts.
- Encourage students to ask their teacher when uncertain.

## Unsafe help

- Generating content, calculations, research findings, design rationale, reviews or pitch text for the student’s live assignment.
- Creating an answer template that tells students what points to make.
- Adding prompts beyond the assignment that lead students to marks.
- Editing a student’s live response into a mark-winning answer.
- Uploading or discussing details/images of the live assignment.
- Giving the same detailed scaffold to a cohort where it constitutes over-direction.
- Showing candidate exemplars.

OCR says students may create their own templates or use externally sourced templates if referenced and not pre-populated with mark-earning responses. Teachers must not provide extra templates for live work unless OCR supplies them. A checklist containing only the task’s factual “You must” bullets may be acceptable; extra prompts risk over-direction.

## Supervision and authentication

OCR’s January 2026 FAQ clarifies that Cambridge National NEA is not conducted under full exam-room conditions, but:

- work must be completed in supervised sessions;
- supervision must allow the work to be authenticated;
- students may use permitted class notes, research and textbooks;
- students must not write assignment responses outside supervised lessons;
- work must remain secure, including cloud-stored work;
- students cannot share or discuss their work during completion.

The website should therefore have a **learning/practice mode**, not a live-assignment workspace, unless MEA designs a separately governed authenticated system with the exams/subject team.

## AI and plagiarism

- Students must submit their own work and use their own words where required.
- Internet, book and AI-derived material must be acknowledged according to current JCQ/OCR rules.
- Referencing AI output does not automatically make it acceptable evidence of the student’s own knowledge, understanding or skill.
- AI output may be wrong, biased or contain false references.
- The latest JCQ “AI Use in Assessments” guidance and the current qualification specification override any static website explanation.

Recommended site behaviour for live-NEA-looking requests:

1. state that the site cannot create or improve assessed content;
2. offer a definition, general lesson or unrelated practice task;
3. direct the student to their teacher for task-specific clarification;
4. do not retain/upload live brief details or student evidence.

## Copyright and licensing

- Link to public papers on awarding-body pages where possible.
- Do not republish full papers, paid textbooks, video transcripts or third-party question banks without permission.
- Record source, owner, license, embed permission and attribution requirements.
- The Learning Scientists’ six-strategy materials are licensed CC BY-NC-ND 4.0: educational sharing with attribution is allowed, but no commercial use or modified excerpts under that licence.
- Original MEA questions should avoid copying identifiable contexts/wording from live or copyrighted papers.
- The MEA logo should be used with school/Trust approval and brand rules.

## Data protection and safeguarding

Before building accounts/progress tracking, MEA should define:

- lawful basis and privacy notice;
- minimum student data required;
- retention/deletion periods;
- parent/carer information where needed;
- role permissions for students, teachers and admins;
- no public display of student names, marks or work;
- moderation/reporting route for user-generated content;
- accessibility and SEND accommodations;
- whether external video/platform embeds set cookies or transfer data.

## Content publication workflow

1. Author against the exact specification objective.
2. Add primary source and checked date.
3. Run assessment-security/copyright check.
4. Subject specialist reviews accuracy and level.
5. Accessibility and reading-level check.
6. Publish with version/status.
7. Schedule annual review and immediate review when an awarding-body update arrives.

## Sources

- OCR exemplar restriction: https://www.ocr.org.uk/administration/support-and-tools/subject-updates/cambridge-nationals-exemplars-723865
- OCR practice/live assignment FAQ: https://support.ocr.org.uk/hc/en-gb/articles/20992751555346-Cambridge-Nationals-NEA-FAQs-Can-I-use-past-assignments-and-the-sample-assessment-materials-SAMs-to-practice-with-our-students
- OCR templates/checklists FAQ: https://support.ocr.org.uk/hc/en-gb/articles/20992851638034-Cambridge-Nationals-NEA-FAQs-Use-of-templates-and-checklists
- OCR supervision FAQ: https://support.ocr.org.uk/hc/en-gb/articles/31399633653266-Do-the-NEA-tasks-need-to-be-completed-in-exam-conditions
- OCR AI/referencing FAQ: https://support.ocr.org.uk/hc/en-gb/articles/21428106620562-Cambridge-Nationals-NEA-FAQs-Referencing-internet-sources-and-AI
- JCQ candidate guidance: https://www.jcq.org.uk/exams-office/information-for-candidates/
