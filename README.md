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
The idea is to reuse as much of the code as possible between solutions, only modifying functions in the puzzle file (and adding more files when necessary).
Due to the mandated use of Docker and its concept of build contexts, this reuse is limited to *copying* the common files to each new day,
so the whole thing is better thought of as what the setup *could* look like if multiple days were solved with the same language without directory traversal constraints.

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
*__Update:__ Made some performance improvements to the input parsing, which was extremely slow in comparison to the actual solutions. It still is, and it's not very pretty, but at least it's noticeably faster than it used to be.*

This day also revealed a weakness in the base code since the input had two different parts, which has since been addressed.

### Day 5 (JavaScript)

More arrays, but this time flat. Also added some features to the base code for better diagnostic capabilities during development.

### Day 6 (Python)

First puzzle where a naive solution to part one will blow up in part two, so this one uses rotation periods instead and barely breaks a sweat.
*__Update:__ Switched to a more direct age tracking approach instead, which boosted the performance quite nicely, especially after reintroducing modulo arithmetic and utilizing Python's negative indexing.*

### Day 7 (JavaScript)

Simple arithmetic today.

### Day 8 (Python)

For now uses a manual approach for part 2 based on known relationships between segment distributions for different digits, but this can surely be generalized and automated.

### Day 9 (JavaScript)

Uses recursion with a cache of already checked positions for part 2.

### Day 10 (Python)

Simple stack based solution.

### Day 11 (C#)

Using a flat representation of the grid this time, and a queue for the flashing squids.
*__Update:__ I've iterated back and forth between C# and JS takes on this one, but have (at least for now) landed on a C# version as the day's submission as it appears faster in its current form. The JS version is available in a parallel directory.*

### Day 12 (JavaScript)

Recursion to the rescue again. Part 2 performance isn't stellar right now, but it's not too bad either.

### Day 13 (Python)

List comprehensions galore.
*__Update:__ Switched to a set-based approach only manipulating the dots rather than the whole paper, which is drastically more efficient.*

### Day 14 (JavaScript)

First solved part 1 naively by actually constructing the polymer, but this of course quickly blew up in part 2, so switched to just counting pairs instead. Fun fun.

### Day 15 (JavaScript)

Solved using a general cost distance algorithm which is rather unpolished in its current state, but at least part 2 doesn't run for much longer than a second on my machine anyway.

### Day 16 (JavaScript)

Turned out to be pretty straightforward as long as the index in the bit stream was tracked properly, with some JS shortcuts.
Had to make allowance for multiple test inputs as well, but I'm still limited to one test answer per part.

### Day 17 (Python)

Saves some time by only considering the part of the flight path below the zero line, but it's not very pretty and there's huge room for improvements.

### Day 18 (JavaScript)

Could take some shortcuts here due to JavaScript's dynamic typing. Reduction is performed in-place but each addition parses a new pair from its combined string representation, which turned out to be faster and also preserves the original input data.
