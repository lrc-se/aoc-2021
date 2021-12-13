from aoc import AocPuzzle


TEST_ANSWERS = { "part1": 17 }


class FoldInstruction:
    def __init__(self, instruction: str):
        parts = instruction.split("=")
        self.fold_along = parts[0][-1]
        self.line = int(parts[1])


class PageOne:
    def __init__(self, dots: list[str], fold_instructions: list[str]):
        coords: list[list[int]] = []
        max_x = 0
        max_y = 0
        for dot in dots:
            coord = [int(coord) for coord in dot.split(",")]
            coords.append(coord)
            if coord[0] > max_x:
                max_x = coord[0]

            if coord[1] > max_y:
                max_y = coord[1]

        self.paper = [[False for _ in range(max_x + 1)] for _ in range(max_y + 1)]
        for coord in coords:
            self.paper[coord[1]][coord[0]] = True

        self.fold_instructions = [FoldInstruction(instruction) for instruction in fold_instructions]


def fold_paper(paper: list[list[bool]], instruction: FoldInstruction) -> list[list[bool]]:
    match instruction.fold_along:
        case "x":
            return [[row[x] | row[-x - 1] for x in range(instruction.line)] for row in paper]
        case "y":
            return [[paper[y][x] | paper[-y - 1][x] for x in range(len(paper[0]))] for y in range(instruction.line)]


def print_paper(paper: list[list[bool]]):
    for row in paper:
        print("".join(["#" if dot else "." for dot in row]))


class Puzzle(AocPuzzle[PageOne, int]):
    def __init__(self):
        super().__init__(TEST_ANSWERS)


    def parse_input(self, lines: list[str]):
        dots: list[str] = []
        i = 0
        while lines[i].rstrip():
            dots.append(lines[i])
            i += 1

        return PageOne(dots, lines[i + 1:])


    def run_part1(self):
        paper = fold_paper(self._input.paper, self._input.fold_instructions[0])
        if self._is_test:
            print_paper(paper)

        return sum([sum(row) for row in paper])


    def run_part2(self):
        paper = self._input.paper
        for fold_instruction in self._input.fold_instructions:
            paper = fold_paper(paper, fold_instruction)

        print_paper(paper)
