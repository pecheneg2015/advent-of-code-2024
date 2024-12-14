import { getRawLines } from "#utils";

type Point = [number, number];
type Data = {
  start: Point;
  velocity: Point;
};

function preparePoint(data: string): Point {
  const arr = data.split("=");
  const vals = arr[1].split(",");
  return [
    Number.parseInt(vals[0]),
    Number.parseInt(vals[1]),
  ];
}

function prepareData(data: string): Data {
  const arr = data.split(" ");

  return {
    start: preparePoint(arr[0]),
    velocity: preparePoint(arr[1]),
  };
}

function getNewPoint(val: number, delta: number, max: number) {
  const newVal = val + delta;
  if (newVal >= max) {
    return newVal % max;
  }
  if (newVal < 0) {
    return max + newVal;
  }
  return newVal;
}

function calcRobotCount(
  m: Record<string, number>,
  limitA: Point,
  limitB: Point,
): number {
  let res = 0;
  for (let i = limitA[0]; i <= limitA[1]; i++) {
    for (let j = limitB[0]; j <= limitB[1]; j++) {
      if (m[`${i}_${j}`]) {
        res += m[`${i}_${j}`];
      }
    }
  }
  return res;
}

function firstPartSolution(data: Data[]): number {
  let max: Point = [101, 103];
  let repeat = 100;
  let m: Record<string, number> = {};

  data.forEach((item) => {
    const { velocity } = item;
    let point = item.start;
    for (let i = 0; i < repeat; i++) {
      point = [
        getNewPoint(point[0], velocity[0], max[0]),
        getNewPoint(point[1], velocity[1], max[1]),
      ];
    }
    let key = `${point[0]}_${point[1]}`;
    if (!m[key]) {
      m[key] = 0;
    }
    m[key]++;
  });
  let m0 = max[0] - 1;
  let m1 = max[1] - 1;
  let first = calcRobotCount(m, [0, Math.floor(m0 / 2) - 1], [
    0,
    Math.floor(m1 / 2) - 1,
  ]);
  let second = calcRobotCount(m, [0, Math.floor(m0 / 2) - 1], [
    Math.floor(m1 / 2) + 1,
    m1,
  ]);
  let third = calcRobotCount(m, [Math.floor(m0 / 2) + 1, m0], [
    0,
    Math.floor(m1 / 2) - 1,
  ]);
  let fourth = calcRobotCount(m, [Math.floor(m0 / 2) + 1, m0], [
    Math.floor(m1 / 2) + 1,
    m1,
  ]);

  return first * second * third * fourth;
}

async function secondPartSolutionV2(data: Data[]): Promise<number> {
  let a = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]];
  let repeat = 5
  for (let i = 0; i < repeat; i++) {
    await Deno.writeTextFile("./day_14/demo.txt", JSON.stringify(i), {
      append: true,
    });
    await Deno.writeTextFile("./day_14/demo.txt", "\r\n", { append: true });
    await Deno.writeTextFile("./day_14/demo.txt", JSON.stringify(a), {
      append: true,
    });
    await Deno.writeTextFile("./day_14/demo.txt", "\r\n", { append: true });

  }

  return 0;
}

const main = async () => {
  const rawData = await getRawLines("./day_14/data/input.txt");
  let data = rawData.map(prepareData);
  console.log("Part 1: ", firstPartSolution(data));
  console.log("Part 2: ", secondPartSolutionV2(data));
};

main();
