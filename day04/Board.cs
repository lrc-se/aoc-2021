using System.Collections.Generic;

namespace Aoc2021
{
    public class Board
    {
        private readonly int _width;
        private readonly int _height;
        private readonly Cell[,] _cells;
        private readonly IDictionary<int, Cell> _cellIndex = new Dictionary<int, Cell>();

        private int _lastNumber = -1;

        public Board(int[][] numbers)
        {
            _height = numbers.Length;
            _width = numbers[0].Length;
            _cells = new Cell[_height, _width];

            for (int y = 0; y < _height; ++y)
            {
                for (int x = 0; x < _width; ++x)
                {
                    _cells[y, x] = new Cell(numbers[y][x]);
                    _cellIndex.Add(_cells[y, x].Number, _cells[y, x]);
                }
            }
        }

        public bool MarkNumber(int number)
        {
            _lastNumber = number;
            if (!_cellIndex.TryGetValue(number, out var cell))
                return false;

            cell.IsMarked = true;
            return true;
        }

        public bool IsWinner()
        {
            for (int y = 0; y < _height; ++y)
            {
                bool isFullRow = true;
                for (int x = 0; x < _width; ++x)
                {
                    if (!_cells[y, x].IsMarked)
                    {
                        isFullRow = false;
                        break;
                    }
                }

                if (isFullRow)
                    return true;
            }

            for (int x = 0; x < _width; ++x)
            {
                bool isFullColumn = true;
                for (int y = 0; y < _height; ++y)
                {
                    if (!_cells[y, x].IsMarked)
                    {
                        isFullColumn = false;
                        break;
                    }
                }

                if (isFullColumn)
                    return true;
            }

            return false;
        }

        public int GetScore()
        {
            if (_lastNumber == -1)
                return -1;

            int score = 0;
            for (int y = 0; y < _height; ++y)
            {
                for (int x = 0; x < _width; ++x)
                {
                    if (!_cells[y, x].IsMarked)
                        score += _cells[y, x].Number;
                }
            }

            return score * _lastNumber;
        }
    }

    public record Cell(int Number)
    {
        public bool IsMarked { get; set; }
    }
}
