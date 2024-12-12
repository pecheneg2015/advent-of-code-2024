import { getRawLines } from "#utils";

function calcResult(
  updRes: (start: string, end: string) => void,
  data: number[][],
) {
  const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];

  data.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 0) {
        const start = `${y}_${x}`;
        const stack = [[y, x, 0]];
        while (stack.length) {
          const el = stack.pop() as [number, number, number];
          if (el[2] === 9) {
            updRes(start, `${el[0]}_${el[1]}`);
            continue;
          } else {
            dirs.forEach((dir) => {
              const newY = dir[0] + el[0];
              const newX = dir[1] + el[1];
              const newValExpected = el[2] + 1;
              if (data[newY]?.[newX] === newValExpected) {
                stack.push([newY, newX, newValExpected]);
              }
            });
          }
        }
      }
    });
  });
}

function firstPartSolution(data: number[][]): number {
  const m: Record<string, string[]> = {};
  calcResult((start, end) => {
    if (!Array.isArray(m[start])) {
      m[start] = [];
    }
    m[start].push(end);
  }, data);
  return Object.values(m).map((e) => Array.from(new Set(e))).reduce(
    (acc, el) => acc + el.length,
    0,
  );
}

function secondPartSolution(data: number[][]): number {
  const m: Record<string, string[]> = {};
  calcResult((start, end) => {
    if (!Array.isArray(m[start])) {
      m[start] = [];
    }
    m[start].push(end);
  }, data);
  return Object.values(m).reduce((acc, el) => acc + el.length, 0);
}

const main = async () => {
  const rawData = await getRawLines("./day_10/data/input.txt");
  const data = rawData.map((e) => e.split("").map((e) => +e));
  console.log("Part 1: ", firstPartSolution(data));
  console.log("Part 2: ", secondPartSolution(data));
};

main();
