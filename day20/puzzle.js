import { createAocPuzzle } from "./aoc.js";

const testAnswers = {
  part1: 35,
  part2: 3351
};

function parseInput(lines) {
  const enhancement = lines[0].split("").map(char => +(char == "#"));

  const width = lines[2].length;
  const image = [new Int8Array(width + 4), new Int8Array(width + 4)];
  for (let i = 2; i < lines.length; ++i) {
    const row = new Int8Array(width + 4);
    for (let j = 0; j < width; ++j) {
      row[j + 2] = +(lines[i][j] == "#");
    }
    image.push(row);
  }
  image.push(new Int8Array(width + 4), new Int8Array(width + 4));

  return { enhancement, image };
}

function enhanceImage(image, enhancement) {
  const width = image[0].length;
  const height = image.length;
  const fill = (image[0][0] ? enhancement[enhancement.length - 1] : enhancement[0]);
  const enhancedImage = [new Int8Array(width + 4).fill(fill), new Int8Array(width + 4).fill(fill)];
  for (let i = 0; i < height; ++i) {
    enhancedImage.push(new Int8Array(width + 4).fill(fill));
  }

  for (let y = 1; y < height - 1; ++y) {
    for (let x = 1; x < width - 1; ++x) {
      const index = (
        256 * image[y - 1][x - 1] +
        128 * image[y - 1][x] +
        64 * image[y - 1][x + 1] +
        32 * image[y][x - 1] +
        16 * image[y][x] +
        8 * image[y][x + 1] +
        4 * image[y + 1][x - 1] +
        2 * image[y + 1][x] +
        image[y + 1][x + 1]
      );
      enhancedImage[y + 2][x + 2] = enhancement[index];
    }
  }

  enhancedImage.push(new Int8Array(width + 4).fill(fill), new Int8Array(width + 4).fill(fill));
  return enhancedImage;
}

function countPixels(image) {
  let count = 0;
  for (let y = 2; y < image.length - 2; ++y) {
    for (let x = 2; x < image[0].length - 2; ++x) {
      count += image[y][x];
    }
  }
  return count;
}

function runPart1(input) {
  let image = enhanceImage(input.image, input.enhancement);
  image = enhanceImage(image, input.enhancement);
  return countPixels(image);
}

function runPart2(input) {
  let image = input.image;
  for (let i = 0; i < 50; ++i) {
    image = enhanceImage(image, input.enhancement);
  }
  return countPixels(image);
}

export function createPuzzle() {
  return createAocPuzzle({ parseInput, runPart1, runPart2, testAnswers });
}
