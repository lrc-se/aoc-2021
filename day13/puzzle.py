from dataclasses import dataclass
from aoc import AocPuzzle


TEST_ANSWERS = { "part1": 17 }


@dataclass
class Paper:
    coordinates: dict[int, set[int]]
    max_x: int
    max_y: int


class FoldInstruction:
    def __init__(self, instruction: str):
        parts = instruction.split("=")
        self.fold_along = parts[0][-1]
        self.line = int(parts[1])


class PageOne:
    def __init__(self, dots: list[str], fold_instructions: list[str]):
        coordinates: dict[int, set[int]] = {}
        max_x = 0
        max_y = 0
        for dot in dots:
            coord = [int(coord) for coord in dot.split(",")]
            if coord[1] not in coordinates:
                coordinates[coord[1]] = {coord[0]}
            else:
                coordinates[coord[1]].add(coord[0])

            if coord[0] > max_x:
                max_x = coord[0]

            if coord[1] > max_y:
                max_y = coord[1]

        self.paper = Paper(coordinates, max_x, max_y)
        self.fold_instructions = [FoldInstruction(instruction) for instruction in fold_instructions]


def fold_paper(paper: Paper, instruction: FoldInstruction) -> Paper:
    new_coordinates: dict[int, set[int]] = {}
    match instruction.fold_along:
        case "x":
            for y, xs in paper.coordinates.items():
                new_coordinates[y] = {paper.max_x - x if x > instruction.line else x for x in xs}

            return Paper(new_coordinates, (paper.max_x - 1) // 2, paper.max_y)
        case "y":
            for y in sorted(paper.coordinates):
                xs = paper.coordinates[y]
                if y > instruction.line:
                    new_y = paper.max_y - y
                    if new_y in new_coordinates:
                        new_coordinates[new_y].update(xs)
                    else:
                        new_coordinates[new_y] = paper.coordinates.get(new_y, xs).copy()
                else:
                    new_coordinates[y] = xs.copy()

            return Paper(new_coordinates, paper.max_x, (paper.max_y - 1) // 2)


def print_paper(paper: Paper):
    width = paper.max_x + 1
    for y in range(paper.max_y + 1):
        if y in paper.coordinates:
            print("".join(["#" if x in paper.coordinates[y] else "." for x in range(width)]))
        else:
            print("." * width)


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

        return sum([len(xs) for xs in paper.coordinates.values()])


    def run_part2(self):
        paper = self._input.paper
        for fold_instruction in self._input.fold_instructions:
            paper = fold_paper(paper, fold_instruction)

        print_paper(paper)
