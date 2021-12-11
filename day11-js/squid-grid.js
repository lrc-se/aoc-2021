export const SIZE = 10;

export function createSquidGrid(input) {
  const squids = [...input];
  let flashCount = 0;

  function increaseEnergy(index) {
    if (squids[index] == 0) {
      return false;
    }
    return (++squids[index] == 10);
  }

  function increaseAdjacentSquids(index) {
    const flashIndices = [];
    const hasLeft = (index % SIZE > 0);
    const hasRight = (index % SIZE < SIZE - 1);

    if (hasLeft && increaseEnergy(index - 1)) {
      flashIndices.push(index - 1);
    }
    if (hasRight && increaseEnergy(index + 1)) {
      flashIndices.push(index + 1);
    }

    let offset = index - SIZE;
    if (offset >= 0) {
      if (increaseEnergy(offset)) {
        flashIndices.push(offset);
      }
      if (hasLeft && increaseEnergy(offset - 1)) {
        flashIndices.push(offset - 1);
      }
      if (hasRight && increaseEnergy(offset + 1)) {
        flashIndices.push(offset + 1);
      }
    }

    offset = index + SIZE;
    if (offset < squids.length) {
      if (increaseEnergy(offset)) {
        flashIndices.push(offset);
      }
      if (hasLeft && increaseEnergy(offset - 1)) {
        flashIndices.push(offset - 1);
      }
      if (hasRight && increaseEnergy(offset + 1)) {
        flashIndices.push(offset + 1);
      }
    }

    return flashIndices;
  }

  function modelStep() {
    const flashIndices = [];
    for (let i = 0; i < squids.length; ++i) {
      if (++squids[i] > 9) {
        flashIndices.push(i);
      }
    }

    let stepFlashCount = 0;
    while (flashIndices.length) {
      ++stepFlashCount;
      const index = flashIndices.shift();
      squids[index] = 0;
      flashIndices.push(...increaseAdjacentSquids(index));
    }

    flashCount += stepFlashCount;
    return stepFlashCount;
  }

  return {
    modelStep,
    get flashCount() {
      return flashCount;
    }
  };
}
