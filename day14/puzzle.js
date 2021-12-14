import { createAocPuzzle } from "./aoc.js";

const testAnswers = {
  part1: 1588,
  part2: 2188189693529
};

function parseInput(lines) {
  const rules = {};
  for (let i = 2; i < lines.length; ++i) {
    const parts = lines[i].split(" -> ");
    rules[parts[0]] = parts[1];
  }
  return {
    template: lines[0],
    rules
  };
}

function getPairCounts({ rules, template }) {
  const counts = {};
  for (const pair in rules) {
    counts[pair] = 0;
  }
  for (let i = 0, len = template.length - 1; i < len; ++i) {
    ++counts[template.substr(i, 2)];
  }
  return counts;
}

function processPairs(pairCounts, rules) {
  const prevPairCounts = { ...pairCounts };
  for (const pair in rules) {
    const insertedElement = rules[pair];
    const count = prevPairCounts[pair];
    pairCounts[pair] -= count;
    pairCounts[pair[0] + insertedElement] += count;
    pairCounts[insertedElement + pair[1]] += count;
  }
}

function countElements(pairCounts, firstElement) {
  const counts = { [firstElement]: 1 };
  for (const pair in pairCounts) {
    if (pair[1] in counts) {
      counts[pair[1]] += pairCounts[pair];
    } else {
      counts[pair[1]] = pairCounts[pair];
    }
  }
  return counts;
}

function runPuzzle(input, steps) {
  const pairCounts = getPairCounts(input);
  for (let i = 0; i < steps; ++i) {
    processPairs(pairCounts, input.rules);
  }
  const elementCounts = countElements(pairCounts, input.template[0]);
  const sortedCounts = Object.values(elementCounts).sort((a, b) => b - a);
  return sortedCounts[0] - sortedCounts[sortedCounts.length - 1];
}

function runPart1(input) {
  return runPuzzle(input, 10);
}

function runPart2(input) {
  return runPuzzle(input, 40);
}

export function createPuzzle() {
  return createAocPuzzle({ parseInput, runPart1, runPart2, testAnswers });
}
