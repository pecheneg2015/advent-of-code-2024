import { getRawLines } from "#utils";

type Point = [number, number]
type Edge = [Point, Point]
const dirs: Point[] = [[-1, 0], [0, 1], [1, 0], [0, -1]];

function getSecondEdgePoint(
  c: Point,
  dirInd: number,
): Edge {
  switch (dirInd) {
    case 0:
      return [[c[0], c[1]], [c[0], c[1] + 1]];
    case 1:
      return [[c[0], c[1] + 1], [c[0] + 1, c[1] + 1]];
    case 2:
      return [[c[0] + 1, c[1] + 1], [c[0] + 1, c[1]]];
    default:
      return [[c[0] + 1, c[1]], [c[0], c[1]]];
  }
}

function calcParams(
  data: string[][],
): { p: number[]; s: number[]; e: number[] } {
  const p: number[] = [];
  const s: number[] = [];
  const e: number[] = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      const el = data[i][j];
      if (el.length === 1) {
        const stack: Point[] = [[i, j]];
        const startItem = el;
        data[i][j] = `${el}-1`;

        let currentPerimeter = 0;
        let currentSq = 0;
        const edges: Edge[] = [];

        while (stack.length > 0) {
          const c = stack.shift() as Point;
          currentSq += 1;

          dirs.forEach(([deltaY, deltaX], dirInd) => {
            const [newY, newX] = [c[0] + deltaY, c[1] + deltaX];
            const newEl = data[newY]?.[newX];
            if (newEl === startItem) {
              data[newY][newX] = `${el}-1`;
              stack.push([newY, newX]);
            } else if (!newEl || (newEl !== `${el}-1` && newEl !== el)) {
              currentPerimeter++;
              if (!newEl || newEl !== el) {
                edges.push(getSecondEdgePoint(c, dirInd));
              }
            }
          });
        }
        p.push(currentPerimeter);
        s.push(currentSq);
        e.push(calcEdgesCount(edges));
      }
    }
  }
  return { p, s, e };
}

function getDirection(el: Edge): "x" | "y" {
  return el[0][0] === el[1][0] ? "x" : "y";
}

function calcEdgesCount(data: Edge[]): number {
  let res = 0;
  const visited: number[] = [0];
  let el = data[0] as Edge;
  let counter = 0;
  while (counter < data.length) {
    counter++;
    const ind = data.findIndex((e) =>
      el[1][0] === e[0][0] && el[1][1] === e[0][1]
    );
    const newEl = data[ind] as Edge;
    const dir = getDirection(el);
    const newdir = getDirection(newEl);
    if (dir !== newdir)
      res++;
    const notVisitedInd = data.findIndex((_, i) => !visited.includes(i));
    el = !visited.includes(ind) ? newEl : data[notVisitedInd];
    visited.push(
      !visited.includes(ind) ? ind : notVisitedInd,
    );
  }
  return res;
}

function firstPartSolution(data: string[][]): number {
  const { p, s } = calcParams(data);
  return p.reduce((acc, el, ind) => acc + el * s[ind], 0);
}

function secondPartSolutionV2(data: string[][]): number {
  const { e, s } = calcParams(data);
  return e.reduce((acc, el, ind) => acc + el * s[ind], 0);
}

const main = async () => {
  const rawData = await getRawLines("./day_12/data/input.txt");
  const data = rawData.map((e) => e.split(""));
  console.log("Part 1: ", firstPartSolution(structuredClone(data)));
  console.log("Part 2: ", secondPartSolutionV2(structuredClone(data)));
};

main();
