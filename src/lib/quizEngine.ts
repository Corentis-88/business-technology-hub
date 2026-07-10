import type { Course, QuizDifficulty, QuizQuestion, Topic } from "../types";

export interface QuizSessionOptions {
  course: Course;
  topicId?: string;
  difficulty: QuizDifficulty;
  count: number;
  seed?: number;
}

export interface QuizSession {
  questions: QuizQuestion[];
  availableQuestionCount: number;
  usesReinforcement: boolean;
}

const difficultyOrder: QuizDifficulty[] = ["low", "medium", "high"];

export const difficultyFromSlider = (value: number): QuizDifficulty =>
  difficultyOrder[Math.max(0, Math.min(2, Math.round(value) - 1))];

export const difficultyLabel = (difficulty: QuizDifficulty) =>
  difficulty[0].toUpperCase() + difficulty.slice(1);

function hash(value: string) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function shuffle<T>(items: T[], key: string) {
  return items
    .map((value, index) => ({ value, order: hash(`${key}:${index}:${String(value)}`) }))
    .sort((a, b) => a.order - b.order)
    .map(({ value }) => value);
}

function compact(value: string) {
  const clean = value.replace(/\s+/g, " ").trim();
  return clean.length > 190 ? `${clean.slice(0, 187)}…` : clean;
}

function unique(values: string[]) {
  return [...new Set(values.map(compact).filter(Boolean))];
}

function makeQuestion(
  id: string,
  prompt: string,
  correct: string,
  distractors: string[],
  explanation: string,
  topic: Topic,
  difficulty: QuizDifficulty,
  seed: number,
): QuizQuestion | null {
  const optionCount = difficulty === "low" ? 3 : 4;
  const alternatives = shuffle(unique(distractors).filter((item) => item !== compact(correct)), `${id}:${seed}`);
  if (alternatives.length < optionCount - 1) return null;
  const options = shuffle([compact(correct), ...alternatives.slice(0, optionCount - 1)], `${id}:options:${seed}`);
  return {
    id,
    prompt: compact(prompt),
    options,
    answer: options.indexOf(compact(correct)),
    explanation: compact(explanation),
    difficulty,
    sourceTopicId: topic.id,
    sourceTopicTitle: topic.title,
  };
}

function directQuestion(question: QuizQuestion, topic: Topic, difficulty: QuizDifficulty, seed: number): QuizQuestion {
  const options = shuffle(question.options, `${question.id}:direct:${difficulty}:${seed}`);
  const correct = question.options[question.answer];
  const lead = difficulty === "low"
    ? ""
    : difficulty === "medium"
      ? "Think carefully: "
      : `Apply your knowledge of ${topic.title}: `;
  return {
    ...question,
    id: `${topic.id}:direct:${difficulty}:${question.id}`,
    prompt: `${lead}${question.prompt}`,
    options,
    answer: options.indexOf(correct),
    difficulty,
    sourceTopicId: topic.id,
    sourceTopicTitle: topic.title,
  };
}

