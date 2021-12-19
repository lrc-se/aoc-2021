using System;

namespace Aoc2021
{
    public struct Vector
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int Z { get; set; }
        public int ManhattanLength => Math.Abs(X) + Math.Abs(Y) + Math.Abs(Z);

        public Vector(int x, int y, int z)
        {
            X = x;
            Y = y;
            Z = z;
        }

        public void RotateX(int steps)
        {
            int sin = _sin[steps % 4];
            int cos = _cos[steps % 4];
            int y = Y;
            int z = Z;
            Y = y * cos - z * sin;
            Z = y * sin + z * cos;
        }
    
        public void RotateY(int steps)
        {
            int sin = _sin[steps % 4];
            int cos = _cos[steps % 4];
            int x = X;
            int z = Z;
            X = x * cos + z * sin;
            Z = z * cos - x * sin;
        }

        public void RotateZ(int steps)
        {
            int sin = _sin[steps % 4];
            int cos = _cos[steps % 4];
            int x = X;
            int y = Y;
            X = x * cos - y * sin;
            Y = x * sin + y * cos;
        }

        public Vector Clone() => new(X, Y, Z);

        public override string ToString() => $"{X},{Y},{Z}";

        public override bool Equals(object obj) => obj is Vector vector && vector == this;

        public override int GetHashCode()
        {
            unchecked
            {
                return (X * 31 + Y) * 31 + Z;
            }
        }

        public static bool operator ==(Vector first, Vector second) => first.GetHashCode() == second.GetHashCode();

        public static bool operator !=(Vector first, Vector second) => !(first == second);

        public static Vector operator +(Vector first, Vector second) => new(first.X + second.X, first.Y + second.Y, first.Z + second.Z);

        public static Vector operator -(Vector first, Vector second) => new(first.X - second.X, first.Y - second.Y, first.Z - second.Z);

        private static readonly int[] _sin = new[] { 0, 1, 0, -1 };
        private static readonly int[] _cos = new[] { 1, 0, -1, 0 };
    }
}
