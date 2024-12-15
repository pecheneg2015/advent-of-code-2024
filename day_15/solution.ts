import { getRawLines } from "#utils";

type Point = [number, number];
const dirs: Point[] = [[-1, 0], [0, 1], [1, 0], [0, -1]];
let dirKeyMap: Record<string, number> = {
  "^": 0,
  ">": 1,
  "v": 2,
  "<": 3,
};

let invMap: Record<string, string> = {
  "^": "v",
  ">": "<",
  "v": "^",
  "<": ">",
};
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
  return arr.join("").split("").filter((e) => ["^", ">", "v", "<"].includes(e));
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
  let res = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (data[i][j] === "O") {
        res += i * 100 + j;
      }
    }
  }
  return res;
}

function updateField(
  data: string[][],
  current: Point,
  dirKey: number,
): Point {
  let dir = dirs[dirKey];
  let currentPoint = [...current];
  let boxCoord: null | Point = null;

  while (true) {
    currentPoint = [currentPoint[0] + dir[0], currentPoint[1] + dir[1]];
    if (data[currentPoint[0]][currentPoint[1]] === "#") {
      return current;
    }
    if (data[currentPoint[0]][currentPoint[1]] === "O" && !boxCoord) {
      boxCoord = [...currentPoint] as Point;
    }
    if (data[currentPoint[0]][currentPoint[1]] === ".") {
      break;
    }
  }
  if (boxCoord) {
    data[currentPoint[0]][currentPoint[1]] = "O";
    data[boxCoord[0]][boxCoord[1]] = ".";
    return boxCoord;
  }

  return [current[0] + dir[0], current[1] + dir[1]];
}

function firstPartSolution(
  data: string[][],
  start: Point,
  actions: string[],
): number {
  let current = start;
  actions.forEach((action) => {
    current = updateField(
      data,
      current,
      dirKeyMap[action],
    );
  });
  data.map((e) => {
    console.log(e.join(""));
  });

  return caclRes(data);
}

function getArrPart2(data: string[][]): string[][] {
  const arr: string[][] = [];
  for (let i = 0; i < data.length; i++) {
    arr.push([]);
    for (let j = 0; j < data[0].length; j++) {
      if (data[i][j] === "#") {
        arr[i].push("#");
        arr[i].push("#");
      }
      if (data[i][j] === ".") {
        arr[i].push(".");
        arr[i].push(".");
      }
      if (data[i][j] === "@") {
        arr[i].push("@");
        arr[i].push(".");
      }
      if (data[i][j] === "O") {
        arr[i].push("[");
        arr[i].push("]");
      }
    }
  }

  return arr;
}

function updateFieldH(
  data: string[][],
  current: Point,
  dir: Point,
  invDir: Point,
): Point {
  console.log("c", current);
  let currentPoint: Point = [...current];

  while (true) {
    currentPoint = [currentPoint[0] + dir[0], currentPoint[1] + dir[1]];
    if (data[currentPoint[0]][currentPoint[1]] === "#") {
      return current;
    }

    if (data[currentPoint[0]][currentPoint[1]] === ".") {
      break;
    }
  }
  let tempPoint: Point = [...currentPoint];
  while (`${current[0]}_${current[1]}` !== `${tempPoint[0]}_${tempPoint[1]}`) {
    let newCoord: Point = [tempPoint[0] + invDir[0], tempPoint[1] + invDir[1]];
    let t = data[tempPoint[0]][tempPoint[1]];
    data[tempPoint[0]][tempPoint[1]] = data[newCoord[0]][newCoord[1]];
    data[newCoord[0]][newCoord[1]] = t;
    tempPoint = newCoord;
  }
  return [current[0] + dir[0], current[1] + dir[1]];
}
function calcRes2(data: string[][]): number {
  let res = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (data[i][j] === "[") {
        res += i * 100 + j;
      }
    }
  }
  return res;
}
function updateFieldVT(
  data: string[][],
  current: Point,
  dir: Point,
): Point {
  let stack: Point[] = [current];
  let isWrong = false;
  let visitedArr: string[] = [];
  while (stack.length) {
    console.log("r");
    let el = stack.shift() as Point;
    visitedArr.push(`${el[0]}_${el[1]}`);
    let newElVal = data[el[0] - 1][el[1]];

    if (newElVal === "[") {
      stack.push([el[0] - 1, el[1]]);
      stack.push([el[0] - 1, el[1] + 1]);
    }
    if (newElVal === "]") {
      stack.push([el[0] - 1, el[1]]);
      stack.push([el[0] - 1, el[1] - 1]);
    }
    if (newElVal === "#") {
      console.log("wr", el);
      isWrong = true;
      break;
    }
  }
  if (isWrong) {
    return current;
  }
  let visited: Point[] = Array.from(new Set(visitedArr)).map(e=>e.split('_').map(e=>+e) as Point);

  visited.sort((a, b) => a[0] - b[0]);
  visited.forEach((point) => {
    let val = data[point[0]][point[1]];
    data[point[0]][point[1]] = data[point[0] - 1][point[1]];
    data[point[0] - 1][point[1]] = val;
  });
  return [current[0] + dir[0], current[1] + dir[1]];
}