function topicBank(course: Course, topic: Topic, difficulty: QuizDifficulty, seed: number) {
  const courseTopics = course.units.flatMap((unit) => unit.topics);
  const terms = courseTopics.flatMap((item) => item.keyTerms);
  const definitions = unique(terms.map((term) => term.definition));
  const termNames = unique(terms.map((term) => term.term));
  const topicTitles = unique(courseTopics.map((item) => item.title));
  const headings = unique(courseTopics.flatMap((item) => item.sections.map((section) => section.heading)));
  const explanations = unique(courseTopics.flatMap((item) => item.quiz.map((question) => question.explanation)));
  const positiveActions = unique(courseTopics.flatMap((item) => item.examTips));
  const mistakes = unique(courseTopics.flatMap((item) => item.commonMistakes));
  const questions: Array<QuizQuestion | null> = [];

  topic.quiz.forEach((question) => {
    questions.push(directQuestion(question, topic, difficulty, seed));
    const correctOption = question.options[question.answer];
    const reasoningPrompt = difficulty === "high"
      ? `Which reasoning most convincingly justifies “${correctOption}” as the answer to this question: ${question.prompt}`
      : `Why is “${correctOption}” the correct response to: ${question.prompt}`;
    questions.push(makeQuestion(
      `${topic.id}:reason:${difficulty}:${question.id}`,
      reasoningPrompt,
      question.explanation,
      explanations,
      `${question.explanation} This connects the answer to the underlying idea rather than relying on a guess.`,
      topic,
      difficulty,
      seed,
    ));
  });

  topic.keyTerms.forEach((term, index) => {
    const definitionPrompt = difficulty === "high"
      ? `Which specialist term would be most precise when explaining this idea: “${term.definition}”?`
      : `Which term matches this definition: “${term.definition}”?`;
    questions.push(makeQuestion(`${topic.id}:term-name:${difficulty}:${index}`, definitionPrompt, term.term, termNames, `${term.term} means ${term.definition}`, topic, difficulty, seed));
    questions.push(makeQuestion(`${topic.id}:term-definition:${difficulty}:${index}`, `Which explanation best defines “${term.term}”?`, term.definition, definitions, `${term.term} means ${term.definition}`, topic, difficulty, seed));
    questions.push(makeQuestion(`${topic.id}:term-link:${difficulty}:${index}`, `Complete the knowledge link: “${term.term}” is most closely connected to…`, term.definition, definitions, `The accurate link is: ${term.term} — ${term.definition}`, topic, difficulty, seed));
  });

  topic.commonMistakes.forEach((mistake, index) => {
    const prompt = difficulty === "high"
      ? `A student is reviewing ${topic.title}. Which approach below is the one they should challenge and correct?`
      : `Which is a common mistake to avoid in ${topic.title}?`;
    questions.push(makeQuestion(`${topic.id}:mistake:${difficulty}:${index}`, prompt, mistake, positiveActions, `Avoid this: ${mistake}`, topic, difficulty, seed));
  });

  topic.examTips.forEach((tip, index) => {
    const prompt = difficulty === "high"
      ? `Which action would make an exam response on ${topic.title} more precise and convincing?`
      : `Which action would strengthen an answer on ${topic.title}?`;
    questions.push(makeQuestion(`${topic.id}:tip:${difficulty}:${index}`, prompt, tip, mistakes, `A strong approach is to ${tip.charAt(0).toLowerCase()}${tip.slice(1)}`, topic, difficulty, seed));
  });

  topic.sections.forEach((section, sectionIndex) => {
    questions.push(makeQuestion(
      `${topic.id}:section-topic:${difficulty}:${sectionIndex}`,
      `Which topic includes the area “${section.heading}”?`,
      topic.title,
      topicTitles,
      `${section.heading} is an area within ${topic.title}.`,
      topic,
      difficulty,
      seed,
    ));
    section.paragraphs.forEach((paragraph, paragraphIndex) => {
      questions.push(makeQuestion(
        `${topic.id}:section:${difficulty}:${sectionIndex}:${paragraphIndex}`,
        difficulty === "high" ? `Which area of ${topic.title} should be used to analyse this statement: “${paragraph}”?` : `Which heading best matches this explanation: “${paragraph}”?`,
        section.heading,
        headings,
        `This is covered by ${section.heading} within ${topic.title}.`,
        topic,
        difficulty,
        seed,
      ));
    });
    if (section.example) {
      questions.push(makeQuestion(`${topic.id}:example:${difficulty}:${sectionIndex}`, `Which topic is most directly demonstrated by this example: “${section.example}”?`, topic.title, topicTitles, `The example applies ${topic.title}.`, topic, difficulty, seed));
    }
  });

  questions.push(makeQuestion(`${topic.id}:summary:${difficulty}`, `Which topic is described here: “${topic.summary}”?`, topic.title, topicTitles, `This summary describes ${topic.title}.`, topic, difficulty, seed));

  const seen = new Set<string>();
  return questions.filter((question): question is QuizQuestion => {
    if (!question) return false;
    const signature = `${question.prompt}|${question.options.join("|")}`;
    if (seen.has(signature)) return false;
    seen.add(signature);
    return true;
  });
}

export function createQuizSession({ course, topicId, difficulty, count, seed = 1 }: QuizSessionOptions): QuizSession {
  const allTopics = course.units.flatMap((unit) => unit.topics);
  const selectedTopics = topicId ? allTopics.filter((topic) => topic.id === topicId) : allTopics;
  const maximum = topicId ? 20 : 50;
  const requestedCount = Math.max(1, Math.min(maximum, Math.round(count)));
  const bank = selectedTopics.flatMap((topic) => topicBank(course, topic, difficulty, seed));
  const ordered = shuffle(bank, `${course.id}:${topicId ?? "all"}:${difficulty}:${seed}`);
  const questions = ordered.slice(0, requestedCount);
  let reinforcementRound = 2;

  while (questions.length < requestedCount && ordered.length) {
    for (const original of shuffle(ordered, `${seed}:reinforcement:${reinforcementRound}`)) {
      if (questions.length >= requestedCount) break;
      const options = shuffle(original.options, `${original.id}:reinforcement:${reinforcementRound}`);
      const correct = original.options[original.answer];
      questions.push({
        ...original,
        id: `${original.id}:reinforcement:${reinforcementRound}`,
        prompt: `Reinforcement check ${reinforcementRound}: ${original.prompt}`,
        options,
        answer: options.indexOf(correct),
        reinforcement: true,
      });
    }
    reinforcementRound += 1;
  }

  return {
    questions,
    availableQuestionCount: bank.length,
    usesReinforcement: questions.some((question) => question.reinforcement),
  };
}
