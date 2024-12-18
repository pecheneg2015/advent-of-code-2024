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
  "S": "N",
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

type StackEl = [Point, D, number];

function firstPartSolution(
  data: string[][],
  start: Point,
  end: Point,
): number {
  let r: number[] = [];
  let minRes = Number.MAX_SAFE_INTEGER;
  const visited = new Set<string>();

  const m: Record<string, boolean> = {};
  const stack: StackEl[] = [[start, "E", 0]];
  while (stack.length) {
    stack.sort((a, b) => a[2] - b[2]);
    const [point, dir, sum] = stack.shift() as StackEl;
    if (point[0] === end[0] && point[1] === end[1]) {
      minRes = Math.min(sum, minRes);
      return sum; // r.push(sum)
      continue;
    }
    if (m[`${point[0]}_${point[1]}_${dir}`]) {
      continue;
    }

    const del = delta[dir];
    const first = point[0] + del[0];
    const second = point[1] + del[1];
    m[`${point[0]}_${point[1]}_${dir}`] = true;

    if (data[first][second] !== "#") {
      stack.push([
        [first, second],
        dir,
        sum + 1,
      ]);
    }

    stack.push([
      point,
      dAvailable[dir][1],
      sum + 1000,
    ]);
    stack.push([
      point,
      dAvailable[dir][0],
      sum + 1000,
    ]);
  }
  return minRes;
}

type StackEl2 = [Point, D, number, Point[]];

function secondPartSolution(
  data: string[][],
  start: Point,
  end: Point,
  target: number,
): number {
  const queue: [[Point, number, number, Point[]]] = [
    [start, 1, 0, [start]],
  ];
  const visited = new Map<string, number>();
  const paths: Point[][] = [];

  while (queue.length) {
    const [point, dir, score, path] = queue.shift()!;
    const key = `${point[0]}_${point[1]}_${dir}`;

    if (score > target) continue;
    if (visited.has(key) && visited.get(key)! < score) continue;
    visited.set(key, score);

    if (point[0] === end[0] && point[1] === end[1] && score === target) {
      paths.push(path);
      continue;
    }

    const newPoint: Point = [point[0] + dirs[dir][0], point[1] + dirs[dir][1]];
    if (data[newPoint[0]]?.[newPoint[1]] !== "#") {
      queue.push([newPoint, dir, score + 1, [...path, newPoint]]);
    }

    queue.push([point, (dir + 1) % 4, score + 1000, [...path]]);
    queue.push([point, (dir + 3) % 4, score + 1000, [...path]]);
  }
  const res: string[] = paths.flat().map((e) => `${e[0]}_${e[1]}`);

  return new Set(res).size;
}

const main = async () => {
  const rawData = await getRawLines("./day_16/data/input.txt");
  const field = getArr(rawData);
  const startPoint: Point = findPoint(field, "S");
  const endPoint: Point = findPoint(field, "E");
  const firstPartResult = firstPartSolution(field, startPoint, endPoint);
  console.log("Part 1: ", firstPartResult);
  console.log(
    "Part 2: ",
    secondPartSolution(field, startPoint, endPoint, firstPartResult),
  );
};

main();
