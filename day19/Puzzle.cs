using System.Collections.Generic;
using System.Linq;

namespace Aoc2021
{
    public class Puzzle : AocPuzzle<Scanner[], int>
    {
        protected override IDictionary<string, int> TestAnswers { get; } = new Dictionary<string, int>
        {
            { "part1", 79 },
            { "part2", 3621 }
        };

        protected override Scanner[] ParseInput(string[] lines)
        {
            var scanners = new List<Scanner>();
            var beacons = new List<Vector>();
            foreach (string line in lines)
            {
                if (line.Length == 0)
                {
                    scanners.Add(new Scanner(beacons.ToArray()));
                    continue;
                }

                if (line.StartsWith("---"))
                {
                    beacons.Clear();
                    continue;
                }

                var coords = line.Split(',').Select(coord => int.Parse(coord)).ToArray();
                beacons.Add(new Vector(coords[0], coords[1], coords[2]));
            }

            scanners.Add(new Scanner(beacons.ToArray()));
            return scanners.ToArray();
        }

        protected override int RunPart1()
        {
            var beacons = FindBeacons();
            return beacons.Count;
        }

        protected override int RunPart2()
        {
            FindBeacons();
            int maxDistance = 0;
            for (int i = 0; i < _input.Length - 1; ++i)
            {
                for (int j = i + 1; j < _input.Length; ++j)
                {
                    var distance = _input[i].Position - _input[j].Position;
                    int manhattanDistance = distance.ManhattanLength;
                    if (manhattanDistance > maxDistance)
                        maxDistance = manhattanDistance;
                }
            }

            return maxDistance;
        }

        private HashSet<Vector> FindBeacons()
        {
            var scanners = _input[1..].ToList();
            var processedScanners = new List<Scanner> { _input[0] };

            while (scanners.Count > 0)
            {
                for (int i = 0; i < processedScanners.Count; ++i)
                {
                    for (int j = 0; j < scanners.Count; ++j)
                    {
                        for (int orientation = 0; orientation < 24; ++orientation)
                        {
                            var beacons = scanners[j].GetBeacons(orientation);
                            var offset = processedScanners[i].GetBeaconOffset(beacons, 12);
                            if (offset.HasValue)
                            {
                                scanners[j].Position = processedScanners[i].Position + offset.Value;
                                scanners[j].Beacons = beacons;
                                processedScanners.Add(scanners[j]);
                                scanners.RemoveAt(j--);
                                break;
                            }
                        }
                    }
                }
            }

            var foundBeacons = new HashSet<Vector>();
            foreach (var scanner in processedScanners)
            {
                foundBeacons.UnionWith(scanner.Beacons.Select(b => b + scanner.Position));
            }

            return foundBeacons;
        }
    }
}