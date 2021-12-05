import { createAocPuzzle } from "./aoc.js";

const testAnswers = {
  part1: 5,
  part2: 12
};

function parseInput(lines) {
  let maxX = 0;
  let maxY = 0;
  const ventLines = [];
  for (let i = 0, len = lines.length; i < len; ++i) {
    const parts = lines[i].split(/\D+/);
    const ventLine = {
      x1: +parts[0],
      y1: +parts[1],
      x2: +parts[2],
      y2: +parts[3]
    };
    maxX = Math.max(ventLine.x1, ventLine.x2, maxX);
    maxY = Math.max(ventLine.y1, ventLine.y2, maxY);
    ventLines.push(ventLine);
  }

  return {
    width: maxX + 1,
    height: maxY + 1,
    lines: ventLines
  };
}

function processLine(diagram, line, width) {
  let dangerousCount = 0;
  let x = line.x1;
  let y = line.y1;
  const deltaX = Math.sign(line.x2 - line.x1);
  const deltaY = Math.sign(line.y2 - line.y1);
  const endX = line.x2 + deltaX;
  const endY = line.y2 + deltaY;

  do {
    const count = ++diagram[y * width + x];
    if (count == 2) {
      ++dangerousCount;
    }
    x += deltaX;
    y += deltaY;
  } while (x != endX || y != endY);

  return dangerousCount;
}

function printDiagram(diagram, width) {
  for (let i = 0; i < diagram.length; i += width) {
    console.log([...diagram.slice(i, i + width)].map(point => point || ".").join(""));
  }
}

function runPart1(input, isTest = false) {
  const diagram = new Uint16Array(input.width * input.height);
  let dangerousCount = 0;
  for (let i = 0, len = input.lines.length; i < len; ++i) {
    const line = input.lines[i];
    if (line.x1 == line.x2 || line.y1 == line.y2) {
      dangerousCount += processLine(diagram, line, input.width);
    }
  }

  if (isTest) {
    printDiagram(diagram, input.width);
  }

  return dangerousCount;
}

function runPart2(input, isTest = false) {
  const diagram = new Uint16Array(input.width * input.height);
  let dangerousCount = 0;
  for (let i = 0, len = input.lines.length; i < len; ++i) {
    dangerousCount += processLine(diagram, input.lines[i], input.width);
  }

  if (isTest) {
    printDiagram(diagram, input.width);
  }

  return dangerousCount;
}

export function createPuzzle() {
  return createAocPuzzle({ parseInput, runPart1, runPart2, testAnswers });
}
