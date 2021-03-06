import { createAocPuzzle } from "./aoc.js";

const testAnswers = {
  part1: 7,
  part2: 5
};

function parseInput(lines) {
  return lines.map(line => +line);
}

function runPart1(input) {
  let result = 0;
  for (let i = 1; i < input.length; ++i) {
    if (input[i] > input[i - 1]) {
      ++result;
    }
  }
  return result;
}

function runPart2(input) {
  let result = 0;
  for (let i = 1, len = input.length - 2; i < len; ++i) {
    if (input[i + 2] > input[i - 1]) {
      ++result;
    }
  }
  return result;
}

export function createPuzzle() {
  return createAocPuzzle({ parseInput, runPart1, runPart2, testAnswers });
}
