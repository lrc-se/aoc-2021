using System.Collections.Generic;
using System.Linq;

namespace Aoc2021
{
    public class SeaFloor
    {
        private readonly int _width;
        private readonly int _height;
        private readonly SeaCucumber[][] _locations;
        private readonly SeaCucumber[] _eastSeaCucumbers;
        private readonly SeaCucumber[] _southSeaCucumbers;

        public SeaFloor(SeaCucumber[][] locations, SeaCucumber[] eastSeaCucumbers, SeaCucumber[] southSeaCucumbers)
        {
            _width = locations[0].Length;
            _height = locations.Length;
            _locations = locations;
            _eastSeaCucumbers = eastSeaCucumbers;
            _southSeaCucumbers = southSeaCucumbers;
        }

        public bool MoveSeaCucumbers()
        {
            var movingEastSeaCucumbers = new List<(SeaCucumber SeaCucumber, int X)>();
            foreach (var seaCucumber in _eastSeaCucumbers)
            {
                if (TryMoveEast(seaCucumber, out int newX))
                    movingEastSeaCucumbers.Add((seaCucumber, newX));
            }

            foreach (var move in movingEastSeaCucumbers)
            {
                _locations[move.SeaCucumber.Y][move.SeaCucumber.X] = null;
                _locations[move.SeaCucumber.Y][move.X] = move.SeaCucumber;
                move.SeaCucumber.X = move.X;
            }

            var movingSouthSeaCucumbers = new List<(SeaCucumber SeaCucumber, int Y)>();
            foreach (var seaCucumber in _southSeaCucumbers)
            {
                if (TryMoveSouth(seaCucumber, out int newY))
                    movingSouthSeaCucumbers.Add((seaCucumber, newY));
            }

            foreach (var move in movingSouthSeaCucumbers)
            {
                _locations[move.SeaCucumber.Y][move.SeaCucumber.X] = null;
                _locations[move.Y][move.SeaCucumber.X] = move.SeaCucumber;
                move.SeaCucumber.Y = move.Y;
            }

            return movingEastSeaCucumbers.Any() || movingSouthSeaCucumbers.Any();
        }

        private bool TryMoveEast(SeaCucumber seaCucumber, out int newX)
        {
            newX = (seaCucumber.X + 1) % _width;
            return (_locations[seaCucumber.Y][newX] == null);
        }

        private bool TryMoveSouth(SeaCucumber seaCucumber, out int newY)
        {
            newY = (seaCucumber.Y + 1) % _height;
            return (_locations[newY][seaCucumber.X] == null);
        }
    }

    public record SeaCucumber(SeaCucumberType Type, int X, int Y)
    {
        public int X { get; set; } = X;
        public int Y { get; set; } = Y;
    }

    public enum SeaCucumberType
    {
        East,
        South
    }
}
