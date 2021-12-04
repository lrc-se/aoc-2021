Advent of Code 2021
===================

Solutions for the 2021 edition of [Advent of Code](https://adventofcode.com/),
which this year are part of [Cygni](https://cygni.se/)'s [managed variant](https://cygni.github.io/aoc/) (Swedish only),
resulting in both certain restrictions and certain opportunities. We'll see how it goes.

JavaScript solutions will use [Deno](https://deno.land) this time around, for which a couple of shell scripts are included for convenience.

This year's theme will be *performance*, i.e. attempting to write code that runs as efficiently as possible within certain bounds (such as the language chosen), and see how that affects readability.


Examples
--------

There are examples for JavaScript, Python and C#, which include variations on the same basic setup with no external dependencies.
The idea is to reuse (by copying, due to the day-by-day Docker setup) as much of the code as possible between solutions, only modifying functions in the puzzle file (and adding more files when necessary).

The following environment variables are recognized:

### `mode`

- `test`: reads input from *input-test.txt* and checks results against test answers given in the puzzle file
- `timed`: measures execution time for each part (only including the solution as such and not scaffolding or input parsing)
- `test-timed`: combines `test` and `timed`

Any other value, including an empty one, will use *input.txt* without timing.

### `part`

- `part1`: only runs part one
- `part2`: only runs part two

Any other value, including an empty one, will run both parts in sequence.


Puzzles
-------

### Test run (Python)

Internal Cygni test run.

### Day 1 (JavaScript)

Simple index-based `for` loops. I have a feeling there will be quite a few of those...

### Day 2 (Python)

Pattern matching FTW! (Requires Python 3.10)

### Day 3 (JavaScript)

Keeping the numbers as binary strings right up until the end, taking advantage of JS type coercion all the way.

### Day 4 (C#)

OK, starting to get a bit more complicated. Arrays, dictionaries and records to the rescue!

This day also revealed a weakness in the base code since the input had two different parts. I should do something about that.
