using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Aoc2021
{
    public class Puzzle : AocPuzzle<BingoData, int>
    {
        protected override IDictionary<string, int> TestAnswers { get; } = new Dictionary<string, int>
        {
            { "part1", 4512 },
            { "part2", 1924 }
        };

        protected override BingoData ParseInput(string[] lines)
        {
            var parts = new List<List<string>>();
            var part = new List<string>();
            foreach (string line in lines)
            {
                if (line.Length > 0)
                {
                    part.Add(line);
                    continue;
                }

                parts.Add(part);
                part = new List<string>();
            }
            if (part.Count > 0)
                parts.Add(part);

            var numbers = parts[0][0].Split(',').Select(number => int.Parse(number)).ToArray();
            int boardCount = parts.Count - 1;
            var boards = new Board[boardCount];
            for (int i = 0; i < boardCount; ++i)
            {
                boards[i] = new Board(
                    parts[i + 1]
                        .Select(row => Regex.Split(row.Trim(), @"\s+").Select(number => int.Parse(number)).ToArray())
                        .ToArray());
            }

            return new BingoData(numbers, boards);
        }

        protected override int RunPart1()
        {
            foreach (int number in _input.Numbers)
            {
                foreach (var board in _input.Boards)
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
            var boards = _input.Boards;
            var winningBoards = new List<Board>();
            var currentWinningBoards = new List<Board>();
            int lastWinningNumber = -1;

            foreach (int number in _input.Numbers)
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