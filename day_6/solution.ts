import { getRawLines } from "#utils";

function checkField(data: string[][], start: [number, number]) {
  const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let dirInd = 0;
  let visited: Set<string> = new Set();
  visited.add(`${start[0]}_${start[1]}`);
  let maxCount = data.length * data[0].length;
  let currentPosition = start;
  let count = 0;
  while (true) {
    if (count > maxCount) {
      break;
    }
    let newY = currentPosition[0] + dirs[dirInd][0];
    let newX = currentPosition[1] + dirs[dirInd][1];
    let el = data[newY]?.[newX];
    if (!el) {
      break;
    }
    if (el === "." || el === "^") {
      currentPosition = [newY, newX];
      visited.add(`${newY}_${newX}`);
      count++;
    }
    if (el === "#") {
      dirInd = (dirInd + 1) % 4;
    }
  }

  return { visited, isCyclic: count > maxCount };
}

function firstPartSolution(data: string[][], start: [number, number]): number {
  const { visited } = checkField(data, start);
  return visited.size;
}

function secondPartSolution(data: string[][], start: [number, number]): number {
  const { visited } = checkField(data, start);
  const visitedArr = Array.from(visited).filter((e) =>
    e !== `${start[0]}_${start[1]}`
  ).map((e) => e.split("_").map((el) => +el));

  let res = 0;
  visitedArr.forEach((point, i) => {
    if (i > 0) {
      data[visitedArr[i - 1][0]][visitedArr[i - 1][1]] = ".";
    }
    data[point[0]][point[1]] = "#";
    const { isCyclic } = checkField(data, start);
    if (isCyclic) {
      res++;
    }
  });

  return res;
}

function getStartCoords(data: string[][]): [number, number] {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (data[i][j] === "^") {
        return [i, j];
      }
    }
  }
  return [-1, -1];
}

const main = async () => {
  const rawData = await getRawLines("./day_6/data/input.txt");
  const data = rawData.map((e) => e.split(""));
  const startCoord: [number, number] = getStartCoords(data);
  console.log("Part 1: ", firstPartSolution(data, startCoord));
  console.log("Part 2: ", secondPartSolution(data, startCoord));
};

main();
