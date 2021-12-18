import { createAocPuzzle } from "./aoc.js";

const testAnswers = {
  part1: 4140,
  part2: 3993
};

function parseInput(lines) {
  return lines.map(line => parsePair(line));
}

function parsePair(data, depth = 0, parent = null, position = null) {
  const pair = { depth, parent, position, left: null, right: null };
  const leftNumberMatch = /^\[(\d+),/.exec(data);
  const rightNumberMatch = /,(\d+)\]$/.exec(data);

  let offset;
  if (leftNumberMatch) {
    pair.left = +leftNumberMatch[1];
    offset = leftNumberMatch[1].length;
  } else {
    const pairString = extractPairString(data, 1);
    pair.left = parsePair(pairString, depth + 1, pair, "left");
    offset = pairString.length;
  }
  if (rightNumberMatch) {
    pair.right = +rightNumberMatch[1];
  } else {
    pair.right = parsePair(extractPairString(data, offset + 2), depth + 1, pair, "right");
  }

  return pair;
}

function extractPairString(data, offset = 0) {
  let depth = 0;
  for (let i = offset; i < data.length; ++i) {
    if (data[i] == "[") {
      ++depth;
    } else if (data[i] == "]") {
      --depth;
    }
    if (depth == 0) {
      return data.substring(offset, i + 1);
    }
  }

  return data;
}

function explodePair(pair) {
  increasePreviousNumber(pair, pair.left);
  increaseNextNumber(pair, pair.right);
  if (pair.parent) {
    if (pair.position == "left") {
      pair.parent.left = 0;
    } else {
      pair.parent.right = 0;
    }
  }
}

function increasePreviousNumber(pair, amount) {
  if (!pair.parent) {
    return;
  }

  if (pair.position == "left") {
    increasePreviousNumber(pair.parent, amount);
  } else {
    if (typeof pair.parent.left == "number") {
      pair.parent.left += amount;
    } else {
      let curPair = pair.parent.left;
      while (typeof curPair.right != "number") {
        curPair = curPair.right;
      }
      curPair.right += amount;
    }
  }
}

function increaseNextNumber(pair, amount) {
  if (!pair.parent) {
    return;
  }

  if (pair.position == "right") {
    increaseNextNumber(pair.parent, amount);
  } else {
    if (typeof pair.parent.right == "number") {
      pair.parent.right += amount;
    } else {
      let curPair = pair.parent.right;
      while (typeof curPair.left != "number") {
        curPair = curPair.left;
      }
      curPair.left += amount;
    }
  }
}

function splitNumber(parent, position) {
  const value = (position == "left" ? parent.left : parent.right) / 2;
  const pair = {
    depth: parent.depth + 1,
    parent,
    position,
    left: Math.floor(value),
    right: Math.ceil(value)
  };
  if (position == "left") {
    parent.left = pair;
  } else {
    parent.right = pair;
  }
}

function getNextExplodingPair(pair) {
  const isLeftNumber = (typeof pair.left == "number");
  const isRightNumber = (typeof pair.right == "number");
  if (isLeftNumber && isRightNumber && pair.depth == 4) {
    return pair;
  }
  if (!isLeftNumber) {
    const left = getNextExplodingPair(pair.left);
    if (left) {
      return left;
    }
  }

  return (!isRightNumber ? getNextExplodingPair(pair.right) : null);
}

function getNextSplitAction(pair) {
  const isLeftNumber = (typeof pair.left == "number");
  const isRightNumber = (typeof pair.right == "number");
  if (isLeftNumber) {
    if (pair.left >= 10) {
      return { pair, position: "left" };
    } else if (!isRightNumber) {
      return getNextSplitAction(pair.right);
    }
  } else {
    const left = getNextSplitAction(pair.left);
    if (left) {
      return left;
    }
  }
  if (isRightNumber) {
    return (pair.right >= 10 ? { pair, position: "right" } : null);
  }

  return getNextSplitAction(pair.right);
}

function reducePair(pair) {
  while (true) {
    const explodingPair = getNextExplodingPair(pair);
    if (explodingPair) {
      explodePair(explodingPair);
      continue;
    }

    const splitAction = getNextSplitAction(pair);
    if (splitAction) {
      splitNumber(splitAction.pair, splitAction.position);
    } else {
      break;
    }
  }
}

function addPairs(left, right) {
  const pair = parsePair(getPairString({ left, right }));
  reducePair(pair);
  return pair;
}

function getMagnitude(pair) {
  const leftMagnitude = (typeof pair.left == "number" ? pair.left : getMagnitude(pair.left));
  const rightMagnitude = (typeof pair.right == "number" ? pair.right : getMagnitude(pair.right));
  return 3 * leftMagnitude + 2 * rightMagnitude;
}

function getPairString(pair) {
  const left = (typeof pair.left == "number" ? pair.left : getPairString(pair.left));
  const right = (typeof pair.right == "number" ? pair.right : getPairString(pair.right));
  return `[${left},${right}]`;
}

function runPart1(input, isTest = false) {
  let pair = input[0];
  for (let i = 1; i < input.length; ++i) {
    pair = addPairs(pair, input[i]);
  }
  if (isTest) {
    console.log("Final sum:", getPairString(pair));
  }

  return getMagnitude(pair);
}

function runPart2(input) {
  let maxMagnitude = -1;
  for (let offset = 0; offset < input.length; ++offset) {
    for (let i = 0; i < offset; ++i) {
      const pair = addPairs(input[i], input[offset]);
      const magnitude = getMagnitude(pair);
      if (magnitude > maxMagnitude) {
        maxMagnitude = magnitude;
      }
    }
    for (let i = offset + 1; i < input.length; ++i) {
      const pair = addPairs(input[i], input[offset]);
      const magnitude = getMagnitude(pair);
      if (magnitude > maxMagnitude) {
        maxMagnitude = magnitude;
      }
    }
  }

  return maxMagnitude;
}

export function createPuzzle() {
  return createAocPuzzle({ parseInput, runPart1, runPart2, testAnswers });
}