function updateFieldVB(
  data: string[][],
  current: Point,
  dir: Point,
): Point {
  let stack: Point[] = [current];
  let isWrong = false;
  let visitedArr: string[] = [];
  while (stack.length) {
    console.log("r");
    let el = stack.shift() as Point;
    visitedArr.push(`${el[0]}_${el[1]}`);
    let newElVal = data[el[0] + 1][el[1]];

    if (newElVal === "[") {
      stack.push([el[0] + 1, el[1]]);
      stack.push([el[0] + 1, el[1] + 1]);
    }
    if (newElVal === "]") {
      stack.push([el[0] + 1, el[1]]);
      stack.push([el[0] + 1, el[1] - 1]);
    }
    if (newElVal === "#") {
      console.log("wr", el);
      isWrong = true;
      break;
    }
  }
  if (isWrong) {
    return current;
  }
  let visited: Point[] = Array.from(new Set(visitedArr)).map(e=>e.split('_').map(e=>+e) as Point);

  visited.sort((a, b) => b[0] - a[0]);
  visited.forEach((point) => {
    let val = data[point[0]][point[1]];
    data[point[0]][point[1]] = data[point[0] + 1][point[1]];
    data[point[0] + 1][point[1]] = val;
  });
  return [current[0] + dir[0], current[1] + dir[1]];
}
function secondPartSolution(
  data: string[][],
  start: Point,
  actions: string[],
): number {
  let current = start;
  actions.forEach((action) => {
    // console.log(action);
    // data.map((e) => {
    //   console.log(e.join(""));
    // });
    if (action === "<" || action === ">") {
      current = updateFieldH(
        data,
        current,
        dirs[dirKeyMap[action]],
        dirs[dirKeyMap[invMap[action]]],
      );
    } else {
      if (action === "^") {
        current = updateFieldVT(
          data,
          current,
          dirs[dirKeyMap[action]],
        );
      }
      if (action === "v") {
        current = updateFieldVB(
          data,
          current,
          dirs[dirKeyMap[action]],
        );
      }
    }
  });
  data.map((e) => {
    console.log(e.join(""));
  });
  return calcRes2(data);
}

const main = async () => {
  const rawData = await getRawLines("./day_15/data/input.txt");
  const field = getArr(rawData);
  const actionList = getActions(rawData);
  const startPoint: Point = getStartPoint(field);
  // field[startPoint[0]][startPoint[1]] = ".";
  let fieldV2 = getArrPart2(field);
  const startPointV2: Point = getStartPoint(fieldV2);
  console.log(startPointV2);
  // fieldV2[startPointV2[0]][startPointV2[1]] = ".";

  // console.log("Part 1: ", firstPartSolution(field, startPoint, actionList));
  console.log(
    "Part 2: ",
    secondPartSolution(fieldV2, startPointV2, actionList),
  );
};

main();
