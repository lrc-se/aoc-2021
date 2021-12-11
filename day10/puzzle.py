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
                elif char != CHAR_MAP[stack.pop()]:
                    illegal_chars.append(char)
                    break

        return sum([ILLEGAL_CHAR_POINTS[char] for char in illegal_chars])


    def run_part2(self):
        scores: list[int] = []
        for line in self._input:
            stack: list[str] = []
            for char in line.strip():
                if char in CHAR_MAP:
                    stack.append(char)
                elif char != CHAR_MAP[stack.pop()]:
                    break
            else:
                stack.reverse()
                scores.append(reduce(lambda score, char: score * 5 + COMPLETION_CHAR_POINTS[CHAR_MAP[char]], stack, 0))

        return statistics.median(scores)
