using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Aoc2021
{
    public class Puzzle : AocPuzzle<BingoData, int>
    {
        private static readonly Regex _whitespacePattern = new(@"\s+", RegexOptions.Compiled);

        protected override IDictionary<string, int> TestAnswers { get; } = new Dictionary<string, int>
        {
            { "part1", 4512 },
            { "part2", 1924 }
        };

        protected override IEnumerable<BingoData> ParseInput(IEnumerable<string> lines)
        {
            var parts = string.Join('\n', lines)
                .Split("\n\n")
                .Select(line => line.Split('\n'))
                .ToArray();
            var numbers = parts[0][0].Split(',').Select(number => int.Parse(number));
            var boards = parts
                .Skip(1)
                .Select(part => new Board(
                    part
                        .Select(row => 
                            _whitespacePattern.Split(row.Trim())
                                .Select(number => int.Parse(number))
                                .ToArray())
                        .ToArray()));

            return new[] { new BingoData(numbers.ToArray(), boards.ToArray()) };
        }

        protected override int RunPart1()
        {
            var boardData = _input[0];
            foreach (int number in boardData.Numbers)
            {
                foreach (var board in boardData.Boards)
                {
                    if (board.MarkNumber(number))
                    {
                        if (board.IsWinner())
                        {
                            Console.WriteLine($"Winning number: {number}");
                            return board.GetScore();
                        }
                    }
                }
            }

            return 0;
        }

        protected override int RunPart2()
        {
            var boardData = _input[0];
            var boards = boardData.Boards;
            var winningBoards = new List<Board>();
            var currentWinningBoards = new List<Board>();
            int lastWinningNumber = -1;

            foreach (int number in boardData.Numbers)
            {
                foreach (var board in boards)
                {
                    if (board.MarkNumber(number))
                    {
                        if (board.IsWinner())
                        {
                            lastWinningNumber = number;
                            currentWinningBoards.Add(board);
                            winningBoards.Add(board);
                        }
                    }
                }

                if (currentWinningBoards.Count > 0)
                {
                    boards = boards.Except(currentWinningBoards).ToArray();
                    if (boards.Length == 0)
                        break;

                    currentWinningBoards.Clear();
                }
            }

            if (winningBoards.Count > 0)
            {
                Console.WriteLine($"Last winning number: {lastWinningNumber}");
                return winningBoards.Last().GetScore();
            }

            return 0;
        }
    }

    public record BingoData(int[] Numbers, Board[] Boards);
}