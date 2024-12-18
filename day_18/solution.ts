import { getRawLines } from "#utils";

function prepareData(raw: string[]): Point[] {
  let res: Point[] = [];
  raw.forEach((line) => {
    let arr = line.split(",").map((e) => +e);
    res.push([arr[1], arr[0]]);
  });
  return res;
}

function generateField(
  len: number,
  points: Point[],
  maxPoint: number,
): string[][] {
  let data = Array.from(
    { length: len },
    () => Array.from({ length: len }, () => "."),
  );
  for (let i = 0; i < maxPoint; i++) {
    let [y, x] = points[i];
    data[y][x] = "#";
  }
  return data;
}
const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];

function firstPartSolution(
  points: Point[],
  size: number,
  broken: number,
): number {
  const data = generateField(size, points, broken);
  const start: Point = [0, 0];
  const end: Point = [data.length - 1, data.length - 1];
  const m: Record<string, boolean> = {};
  const stack: [Point, string, number][] = [[
    start,
    `${start[0]}_${start[1]}`,
    0,
  ]];
  while (stack.length) {
    const [point, visited, len] = stack.shift()!;
    if (point[0] === end[0] && point[1] === end[1]) {
      return len;
    }
    dirs.forEach((dir) => {
      const newPoint: Point = [point[0] + dir[0], point[1] + dir[1]];
      const newPointKey = `${newPoint[0]}_${newPoint[1]}`;
      const newPointVal = data[newPoint[0]]?.[newPoint[1]];

      if (newPointVal && newPointVal !== "#" && !m[newPointKey]) {
        m[newPointKey] = true;
        stack.push([newPoint, `${visited},${newPointKey}`, len + 1]);
      }
    });
  }
  return -1;
}

function secondPartSolution(
  points: Point[],
  size: number,
  defaultLeft: number,
): number {
  let left = defaultLeft;
  let right = points.length;
  let mid  = Math.floor((left+right)/2)

  while(left<=right){
    mid  = Math.floor((left+right)/2)
    let res  = firstPartSolution(points,size,mid) 
    if(res===-1){
      right = mid-1
    }else{
      left=mid+1
    }
  }
  return right;
}

type Point = [number, number];
const main = async () => {
  const rawData = await getRawLines("./day_18/data/input.txt");
  const points = prepareData(rawData);
  console.log("Part 1:", firstPartSolution(points, 71, 1024));
  console.log("Part 2:",points[secondPartSolution(points, 71, 1024)]);

};
main();
