from aoc import AocPuzzle


TEST_ANSWERS = {
    "part1": 5934,
    "part2": 26984457539
}


class Puzzle(AocPuzzle[list[int], int]):
    def __init__(self):
        super().__init__(TEST_ANSWERS)


    def parse_input(self, lines: list[str]):
        return [int(num) for num in lines[0].split(",")]


    def simulate_fish(self, day_count: int) -> int:
        ages = [0 for _ in range(9)]
        for age in self._input:
            ages[age] += 1

        for day in range(day_count):
            index = day % 9
            ages[index - 2] += ages[index]

        return sum(ages)


    def run_part1(self):
        return self.simulate_fish(80)


    def run_part2(self):
        return self.simulate_fish(256)
