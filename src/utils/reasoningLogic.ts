export interface ReasoningQuestion {
  statement: string;
  question: string;
  options: [string, string];
  correctAnswer: string;
}

const NAMES = ["Tom", "Fred", "Bill", "Pete", "John", "Jack", "Mike", "Dave"];
const ADJECTIVES = [
  { base: "heavy", comp: "heavier", opp: "lighter" },
  { base: "strong", comp: "stronger", opp: "weaker" },
  { base: "fast", comp: "faster", opp: "slower" },
  { base: "happy", comp: "happier", opp: "sadder" },
  { base: "tall", comp: "taller", opp: "shorter" },
];

export const generateReasoningQuestion = (): ReasoningQuestion => {
  // Select two distinct names
  const name1Index = Math.floor(Math.random() * NAMES.length);
  let name2Index = Math.floor(Math.random() * NAMES.length);
  while (name2Index === name1Index) {
    name2Index = Math.floor(Math.random() * NAMES.length);
  }
  const name1 = NAMES[name1Index];
  const name2 = NAMES[name2Index];

  // Select an adjective set
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];

  // Determine logic type: 0 = "A is X than B", 1 = "A is not as X as B"
  const type = Math.random() < 0.5 ? 0 : 1;

  let statement = "";
  let heavierPerson = ""; // The person who is "more" of the quality (e.g. heavier, stronger)
  let lighterPerson = ""; // The person who is "less" of the quality

  if (type === 0) {
    // "Tom is heavier than Fred"
    statement = `${name1} is ${adj.comp} than ${name2}`;
    heavierPerson = name1;
    lighterPerson = name2;
  } else {
    // "Tom is not as heavy as Fred" -> Fred is heavier
    statement = `${name1} is not as ${adj.base} as ${name2}`;
    heavierPerson = name2;
    lighterPerson = name1;
  }

  // Determine question: "Who is heavier?" or "Who is lighter?"
  const askHeavier = Math.random() < 0.5;
  const question = `Who is ${askHeavier ? adj.comp : adj.opp}?`;
  const correctAnswer = askHeavier ? heavierPerson : lighterPerson;

  return {
    statement,
    question,
    options: [name1, name2],
    correctAnswer,
  };
};
