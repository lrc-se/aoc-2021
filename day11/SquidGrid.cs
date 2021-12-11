using System.Collections.Generic;

namespace Aoc2021
{
    public class SquidGrid
    {
        public const int Size = 10;

        private readonly int[] _squids;

        private int _flashCount;
        public int FlashCount => _flashCount;

        public SquidGrid(int[] input)
        {
            _squids = new int[input.Length];
            input.CopyTo(_squids, 0);
        }

        public int ModelStep()
        {
            var flashIndices = new List<int>();
            for (int i = 0; i < _squids.Length; ++i)
            {
                if (++_squids[i] > 9)
                    flashIndices.Add(i);
            }

            int flashCount = 0;
            while (flashIndices.Count > 0)
            {
                ++flashCount;
                int index = flashIndices[0];
                flashIndices.RemoveAt(0);
                _squids[index] = 0;
                flashIndices.AddRange(IncreaseAdjacentSquids(index));
            }

            _flashCount += flashCount;
            return flashCount;
        }

        private bool IncreaseEnergy(int index)
        {
            if (_squids[index] == 0)
                return false;

            return (++_squids[index] == 10);
        }

        private IEnumerable<int> IncreaseAdjacentSquids(int index)
        {
            var flashIndices = new List<int>();
            bool hasLeft = (index % Size > 0);
            bool hasRight = (index % Size < Size - 1);

            if (hasLeft && IncreaseEnergy(index - 1))
                flashIndices.Add(index - 1);

            if (hasRight && IncreaseEnergy(index + 1))
                flashIndices.Add(index + 1);

            int offset = index - Size;
            if (offset >= 0)
            {
                if (IncreaseEnergy(offset))
                    flashIndices.Add(offset);

                if (hasLeft && IncreaseEnergy(offset - 1))
                    flashIndices.Add(offset - 1);

                if (hasRight && IncreaseEnergy(offset + 1))
                    flashIndices.Add(offset + 1);
            }

            offset = index + Size;
            if (offset < _squids.Length)
            {
                if (IncreaseEnergy(offset))
                    flashIndices.Add(offset);

                if (hasLeft && IncreaseEnergy(offset - 1))
                    flashIndices.Add(offset - 1);

                if (hasRight && IncreaseEnergy(offset + 1))
                    flashIndices.Add(offset + 1);
            }

            return flashIndices;
        }
    }
}
