import { createAocPuzzle } from "./aoc.js";
import { createSquidGrid, SIZE } from "./squid-grid.js";

const testAnswers = {
  part1: 1656,
  part2: 195
};

function parseInput(lines) {
  const values = new Int8Array(SIZE * SIZE);
  let offset = 0;
  for (let y = 0; y < SIZE; ++y) {
    for (let x = 0; x < SIZE; ++x) {
      values[offset + x] = +lines[y][x];
    }
    offset += SIZE;
  }
  return values;
}

function runPart1(input) {
  const squidGrid = createSquidGrid(input);
  for (let i = 0; i < 100; ++i) {
    squidGrid.modelStep();
  }
  return squidGrid.flashCount;
}

function runPart2(input) {
  const squidGrid = createSquidGrid(input);
  let step = 1;
  while (squidGrid.modelStep() < input.length) {
    ++step;
  }
  return step;
}

export function createPuzzle() {
  return createAocPuzzle({ parseInput, runPart1, runPart2, testAnswers });
}
