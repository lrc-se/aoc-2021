import os
import time
from typing import Callable, Generic, TypeVar


MODE = os.environ.get("mode")
IS_TEST = (MODE == "test" or MODE == "test-timed")
IS_TIMED = (MODE == "timed" or MODE == "test-timed")
PUZZLE_PART = os.environ.get("part")


T = TypeVar("T")

def run_timed(func: Callable[[], T]) -> T:
    start = time.perf_counter_ns()
    result = func()
    end = time.perf_counter_ns()
    print("Execution time (ms):", (end - start) / 1_000_000);
    return result


def load_input():
    with open("input-test.txt" if IS_TEST else "input.txt") as f:
        return f.readlines()


InputT = TypeVar("InputT")
ResultT = TypeVar("ResultT")

class AocPuzzle(Generic[InputT, ResultT]):
    def __init__(self, test_answers: dict[str, ResultT] = None):
        self._input = self.parse_input(load_input())
        self._test_answers = test_answers


    def parse_input(self, lines: list[str]) -> InputT:
        return lines


    def run_part1(self) -> ResultT:
        return None


    def run_part2(self) -> ResultT:
        return None


    def run(self, part: str = PUZZLE_PART):
        match part:
            case "part1":
                print("PART 1")
                print("======")
                result = run_timed(self.run_part1) if IS_TIMED else self.run_part1()
            case "part2":
                print("PART 2")
                print("======")
                result = run_timed(self.run_part2) if IS_TIMED else self.run_part2()
            case _:
                self.run("part1")
                print()
                self.run("part2")
                return

        print("Result:", result)
        if IS_TEST:
            if not self._test_answers or part not in self._test_answers:
                print("Test answer not provided!")
            elif result != self._test_answers[part]:
                print("Test failed! Expected result:", self._test_answers[part])
