import { createAocPuzzle } from "./aoc.js";

const testAnswers = {
  part1: 15,
  part2: 1134
};

function parseInput(lines) {
  return lines.map(line => line.split("").map(point => +point));
}

function runPart1(input) {
  const maxX = input[0].length - 1;
  const maxY = input.length - 1;
  let riskLevel = 0;
  for (let y = 0; y <= maxY; ++y) {
    for (let x = 0; x <= maxX; ++x) {
      const point = input[y][x];
      if (
        (x == 0 || point < input[y][x - 1]) &&
        (y == 0 || point < input[y - 1][x]) &&
        (x == maxX || point < input[y][x + 1]) &&
        (y == maxY || point < input[y + 1][x])
      ) {
        riskLevel += point + 1;
      }
    }
  }
  return riskLevel;
}

function runPart2(input) {
  const width = input[0].length;
  const height = input.length;
  const maxX = width - 1;
  const maxY = height - 1;
  const checkedPositions = new Int8Array(width * height);

  function getBasinSize(x, y) {
    if (checkedPositions[y * width + x] || input[y][x] == 9) {
      return 0;
    }

    checkedPositions[y * width + x] = 1;
    let size = 1;
    if (x > 0) {
      size += getBasinSize(x - 1, y);
    }
    if (y > 0) {
      size += getBasinSize(x, y - 1);
    }
    if (x < maxX) {
      size += getBasinSize(x + 1, y);
    }
    if (y < maxY) {
      size += getBasinSize(x, y + 1);
    }

    return size;
  }

  const lowPoints = [];
  for (let y = 0; y <= maxY; ++y) {
    for (let x = 0; x <= maxX; ++x) {
      const point = input[y][x];
      if (
        (x == 0 || point < input[y][x - 1]) &&
        (y == 0 || point < input[y - 1][x]) &&
        (x == maxX || point < input[y][x + 1]) &&
        (y == maxY || point < input[y + 1][x])
      ) {
        lowPoints.push({ x, y });
      }
    }
  }

  const basinSizes = new Array(lowPoints.length);
  for (let i = 0; i < lowPoints.length; ++i) {
    basinSizes[i] = getBasinSize(lowPoints[i].x, lowPoints[i].y);
  }
  basinSizes.sort((a, b) => b - a);

  console.log("Three largest basins:", basinSizes[0], basinSizes[1], basinSizes[2]);
  return basinSizes[0] * basinSizes[1] * basinSizes[2];
}

export function createPuzzle() {
  return createAocPuzzle({ parseInput, runPart1, runPart2, testAnswers });
}
