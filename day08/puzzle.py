from aoc import AocPuzzle


TEST_ANSWERS = {
    "part1": 26,
    "part2": 61229
}

SEGMENT_MAP = {
    2: [1],
    3: [7],
    4: [4],
    5: [2, 3, 5],
    6: [0, 6, 9],
    7: [8]
}


def get_unique_segments():
    return [length for length, numbers in SEGMENT_MAP.items() if len(numbers) == 1]


def is_subset(subset: str, superset: str) -> bool:
    for char in subset:
        if not char in superset:
            return False

    return True


class Entry:
    def __init__(self, entry: str):
        self.patterns, self.output = [part.split(" ") for part in entry.strip().split(" | ")]


    def sort_segments(self):
        self.patterns = ["".join(sorted(pattern)) for pattern in self.patterns]
        self.output = ["".join(sorted(digit)) for digit in self.output]


class Puzzle(AocPuzzle[list[Entry], int]):
    def __init__(self):
        super().__init__(TEST_ANSWERS)


    def parse_input(self, lines: list[str]):
        return [Entry(line) for line in lines]


    def run_part1(self):
        unique_segments = get_unique_segments()
        return sum([len([digit for entry in self._input for digit in entry.output if len(digit) in unique_segments])])


    def run_part2(self):
        values: list[int] = []
        unique_segments = get_unique_segments()
        for entry in self._input:
            entry.sort_segments()
            segment_map: dict[int, list[str]] = {k: [] for k in range(2, 8)}
            number_map: dict[int, str] = {}
            for pattern in entry.patterns:
                length = len(pattern)
                segment_map[length].append(pattern)
                if length in unique_segments:
                    number_map[SEGMENT_MAP[length][0]] = pattern

            for i in range(len(segment_map[5])):
                if is_subset(number_map[1], segment_map[5][i]):
                    number_map[3] = segment_map[5].pop(i)
                    break

            for i in range(len(segment_map[6])):
                if is_subset(number_map[3], segment_map[6][i]):
                    number_map[9] = segment_map[6].pop(i)
                    break

            if is_subset(segment_map[5][0], number_map[9]):
                number_map[2] = segment_map[5][1]
                number_map[5] = segment_map[5][0]
            else:
                number_map[2] = segment_map[5][0]
                number_map[5] = segment_map[5][1]

            if is_subset(number_map[5], segment_map[6][0]):
                number_map[0] = segment_map[6][1]
                number_map[6] = segment_map[6][0]
            else:
                number_map[0] = segment_map[6][0]
                number_map[6] = segment_map[6][1]

            output_map = {v: k for k, v in number_map.items()}
            values.append(sum([10 ** i * output_map[entry.output[-i - 1]] for i in range(4)]))

        return sum(values)
