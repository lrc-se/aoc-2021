import { createAocPuzzle } from "./aoc.js";

const testAnswers = {
  part1: 198,
  part2: 230
};

function parseInput(lines) {
  return lines;
}

function getBitCounts(numbers) {
  const width = numbers[0].length;
  const ones = new Uint16Array(width);
  const zeroes = new Uint16Array(width);
  for (let i = 0, len = numbers.length; i < len; ++i) {
    for (let j = 0; j < width; ++j) {
      if (+numbers[i][j]) {
        ++ones[j];
      } else {
        ++zeroes[j];
      }
    }
  }
  return { ones, zeroes };
}

function getSingleBitCounts(numbers, position) {
  let ones = 0;
  let zeroes = 0;
  for (let i = 0, len = numbers.length; i < len; ++i) {
    if (+numbers[i][position]) {
      ++ones;
    } else {
      ++zeroes;
    }
  }
  return { ones, zeroes };
}

function runPart1(input) {
  const counts = getBitCounts(input);
  let gamma = "";
  let epsilon = "";
  for (let i = 0, len = input[0].length; i < len; ++i) {
    if (counts.ones[i] > counts.zeroes[i]) {
      gamma += "1";
      epsilon += "0";
    } else {
      gamma += "0";
      epsilon += "1";
    }
  }

  console.log("Gamma:", gamma);
  console.log("Epsilon:", epsilon);
  return +`0b${gamma}` * +`0b${epsilon}`;
}

function runPart2(input) {
  let oxygenNumbers = [...input];
  let position = 0;
  while (oxygenNumbers.length > 1) {
    const counts = getSingleBitCounts(oxygenNumbers, position);
    const bit = (counts.ones >= counts.zeroes ? "1" : "0");
    oxygenNumbers = oxygenNumbers.filter(number => number[position] == bit);
    ++position;
  }

  let co2Numbers = [...input];
  position = 0;
  while (co2Numbers.length > 1) {
    const counts = getSingleBitCounts(co2Numbers, position);
    const bit = (counts.zeroes <= counts.ones ? "0" : "1");
    co2Numbers = co2Numbers.filter(number => number[position] == bit);
    ++position;
  }

  console.log("Oxygen generator rating:", oxygenNumbers[0]);
  console.log("CO2 scrubber rating:", co2Numbers[0]);
  return +`0b${oxygenNumbers[0]}` * +`0b${co2Numbers[0]}`;
}

export function createPuzzle() {
  return createAocPuzzle({ parseInput, runPart1, runPart2, testAnswers });
}
