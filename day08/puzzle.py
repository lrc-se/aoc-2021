from aoc import AocPuzzle


TEST_ANSWERS = {
    "part1": 26,
    "part2": 61229
}

UNIQUE_SEGMENT_MAP = {
    2: 1,
    3: 7,
    4: 4,
    7: 8
}


def is_subset(subset: str, superset: str) -> bool:
    for char in subset:
        if not char in superset:
            return False

    return True


class Entry:
    def __init__(self, entry: str):
        self.patterns, self.output = [part.split(" ") for part in entry.strip().split(" | ")]


class Puzzle(AocPuzzle[list[Entry], int]):
    def __init__(self):
        super().__init__(TEST_ANSWERS)


    def parse_input(self, lines: list[str]):
        return [Entry(line) for line in lines]


    def run_part1(self):
        return sum([len([digit for entry in self._input for digit in entry.output if len(digit) in UNIQUE_SEGMENT_MAP])])


    def run_part2(self):
        values: list[int] = []
        for entry in self._input:
            segment_map_5: list[str] = []
            segment_map_6: list[str] = []
            number_map: dict[int, str] = {}
            for pattern in entry.patterns:
                length = len(pattern)
                if length == 5:
                    segment_map_5.append(pattern)
                elif length == 6:
                    segment_map_6.append(pattern)
                else:
                    number_map[UNIQUE_SEGMENT_MAP[length]] = pattern

            for i in range(3):
                if is_subset(number_map[1], segment_map_5[i]):
                    number_map[3] = segment_map_5.pop(i)
                    break

            for i in range(3):
                if is_subset(number_map[4], segment_map_6[i]):
                    number_map[9] = segment_map_6.pop(i)
                    break

            if is_subset(number_map[1], segment_map_6[0]):
                number_map[0] = segment_map_6[0]
                number_map[6] = segment_map_6[1]
            else:
                number_map[6] = segment_map_6[0]
                number_map[0] = segment_map_6[1]

            if is_subset(segment_map_5[0], number_map[6]):
                number_map[5] = segment_map_5[0]
                number_map[2] = segment_map_5[1]
            else:
                number_map[2] = segment_map_5[0]
                number_map[5] = segment_map_5[1]

            output_map = {"".join(sorted(v)): k for k, v in number_map.items()}
            values.append(sum([10 ** i * output_map["".join(sorted(entry.output[-i - 1]))] for i in range(4)]))

        return sum(values)
