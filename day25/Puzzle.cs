using System.Collections.Generic;

namespace Aoc2021
{
    public class Puzzle : AocPuzzle<string[], int>
    {
        protected override IDictionary<string, int> TestAnswers { get; } = new Dictionary<string, int>
        {
            { "part1", 58 }
        };

        protected override string[] ParseInput(string[] lines) => lines;

        protected override int RunPart1()
        {
            var seaFloor = GetSeaFloor(_input);
            int steps = 1;
            while (seaFloor.MoveSeaCucumbers())
            {
                ++steps;
            }

            return steps;
        }

        private static SeaFloor GetSeaFloor(string[] lines)
        {
            int width = lines[0].Length;
            int height = lines.Length;
            var locations = new SeaCucumber[height][];
            var eastSeaCucumbers = new List<SeaCucumber>();
            var southSeaCucumbers = new List<SeaCucumber>();

            for (int y = 0; y < height; ++y)
            {
                locations[y] = new SeaCucumber[width];
                for (int x = 0; x < width; ++x)
                {
                    switch (lines[y][x])
                    {
                        case '>':
                            var eastSeaCucumber = new SeaCucumber(SeaCucumberType.East, x, y);
                            locations[y][x] = eastSeaCucumber;
                            eastSeaCucumbers.Add(eastSeaCucumber);
                            break;
                        case 'v':
                            var southSeaCucumber = new SeaCucumber(SeaCucumberType.South, x, y);
                            locations[y][x] = southSeaCucumber;
                            southSeaCucumbers.Add(southSeaCucumber);
                            break;
                    }
                }
            }

            return new SeaFloor(locations, eastSeaCucumbers.ToArray(), southSeaCucumbers.ToArray());
        }
    }
}