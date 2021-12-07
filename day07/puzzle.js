import { createAocPuzzle } from "./aoc.js";

const testAnswers = {
  part1: 37,
  part2: 168
};

function parseInput(lines) {
  return lines[0].split(",").map(pos => +pos);
}

function getPositionCounts(input) {
  const counts = new Map();
  let max = 0;
  for (let i = 0; i < input.length; ++i) {
    counts.set(input[i], (counts.has(input[i]) ? counts.get(input[i]) : 0) + 1);
    if (input[i] > max) {
      max = input[i];
    }
  }
  return { counts: [...counts.entries()], max };
}

function runPart1(input) {
  const { counts, max } = getPositionCounts(input);
  let fuel = Number.MAX_SAFE_INTEGER;
  let position = -1;
  for (let x = 0; x <= max; ++x) {
    let curFuel = 0;
    for (let i = 0; i < counts.length; ++i) {
      curFuel += Math.abs(x - counts[i][0]) * counts[i][1];
    }
    if (curFuel < fuel) {
      fuel = curFuel;
      position = x;
    }
  }

  console.log("Position:", position);
  return fuel;
}

function runPart2(input) {
  const { counts, max } = getPositionCounts(input);
  let fuel = Number.MAX_SAFE_INTEGER;
  let position = -1;
  for (let x = 0; x <= max; ++x) {
    let curFuel = 0;
    for (let i = 0; i < counts.length; ++i) {
      const diff = Math.abs(x - counts[i][0]);
      curFuel += (diff * (diff + 1) >> 1) * counts[i][1];
    }
    if (curFuel < fuel) {
      fuel = curFuel;
      position = x;
    }
  }

  console.log("Position:", position);
  return fuel;
}

export function createPuzzle() {
  return createAocPuzzle({ parseInput, runPart1, runPart2, testAnswers });
}
