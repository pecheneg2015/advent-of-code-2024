import { getRawLines } from "#utils";

type Point = [number, number];
const dirs: Point[] = [[-1, 0], [0, 1], [1, 0], [0, -1]];

function findPoint(data: string[][], el: string): Point {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (data[i][j] === el) {
        return [i, j];
      }
    }
  }
  throw new Error("Could not find point");
}

function calc(
  data: string[][],
  startPoint: Point,
  endPoint: Point,
): Point[] {
  let stack: [Point, Point[]][] = [[startPoint, []]];
  while (stack.length) {
    let [point, path] = stack.pop()!;
    if (point[0] === endPoint[0] && point[1] === endPoint[1]) {
      return [...path, point];
    }
    dirs.forEach((dir) => {
      let newY = point[0] + dir[0];
      let newX = point[1] + dir[1];
      if (
        data[newY][newX] !== "#" &&
        path.findIndex((e) => e[0] === newY && e[1] === newX) === -1
      ) {
        stack.push([[newY, newX], [...path, point]]);
      }
    });
  }

  return [];
}

function caclCheatPathCount(
  data: string[][],
  startPoint: Point,
  endPoint: Point,
  maxCheat: number,
  target: number,
): number {
  let dafaultPath: Point[] = calc(data, startPoint, endPoint);

  let items: number[] = [];
  dafaultPath.forEach((el, ind) => {
    for (let i = 2; i <= maxCheat; i++) {
      let arr: number[] = [];
      dafaultPath.forEach((e, n) => {
        if (Math.abs(e[0] - el[0]) + Math.abs(e[1] - el[1]) === i) {
          arr.push(n);
        }
      });
      arr.forEach((n) => {
        items.push(n - ind - i);
      });
    }
  });

  let m: Record<string, number> = {};
  items.filter((e) => e >= target).forEach((e) => {
    if (!m[e]) {
      m[e] = 0;
    }
    m[e]++;
  });
  console.log(m);
  return Object.values(m).reduce((acc, el) => acc + el, 0);
}
const main = async () => {
  const rawData = await getRawLines("./day_20/data/input.txt");
  const field = rawData.map((e) => e.split(""));
  const startPoint: Point = findPoint(field, "S");
  const endPoint: Point = findPoint(field, "E");
  console.log(
    "Part 1:",
    caclCheatPathCount(field, startPoint, endPoint, 2, 100),
  );
  console.log(
    "Part 2:",
    caclCheatPathCount(field, startPoint, endPoint, 20, 100),
  );
};
main();
