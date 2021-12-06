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
        timers = {k: 0 for k in range(7)}
        new_timers = {k: 0 for k in range(8)}
        for fish_timer in self._input:
            timers[fish_timer] += 1

        for day in range(1, day_count):
            for timer, count in new_timers.items():
                if count > 0 and day % 8 == timer:
                    timers[(day + 1) % 7] += count
                    new_timers[timer] -= count

            for timer, count in timers.items():
                if count > 0 and day % 7 == timer:
                    new_timers[(day + 8) % 8] += count

        return sum(timers.values()) + sum(new_timers.values())


    def run_part1(self):
        return self.simulate_fish(80)


    def run_part2(self):
        return self.simulate_fish(256)
