const mode = Deno.env.get("mode");
const isTest = (mode == "test" || mode == "test-timed");
const isTimed = (mode == "timed" || mode == "test-timed");
const puzzlePart = Deno.env.get("part");

function runTimed(func) {
  const start = performance.now();
  const result = func();
  const end = performance.now();
  console.log("Execution time (ms):", end - start);
  return result;
}

function loadInput() {
  return Deno.readTextFileSync(isTest ? "input-test.txt" : "input.txt").trim().split("\n");
}

export function createAocPuzzle({ parseInput, runPart1, runPart2, testAnswers }) {
  const input = parseInput(loadInput());

  function runPuzzle(part = puzzlePart) {
    let result;
    switch (part) {
      case "part1": {
        console.log("PART 1");
        console.log("======");
        result = (isTimed ? runTimed(() => runPart1(input)) : runPart1(input));
        break;
      }
      case "part2": {
        console.log("PART 2");
        console.log("======");
        result = (isTimed ? runTimed(() => runPart2(input)) : runPart2(input));
        break;
      }
      default:
        runPuzzle("part1");
        console.log();
        runPuzzle("part2");
        return;
    }

    console.log("Result:", result);
    if (isTest) {
      if (testAnswers?.[part] == null) {
        console.log("No test answer provided!");
      } else if (result !== testAnswers[part]) {
        console.log("Test failed! Expected result:", testAnswers[part]);
      }
    }
  }

  return { run: runPuzzle };
}
