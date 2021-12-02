from aoc import AocPuzzle


TEST_ANSWERS = {
    "part1": 2421,
    "part2": 335
}


def is_prime(number: int):
    if number == 2 or number == 3:
        return True
    elif number < 2 or number % 2 == 0 or number % 3 == 0:
        return False

    factor = 5
    while factor * factor <= number:
        if number % factor == 0 or number % (factor + 2) == 0:
            return False

        factor += 6

    return True


class Puzzle(AocPuzzle[int, int]):
    def __init__(self):
        super().__init__(TEST_ANSWERS)


    def parse_input(self, lines: list[str]):
        return [int(line) for line in lines]


    def run_part1(self):
        result = 0
        for i, number in enumerate(self._input):
            if is_prime(number):
                result += i * number

        return result


    def run_part2(self):
        result = 0
        for i, number in enumerate(self._input):
            if not is_prime(number):
                if i % 2 == 0:
                    result += number
                else:
                    result -= number

        return result
