from functools import reduce
from aoc import AocPuzzle


TEST_ANSWERS = {
    "part1": 1379,
    "part2": 56154
}


class Puzzle(AocPuzzle):
    def __init__(self):
        super().__init__(TEST_ANSWERS)


    def parse_input(self, lines):
        return [int(line) for line in lines]


    def run_part1(self):
        return sum(self._input)


    def run_part2(self):
        return reduce(lambda prev, cur: prev * cur, self._input)
