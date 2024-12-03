import { getRawLines } from "#utils";

function prepareData(
  rawData: string[],
): number[][] {
  return rawData.map((e) => e.split(" ").map((el) => +el));
}

function isValid(arr: number[]): boolean {
  let deltaArr: number[] = [];
  let res = false;
  for (let i = 1; i < arr.length; i++) {
    deltaArr.push(arr[i] - arr[i - 1]);
  }
  let invalidDeltaCount = 0;
  let positiveCount = 0;
  let negativeCount = 0;
  deltaArr.forEach((e) => {
    if (e >= 0) {
      positiveCount++;
    }
    if (e <= 0) {
      negativeCount++;
    }
    if (Math.abs(e) < 1 || Math.abs(e) > 3) {
      invalidDeltaCount++;
    }
  });

  if (
    !invalidDeltaCount &&
    (positiveCount === deltaArr.length || negativeCount === deltaArr.length)
  ) {
    res = true;
  }
  return res;
}
function firstPartSolution(data: number[][]): number {
  let res: number = 0;
  data.forEach((arr) => {
    if (isValid(arr)) {
      res++;
    }
  });
  return res;
}

function secondPartSolution(data: number[][]): number {
  let res: number = 0;
  data.forEach((arr) => {
    if (isValid(arr)) {
      res++;
    } else {
      for (let i = 0; i < arr.length; i++) {
        let newArr = [...arr.slice(0, i), ...arr.slice(i + 1, arr.length)];
        if (isValid(newArr)) {
          res++;
          break;
        }
      }
    }
  });
  return res;
}

const main = async () => {
  const rawData = await getRawLines("./day_2/data/input.txt");
  const data = prepareData(rawData);
  console.log("Part 1: ", firstPartSolution(data));
  console.log("Part 2: ", secondPartSolution(data));
};

main();
