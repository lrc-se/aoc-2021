import { createAocPuzzle } from "./aoc.js";

const testAnswers = {
  part1: 40,
  part2: 315
};

function parseInput(lines) {
  return lines.map(line => line.split("").map(number => +number));
}

function calculateRisk(risks) {
  const width = risks[0].length;
  const height = risks.length;
  const output = new Array(height);
  for (let i = 0; i < height; ++i) {
    output[i] = new Array(width);
  }
  output[0][0] = 0;

  const costs = new Map();
  costs.set(1, { x: 1, y: 0, cost: risks[0][1] });
  costs.set(width, { x: 0, y: 1, cost: risks[1][0] });

  while (costs.size) {
    let lowestCost = Infinity;
    let lowestIndex = null;
    for (const [index, cell] of costs) {
      if (cell.cost < lowestCost) {
        lowestCost = cell.cost;
        lowestIndex = index;
      }
    }

    const cell = costs.get(lowestIndex);
    costs.delete(lowestIndex);
    output[cell.y][cell.x] = cell.cost;

    if (cell.x > 0 && output[cell.y][cell.x - 1] == undefined) {
      const newCost = risks[cell.y][cell.x - 1] + cell.cost;
      const activeCost = costs.get(lowestIndex - 1);
      if (!activeCost) {
        costs.set(lowestIndex - 1, { x: cell.x - 1, y: cell.y, cost: newCost });
      } else if (newCost < activeCost.cost) {
        activeCost.cost = newCost;
      }
    }
    if (cell.x < width - 1 && output[cell.y][cell.x + 1] == undefined) {
      const newCost = risks[cell.y][cell.x + 1] + cell.cost;
      const activeCost = costs.get(lowestIndex + 1);
      if (!activeCost) {
        costs.set(lowestIndex + 1, { x: cell.x + 1, y: cell.y, cost: newCost });
      } else if (newCost < activeCost.cost) {
        activeCost.cost = newCost;
      }
    }
    if (cell.y > 0 && output[cell.y - 1][cell.x] == undefined) {
      const newCost = risks[cell.y - 1][cell.x] + cell.cost;
      const activeCost = costs.get(lowestIndex - width);
      if (!activeCost) {
        costs.set(lowestIndex - width, { x: cell.x, y: cell.y - 1, cost: newCost });
      } else if (newCost < activeCost.cost) {
        activeCost.cost = newCost;
      }
    }
    if (cell.y < height - 1 && output[cell.y + 1][cell.x] == undefined) {
      const newCost = risks[cell.y + 1][cell.x] + cell.cost;
      const activeCost = costs.get(lowestIndex + width);
      if (!activeCost) {
        costs.set(lowestIndex + width, { x: cell.x, y: cell.y + 1, cost: newCost });
      } else if (newCost < activeCost.cost) {
        activeCost.cost = newCost;
      }
    }
  }

  return output[height - 1][width - 1];
}

function runPart1(input) {
  return calculateRisk(input);
}

function runPart2(input) {
  const width = input[0].length;
  const height = input.length;
  const risks = new Array(height);
  for (let i = 0, len = height * 5; i < len; ++i) {
    risks[i] = new Int8Array(width * 5);
  }
  for (let y = 0; y < height; ++y) {
    for (let offsetY = 0; offsetY < 5; ++offsetY) {
      const rowOffset = offsetY * width;
      for (let x = 0; x < width; ++x) {
        for (let offsetX = 0; offsetX < 5; ++offsetX) {
          let value = input[y][x] + offsetY + offsetX;
          if (value > 9) {
            value -= 9;
          }
          risks[y + rowOffset][x + offsetX * width] = value;
        }
      }
    }
  }

  return calculateRisk(risks);
}

export function createPuzzle() {
  return createAocPuzzle({ parseInput, runPart1, runPart2, testAnswers });
}
