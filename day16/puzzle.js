import { createAocPuzzle } from "./aoc.js";

const testAnswers = {
  part1: 31,
  part2: 1
};

function parseInput(lines) {
  const packets = [];
  for (let i = 0; i < lines.length; ++i) {
    const parts = [];
    const hex = lines[i];
    let j = 0;
    while (j < hex.length - 12) {
      parts.push((+`0x${hex.substr(j, 12)}`).toString(2).padStart(48, "0"));
      j += 12;
    }
    parts.push((+`0x${hex.substring(j)}`).toString(2).padStart((hex.length - j) * 4, "0"));
    packets.push(parts.join("").padEnd(hex.length * 4, "0"));
  }
  return packets;
}

function parsePacket(bin) {
  const version = +`0b${bin.substr(0, 3)}`;
  const type = +`0b${bin.substr(3, 3)}`;
  let value;
  let subPackets = [];
  let index = 6;

  if (type == 4) {
    const valueBin = [];
    while (true) {
      const flag = bin[index];
      valueBin.push(bin.substr(index + 1, 4));
      index += 5;
      if (flag == "0") {
        break;
      }
    }
    value = +`0b${valueBin.join("")}`;
  } else {
    switch (bin[index]) {
      case "0":
        const bitCount = +`0b${bin.substr(index + 1, 15)}`;
        index += 16;
        let count = 0;
        while (count < bitCount) {
          const packet = parsePacket(bin.substring(index));
          subPackets.push(packet);
          count += packet.length;
          index += packet.length;
        }
        break;
      case "1":
        const packetCount = +`0b${bin.substr(index + 1, 11)}`;
        index += 12;
        for (let i = 0; i < packetCount; ++i) {
          const packet = parsePacket(bin.substring(index));
          subPackets.push(packet);
          index += packet.length;
        }
        break;
    }

    switch (type) {
      case 0:
        value = subPackets.reduce((prev, cur) => prev + cur.value, 0);
        break;
      case 1:
        value = subPackets.reduce((prev, cur) => prev * cur.value, 1);
        break;
      case 2:
        value = Math.min(...subPackets.map(subPacket => subPacket.value));
        break;
      case 3:
        value = Math.max(...subPackets.map(subPacket => subPacket.value));
        break;
      case 5:
        value = +(subPackets[0].value > subPackets[1].value);
        break;
      case 6:
        value = +(subPackets[0].value < subPackets[1].value);
        break;
      case 7:
        value = +(subPackets[0].value === subPackets[1].value);
        break;
    }
  }

  return {
    version,
    type,
    length: index,
    value,
    subPackets
  };
}

function getVersionSum(packet, sum = 0) {
  sum += packet.version;
  for (let i = 0; i < packet.subPackets.length; ++i) {
    sum = getVersionSum(packet.subPackets[i], sum);
  }
  return sum;
}

function runPart1(input) {
  const packet = parsePacket(input[0]);
  return getVersionSum(packet);
}

function runPart2(input, isTest = false) {
  const packet = parsePacket(input[isTest ? 1 : 0]);
  return packet.value;
}

export function createPuzzle() {
  return createAocPuzzle({ parseInput, runPart1, runPart2, testAnswers });
}
