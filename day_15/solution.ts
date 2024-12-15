import { getRawLines } from "#utils";

type Point = [number, number];
const dirs: Point[] = [[-1, 0], [0, 1], [1, 0], [0, -1]];
let dirKeyMap:Record<string,number>= {
  "^":0,
  ">":1,
  "v":2,
  "<":3,
}

let invMap:Record<string,string>= {
  "^":"v",
  ">":"<",
  "v":"^",
  "<":">",
}
function getArr(data: string[]): string[][] {
  const arr: string[][] = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].length === 0) {
      break;
    } else {
      arr.push(data[i].split(""));
    }
  }

  return arr;
}

function getActions(data: string[]): string[] {
  const arr: string[] = [];
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].length === 0) {
      break;
    } else {
      arr.push(data[i]);
    }
  }

  return arr.join("").split("");
}

function getStartPoint(data: string[][]): Point {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (data[i][j] === "@") {
        return [i, j];
      }
    }
  }
  throw new Error("Could not find start point");
}

function caclRes(data: string[][]): number {
  let res =0
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (data[i][j] === "O") {
       res+=i*100+j
      }
    }
  }
  return res
}

function updateField(data: string[][], current: Point, dirKey: number,invDirKey:number):Point {
  let dir = dirs[dirKey];
  let dirInv = dirs[invDirKey]
  let currentPoint = [...current];
  while (data[currentPoint[0]][currentPoint[1]] !== "#") {
    currentPoint = [currentPoint[0] + dir[0], currentPoint[1] + dir[1]];
    if(data[currentPoint[0]][currentPoint[1]]==="."){ 
      break;
    }
  }
  if(data[currentPoint[0]][currentPoint[1]] === "#")
    return current;
  let res = [...current]  as Point
  while(`${currentPoint[0]}_${currentPoint[1]}` !== `${current[0]}_${current[1]}`){

    res=[...currentPoint] as Point
    let newCoord = [currentPoint[0] + dirInv[0], currentPoint[1] + dirInv[1]]
    let t = data[currentPoint[0]][currentPoint[1]]
    data[currentPoint[0]][currentPoint[1]] = data[newCoord[0]][newCoord[1]]
    data[newCoord[0]][newCoord[1]] = t
    currentPoint= newCoord
  }
  // data.map(e=>{console.log(e.join(''))})
  return res
}

function firstPartSolution(
  data: string[][],
  start: Point,
  actions: string[],
): number {
  let current = start
  actions.forEach((action) => {
    current =updateField(data,current,dirKeyMap[action],dirKeyMap[invMap[action]])
  });
  // data.map(e=>{console.log(e.join(''))})
  return caclRes(data);
}

function secondPartSolution(data: string[]): number {
  return 0;
}

const main = async () => {
  const rawData = await getRawLines("./day_15/data/example.txt");
  const field = getArr(rawData);
  const actionList = getActions(rawData);
  const startPoint: Point = getStartPoint(field);
  field[startPoint[0]][startPoint[1]] = ".";
  console.log(startPoint);
  // const data = rawData.map(prepareData);
  console.log("Part 1: ", firstPartSolution(field,startPoint,actionList));
  // console.log("Part 2: ", secondPartSolution(data));
};
// res < 1433073
main();
