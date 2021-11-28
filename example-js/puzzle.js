import { createAocPuzzle } from "./aoc.js";

const testAnswers = {
  part1: 1379,
  part2: 56154
};

function parseInput(input) {
  return input.map(line => +line);
}

function runPart1(input) {
  return input.reduce((prev, cur) => prev + cur);
}

function runPart2(input) {
  return input.reduce((prev, cur) => prev * cur);
}

export function createPuzzle() {
  return createAocPuzzle({ parseInput, runPart1, runPart2, testAnswers });
}
