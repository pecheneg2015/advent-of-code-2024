import { getRawLines } from "#utils";

type Point = [number, number];
const dirs: Point[] = [[-1, 0], [0, 1], [1, 0], [0, -1]];

const dirAvailable: Record<number, [number, number]> = {
  0: [3, 1],
  1: [0, 2],
  2: [1, 3],
  3: [2, 0],
};

type D = "N" | "E" | "W" | "S";
const dAvailable: Record<D, [D, D]> = {
  "E": ["N", "S"],
  "N": ["E", "W"],
  "W": ["N", "S"],
  "S": ["W", "E"],
};
const invD: Record<D, D> = {
  "E": "W",
  "N": "S",
  "W": "E",
  "S":"N",
};

const delta: Record<D, [number, number]> = {
  "E": [0, 1],
  "W": [0, -1],
  "N": [-1, 0],
  "S": [1, 0],
};

function getArr(data: string[]): string[][] {
  return data.map((e) => e.split(""));
}

function findPoint(data: string[][], el: string): Point {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (data[i][j] === el) {
        return [i, j];
      }
    }
  }
  throw new Error("Could not find start point");
}

function getCount(data: string[][]): number {
  let res = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (data[i][j] !== "#") {
        res++;
      }
    }
  }
  return res;
}

type StackEl = [Point, D, number, string];
function firstPartSolution(
  data: string[][],
  start: Point,
  end: Point,
): number {
  let res: number[] = [];
  let minRes = data.length * data[0].length * 100;
  let stack: StackEl[] = [[start, "E", 0, `${start[0]}_${start[1]}_E`]];
  while (stack.length) {
    let [point, dir, sum, visited] = stack.pop() as StackEl;
    if (data[point[0]][point[1]] === "#") {
      continue;
    }
    if (point[0] === end[0] && point[1] === end[1] ) {
      res.push(sum);
      minRes = Math.min(sum, minRes);
    } else if (sum < minRes) {
      let del = delta[dir];
      let first = point[0] + del[0];
      let second = point[1] + del[1];
      
      if (
        visited.search(`${first}_${second}_${dAvailable}`) === -1  && data[first][second]!=="#"
      ) {
        stack.push([
          [first, second],
          dir,
          sum+ 1,
          `${visited},${first}_${second}_${dir}`,
        ]);
      }
      del = delta[dAvailable[dir][1]];
      if (
        visited.search(`${point[0]}_${point[1]}_${dAvailable[dir][1]}`) === -1  && data[point[0]+del[0]][point[1]+del[1]]!=="#"
      ) {
        stack.push([
          point,
          dAvailable[dir][1],
          sum + 1000,
          `${visited},${point[0]}_${point[1]}_${dAvailable[dir][1]}`,
        ]);
      }
      del = delta[dAvailable[dir][0]];
      // console.log(dAvailable[dir][0])

      if (
        visited.search(`${point[0]}_${point[1]}_${dAvailable[dir][0]}`) === -1  && data[point[0]+del[0]][point[1]+del[1]]!=="#"
      ) {

        stack.push([
          point,
          dAvailable[dir][0],
          sum + 1000-1,
          `${visited},${point[0]}_${point[1]}_${dAvailable[dir][0]}`,
        ]);
      }

    }
  }
  console.log(Array.from(new Set(res)))
  return minRes;
}

function secondPartSolution(
  data: string[][],
  start: Point,
  end: Point,
  startDir: number,
): number {
  return 0;
}

const main = async () => {
  const rawData = await getRawLines("./day_16/data/input.txt");
  const field = getArr(rawData);
  const startPoint: Point = findPoint(field, "S");
  const endPoint: Point = findPoint(field, "E");
  console.log(startPoint, endPoint);
  console.log("Part 1: ", firstPartSolution(field, startPoint, endPoint));
};

main();
