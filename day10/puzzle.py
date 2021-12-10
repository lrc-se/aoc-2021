import statistics
from functools import reduce
from aoc import AocPuzzle


TEST_ANSWERS = {
    "part1": 26397,
    "part2": 288957
}

CHAR_MAP = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">"
}

ILLEGAL_CHAR_POINTS = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
}

COMPLETION_CHAR_POINTS = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
}


class Puzzle(AocPuzzle[list[str], int]):
    def __init__(self):
        super().__init__(TEST_ANSWERS)


    def run_part1(self):
        illegal_chars: list[str] = []
        for line in self._input:
            stack: list[str] = []
            for char in line.strip():
                if char in CHAR_MAP:
                    stack.append(char)
                else:
                    if char != CHAR_MAP[stack.pop()]:
                        illegal_chars.append(char)
                        break

        return sum([ILLEGAL_CHAR_POINTS[char] for char in illegal_chars])


    def run_part2(self):
        scores: list[int] = []
        for line in self._input:
            stack: list[str] = []
            is_corrupted = False
            for char in line.strip():
                if char in CHAR_MAP:
                    stack.append(char)
                else:
                    if char != CHAR_MAP[stack.pop()]:
                        is_corrupted = True
                        break

            if is_corrupted:
                continue

            completion_chars: list[str] = []
            while len(stack):
                completion_chars.append(CHAR_MAP[stack.pop()])

            if self._is_test:
                print("".join(completion_chars))

            scores.append(reduce(lambda score, char: score * 5 + COMPLETION_CHAR_POINTS[char], completion_chars, 0))

        return statistics.median(scores)
