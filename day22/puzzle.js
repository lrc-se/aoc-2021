import { createAocPuzzle } from "./aoc.js";

const testAnswers = {
  part1: 590784,
  part2: 2758514936282235
};

function parseInput(lines) {
  const list = [];
  let rebootSteps = [];
  for (const line of lines) {
    if (!line.trim()) {
      list.push(rebootSteps);
      rebootSteps = [];
    } else {
      const match = /^(.+?) x=(.+?)\.\.(.+?),y=(.+?)\.\.(.+?),z=(.+?)\.\.(.+?)$/.exec(line);
      rebootSteps.push({
        on: (match[1] == "on"),
        minX: +match[2],
        maxX: +match[3],
        minY: +match[4],
        maxY: +match[5],
        minZ: +match[6],
        maxZ: +match[7]
      });
    }
  }
  list.push(rebootSteps);
  return list;
}

function getCutOutPlanes(basePlane, otherPlane) {
  if (
    basePlane.minX > otherPlane.maxX ||
    basePlane.maxX < otherPlane.minX ||
    basePlane.minY > otherPlane.maxY ||
    basePlane.maxY < otherPlane.minY
  ) {
    return null;
  }

  const planes = [];
  const minY = Math.max(basePlane.minY, otherPlane.minY);
  const maxY = Math.min(basePlane.maxY, otherPlane.maxY);
  if (otherPlane.minY > basePlane.minY) {
    planes.push({ minX: basePlane.minX, maxX: basePlane.maxX, minY: basePlane.minY, maxY: minY - 1 });
  }
  if (otherPlane.minX > basePlane.minX) {
    planes.push({ minX: basePlane.minX, maxX: otherPlane.minX - 1, minY, maxY });
  }
  if (otherPlane.maxX < basePlane.maxX) {
    planes.push({ minX: otherPlane.maxX + 1, maxX: basePlane.maxX, minY, maxY });
  }
  if (otherPlane.maxY < basePlane.maxY) {
    planes.push({ minX: basePlane.minX, maxX: basePlane.maxX, minY: maxY + 1, maxY: basePlane.maxY });
  }

  return planes;
}

function getOnCount(rebootSteps) {
  let onCount = 0;
  const minZ = Math.min(...rebootSteps.map(step => step.minZ));
  const maxZ = Math.max(...rebootSteps.map(step => step.maxZ));

  for (let z = minZ; z <= maxZ; ++z) {
    const onPlanes = [];
    steploop: for (const step of rebootSteps) {
      if (step.minZ > z || step.maxZ < z) {
        continue;
      }

      if (step.on) {
        const curPlanes = [step];
        for (const onPlane of onPlanes) {
          for (let i = 0; i < curPlanes.length; ++i) {
            const newPlanes = getCutOutPlanes(curPlanes[i], onPlane);
            if (newPlanes) {
              curPlanes.splice(i, 1, ...newPlanes);
              if (!curPlanes.length) {
                continue steploop;
              }
              i += newPlanes.length - 1;
            }
          }
        }
        onPlanes.push(...curPlanes);
      } else {
        for (let i = 0; i < onPlanes.length; ++i) {
          const newPlanes = getCutOutPlanes(onPlanes[i], step);
          if (newPlanes) {
            onPlanes.splice(i, 1, ...newPlanes);
            i += newPlanes.length - 1;
          }
        }
      }
    }

    for (const plane of onPlanes) {
      onCount += (plane.maxX - plane.minX + 1) * (plane.maxY - plane.minY + 1);
    }
  }

  return onCount;
}

function runPart1(input) {
  const steps = input[0].filter(step => (
    step.minX >= -50 && step.maxX <= 50 &&
    step.minY >= -50 && step.maxY <= 50 &&
    step.minZ >= -50 && step.maxZ <= 50
  ));
  return getOnCount(steps);
}

function runPart2(input, isTest = false) {
  return getOnCount(input[isTest ? 1 : 0]);
}

export function createPuzzle() {
  return createAocPuzzle({ parseInput, runPart1, runPart2, testAnswers });
}
