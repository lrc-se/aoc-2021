using System.Collections.Generic;
using System.Linq;

namespace Aoc2021
{
    public class Scanner
    {
        public Vector[] Beacons { get; set; }

        public Vector Position { get; set; }

        public Scanner(Vector[] beacons)
        {
            Beacons = beacons;
        }

        public Vector[] GetBeacons(int orientation)
        {
            var beacons = Beacons.Select(b => b.Clone()).ToArray();
            if (orientation == 0)
                return beacons;

            if (orientation < 8)
            {
                for (int i = 0; i < beacons.Length; ++i)
                {
                    if (orientation >= 4)
                        beacons[i].RotateZ(2);

                    beacons[i].RotateX(orientation);
                }
            }
            else if (orientation < 16)
            {
                for (int i = 0; i < beacons.Length; ++i)
                {
                    beacons[i].RotateZ(1);
                    if (orientation >= 12)
                        beacons[i].RotateX(2);

                    beacons[i].RotateY(orientation);
                }
            }
            else if (orientation < 24)
            {
                for (int i = 0; i < beacons.Length; ++i)
                {
                    beacons[i].RotateY(3);
                    if (orientation >= 20)
                        beacons[i].RotateX(2);

                    beacons[i].RotateZ(orientation);
                }
            }

            return beacons;
        }

        public Vector? GetBeaconOffset(Vector[] otherBeacons, int threshold)
        {
            var otherDistancesCache = new Dictionary<Vector, IDictionary<Vector, Vector>>();
            foreach (var otherBeacon in otherBeacons)
            {
                otherDistancesCache[otherBeacon] = otherBeacons.ToDictionary(ob => ob, ob => ob - otherBeacon);
            }

            foreach (var beacon in Beacons)
            {
                var distances = Beacons.ToDictionary(b => b, b => b - beacon);
                foreach (var otherBeacon in otherBeacons)
                {
                    var otherDistances = otherDistancesCache[otherBeacon];
                    var offsets = (from d in distances
                                   join od in otherDistances on d.Value equals od.Value
                                   select d.Key - od.Key).ToArray();

                    if (offsets.Length >= threshold)
                        return offsets[0];
                }
            }

            return null;
        }
    }
}
