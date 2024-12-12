import { getRawLines } from "#utils";
type Coords = Record<string, [number, number][]>;

function getCoords(data: string[][]): Coords {
  const coords: Coords = {};
  data.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell !== ".") {
        if (!coords[cell]) {
          coords[cell] = [];
        }
        coords[cell].push([i, j]);
      }
    });
  });
  return coords;
}

function isValidCoords(data: string[][], [y, x]: [number, number]) {
  const minY = 0;
  const maxY = data.length - 1;
  const minX = 0;
  const maxX = data[0].length - 1;
  return y >= minY && y <= maxY && x >= minX && x <= maxX;
}

function calcFirst(
  antenna: [number, number],
  secondAntenna: [number, number],
  res: Set<string>,
  data: string[][],
) {
  const delta = [antenna[0] - secondAntenna[0], antenna[1] - secondAntenna[1]];
  const point: [number, number] = [
    antenna[0] + delta[0],
    antenna[1] + delta[1],
  ];
  if (isValidCoords(data, point)) {
    res.add(`${point[0]}_${point[1]}`);
  }
}

function firstPartSolution(data: string[][], coords: Coords): number {
  const res: Set<string> = new Set();

  for (const antennaType in coords) {
    const antennaCoords = coords[antennaType];
    antennaCoords.forEach((antenna, i) => {
      for (let j = i + 1; j < antennaCoords.length; j++) {
        calcFirst(antenna, antennaCoords[j], res, data);
        calcFirst(antennaCoords[j], antenna, res, data);
      }
    });
  }
  return res.size;
}

function calcSecond(
  antenna: [number, number],
  secondAntenna: [number, number],
  res: Set<string>,
  data: string[][],
) {
  let currentPoint = secondAntenna;
  const delta = [antenna[0] - secondAntenna[0], antenna[1] - secondAntenna[1]];
  while (true) {
    const point: [number, number] = [
      currentPoint[0] + delta[0],
      currentPoint[1] + delta[1],
    ];
    if (isValidCoords(data, point)) {
      res.add(`${point[0]}_${point[1]}`);
      currentPoint = point;
    } else {
      break;
    }
  }
}

function secondPartSolution(data: string[][], coords: Coords): number {
  const res: Set<string> = new Set();

  for (const antennaType in coords) {
    const antennaCoords = coords[antennaType];
    antennaCoords.forEach((antenna, i) => {
      for (let j = i + 1; j < antennaCoords.length; j++) {
        calcSecond(antenna, antennaCoords[j], res, data);
        calcSecond(antennaCoords[j], antenna, res, data);
      }
    });
  }
  return res.size;
}

const main = async () => {
  const rawData = await getRawLines("./day_8/data/input.txt");
  const data = rawData.map((e) => e.split(""));
  const coords = getCoords(data);
  console.log("Part 1: ", firstPartSolution(data, coords));
  console.log("Part 2: ", secondPartSolution(data, coords));
};

main();
