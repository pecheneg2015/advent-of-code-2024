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

function getNewPoint(val: number, delta: number, max: number, repeat: number) {
  const newVal = val + (delta * repeat) % max;
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
function getMap(
  data: Data[],
  max: Point,
  repeat: number,
): Record<string, number> {
  const m: Record<string, number> = {};

  data.forEach((item) => {
    const { velocity } = item;
    let point = item.start;
    point = [
      getNewPoint(point[0], velocity[0], max[0], repeat),
      getNewPoint(point[1], velocity[1], max[1], repeat),
    ];

    let key = `${point[0]}_${point[1]}`;
    if (!m[key]) {
      m[key] = 0;
    }
    m[key]++;
  });
  return m;
}
function firstPartSolution(data: Data[]): number {
  const max: Point = [101, 103];
  const repeat = 100;
  const m: Record<string, number> = getMap(data, max, repeat);
  const xMiddle = Math.floor(max[0] / 2);
  const yMiddle = Math.floor(max[1] / 2);
  const [xMax, yMax] = max;
  const first = calcRobotCount(m, [0, xMiddle - 1], [0, yMiddle - 1]);
  const second = calcRobotCount(m, [0, xMiddle - 1], [yMiddle + 1, yMax]);
  const third = calcRobotCount(m, [xMiddle + 1, xMax], [0, yMiddle - 1]);
  const fourth = calcRobotCount(m, [xMiddle + 1, xMax], [yMiddle + 1, yMax]);

  return first * second * third * fourth;
}
const dirs: Point[] = [[-1, 0], [0, 1], [1, 0], [0, -1]];

function findGroupCount(data: Record<string, number>): number {
  let groupCount = 0;
  for(const key of Object.keys(data)){
    const el = data[key]
      if (el > 0) {
      groupCount++;
      const stack: string[] = [key];
       data[key]=0;
      while (stack.length > 0) {
        const cRaw = stack.pop() as string;
        const c = cRaw.split("_").map((e) => +e);
        dirs.forEach(([deltaX, deltaY]) => {
          const [newX, newY] = [c[0] + deltaX, c[1] + deltaY];
          const newKey = `${newX}_${newY}`;
          if (data[newKey]) {
             data[newKey]=0;
            stack.push(newKey);
          }
        });
      }
    }
  }
  return groupCount;
}
function secondPartSolution(data: Data[]): number {
  const max: Point = [101, 103];
  let repeat = 1;
  while (repeat < 2*max[0]*max[1]) {
    const groupCount = findGroupCount(getMap(data, max, repeat));

    if (groupCount < data.length / 2) {
      return repeat;
    }
    repeat++;
  }
  return -1;
}

const main = async () => {
  const rawData = await getRawLines("./day_14/data/input.txt");
  const data = rawData.map(prepareData);
  console.log("Part 1: ", firstPartSolution(data));
  console.log("Part 2: ", secondPartSolution(data));
};

main();
