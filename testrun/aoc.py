import os
import time


MODE = os.environ.get("mode")
IS_TEST = (MODE == "test" or MODE == "test-timed")
IS_TIMED = (MODE == "timed" or MODE == "test-timed")
PUZZLE_PART = os.environ.get("part")


def run_timed(func):
    start = time.perf_counter_ns()
    result = func()
    end = time.perf_counter_ns()
    print("Execution time (ms):", (end - start) / 1_000_000);
    return result


def load_input():
    with open("input-test.txt" if IS_TEST else "input.txt") as f:
        return f.readlines()


class AocPuzzle:
    def __init__(self, test_answers=None):
        self._input = self.parse_input(load_input())
        self._test_answers = test_answers


    def parse_input(self, input):
        return input


    def run_part1(self):
        return None


    def run_part2(self):
        return None


    def run(self, part=PUZZLE_PART):
        if part == "part1":
            print("PART 1")
            print("======")
            result = run_timed(self.run_part1) if IS_TIMED else self.run_part1()
        elif part == "part2":
            print("PART 2")
            print("======")
            result = run_timed(self.run_part2) if IS_TIMED else self.run_part2()
        else:
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
