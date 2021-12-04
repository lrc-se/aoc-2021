from aoc import AocPuzzle


TEST_ANSWERS = {
    "part1": 150,
    "part2": 900
}


class Command:
    def __init__(self, cmd: str):
        self.direction, units = cmd.split(" ")
        self.units = int(units)


class Puzzle(AocPuzzle[list[Command], int]):
    def __init__(self):
        super().__init__(TEST_ANSWERS)


    def parse_input(self, lines: list[str]):
        return [Command(line) for line in lines]


    def run_part1(self):
        horizontal = 0
        depth = 0
        for command in self._input:
            match command.direction:
                case "forward":
                    horizontal += command.units
                case "down":
                    depth += command.units
                case "up":
                    depth -= command.units

        self.print_position(horizontal, depth)
        return horizontal * depth


    def run_part2(self):
        horizontal = 0
        depth = 0
        aim = 0
        for command in self._input:
            match command.direction:
                case "forward":
                    horizontal += command.units
                    depth += aim * command.units
                case "down":
                    aim += command.units
                case "up":
                    aim -= command.units

        self.print_position(horizontal, depth)
        return horizontal * depth


    def print_position(self, horizontal: int, depth: int):
        print("Horizontal:", horizontal)
        print("Depth:", depth)
