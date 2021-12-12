import { createAocPuzzle } from "./aoc.js";

const testAnswers = {
  part1: 226,
  part2: 3509
};

function parseInput(lines) {
  const caves = new Map();
  for (let i = 0; i < lines.length; ++i) {
    const [start, end] = lines[i].split("-");
    if (!caves.has(start)) {
      caves.set(start, { isSmall: /^[a-z]+$/.test(start), connections: [] });
    }
    if (!caves.has(end)) {
      caves.set(end, { isSmall: /^[a-z]+$/.test(end), connections: [] });
    }
    caves.get(start).connections.push(end);
    caves.get(end).connections.push(start);
  }
  return caves;
}

function getSmallCaveNames(caves) {
  const smallCaves = [];
  for (const [caveName, cave] of caves) {
    if (cave.isSmall && caveName != "start" && caveName != "end") {
      smallCaves.push(caveName);
    }
  }
  return smallCaves;
}

function findPaths(paths, caves, smallCaveNames = null) {
  const newPaths = [];
  let endCount = 0;
  for (const path of paths) {
    const caveName = path[path.length - 1];
    if (caveName == "end") {
      ++endCount;
      newPaths.push(path);
      continue;
    }

    const cave = caves.get(caveName);
    caveloop: for (const nextCaveName of cave.connections) {
      if (nextCaveName == "start") {
        continue;
      } else if (nextCaveName == "end") {
        ++endCount;
      } else {
        const nextCave = caves.get(nextCaveName);
        if (nextCave.isSmall && path.includes(nextCaveName)) {
          if (smallCaveNames) {
            for (const smallCaveName of smallCaveNames) {
              let count = 0;
              for (let i = 0; i < path.length; ++i) {
                if (path[i] == smallCaveName) {
                  if (++count == 2) {
                    continue caveloop;
                  }
                }
              }
            }
          } else {
            continue;
          }
        }
      }

      newPaths.push([...path, nextCaveName]);
    }
  }

  return (endCount < newPaths.length ? findPaths(newPaths, caves, smallCaveNames) : newPaths);
}

function runPart1(input) {
  const paths = findPaths([["start"]], input);
  return paths.length;
}

function runPart2(input) {
  const paths = findPaths([["start"]], input, getSmallCaveNames(input));
  return paths.length;
}

export function createPuzzle() {
  return createAocPuzzle({ parseInput, runPart1, runPart2, testAnswers });
}
