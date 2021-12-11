using System.Collections.Generic;

namespace Aoc2021
{
    public class Puzzle : AocPuzzle<int[], int>
    {
        protected override IDictionary<string, int> TestAnswers { get; } = new Dictionary<string, int>
        {
            { "part1", 1656 },
            { "part2", 195 }
        };

        protected override int[] ParseInput(string[] lines)
        {
            var values = new int[SquidGrid.Size * SquidGrid.Size];
            int offset = 0;
            int zero = (int)'0';
            foreach (string line in lines)
            {
                for (int i = 0; i < SquidGrid.Size; ++i)
                {
                    values[offset + i] = line[i] - zero;
                }
                offset += SquidGrid.Size;
            }

            return values;
        }

        protected override int RunPart1()
        {
            var squidGrid = new SquidGrid(_input);
            for (int i = 0; i < 100; ++i)
            {
                squidGrid.ModelStep();
            }

            return squidGrid.FlashCount;
        }

        protected override int RunPart2()
        {
            var squidGrid = new SquidGrid(_input);
            int step = 1;
            while (squidGrid.ModelStep() < _input.Length)
            {
                ++step;
            }

            return step;
        }
    }
}