using System.Collections.Generic;
using System.Linq;

namespace Aoc2021
{
    public class Puzzle : AocPuzzle<int[], int>
    {
        protected override IDictionary<string, int> TestAnswers { get; } = new Dictionary<string, int>
        {
            { "part1", 1379 },
            { "part2", 56154 }
        };

        protected override int[] ParseInput(string[] lines)
        {
            return lines.Select(line => int.Parse(line)).ToArray();
        }

        protected override int RunPart1()
        {
            return _input.Sum();
        }

        protected override int RunPart2()
        {
            return _input.Aggregate((prev, cur) => prev * cur);
        }
    }
}