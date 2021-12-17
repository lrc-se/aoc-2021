import re
from dataclasses import dataclass
from aoc import AocPuzzle


TEST_ANSWERS = {
    "part1": 45,
    "part2": 112
}


@dataclass
class TargetArea:
    min_x: int
    max_x: int
    min_y: int
    max_y: int


class Puzzle(AocPuzzle[TargetArea, int]):
    def __init__(self):
        super().__init__(TEST_ANSWERS)


    def parse_input(self, lines: list[str]):
        matches = re.search(r"x=(.+)\.\.(.+), y=(.+)\.\.(.+)", lines[0])
        return TargetArea(*[int(match) for match in matches.groups()])


    def get_dxs(self):
        dxs: list[int] = []
        dx = 1
        while dx < self._input.min_x:
            x = dx
            cur_dx = dx
            while x <= self._input.max_x:
                if x >= self._input.min_x:
                    dxs.append(dx)
                    break
                elif cur_dx == 1:
                    break

                cur_dx -= 1
                x += cur_dx

            dx += 1

        dxs.extend(range(self._input.min_x, self._input.max_x + 1))
        return dxs


    def get_dys(self):
        dys: list[int] = []
        dy = -1
        while dy > self._input.max_y:
            y = dy
            cur_dy = dy
            while y >= self._input.min_y:
                if y <= self._input.max_y:
                    dys.append(dy)
                    break

                cur_dy -= 1
                y += cur_dy

            dy -= 1

        dys.extend(range(self._input.max_y, self._input.min_y - 1, -1))
        dys.extend([-dy - 1 for dy in dys])
        dys.sort()
        return dys


    def run_part1(self):
        dys = self.get_dys()
        return (dys[-1] * (dys[-1] + 1)) // 2


    def run_part2(self):
        dxs = self.get_dxs()
        dys = self.get_dys()
        velocity_count = 0
        for dx in dxs:
            tmp = dx * (dx + 1)
            for dy in dys:
                if dy > 0:
                    cur_dx = max(dx - 2 * dy - 1, 0)
                    cur_dy = -dy - 1
                    x = (tmp - cur_dx * (cur_dx + 1)) // 2
                    y = 0
                else:
                    cur_dx = max(dx - 1, 0)
                    cur_dy = dy - 1
                    x = dx
                    y = dy

                while x <= self._input.max_x and y >= self._input.min_y:
                    if x >= self._input.min_x and y <= self._input.max_y:
                        velocity_count += 1
                        break

                    x += cur_dx
                    y += cur_dy
                    cur_dy -= 1
                    if cur_dx > 0:
                        cur_dx -= 1

        return velocity_count
