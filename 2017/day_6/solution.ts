import { getRawLine } from "#utils";

function findMaxInd(arr: number[]): number {
  let res = -1;
  let max = Number.MIN_SAFE_INTEGER;
  arr.forEach((e, i) => {
    if (e > max) {
      max = e;
      res = i;
    }
  });
  return res;
}

function distribute(data: number[]) {
  let maxInd = findMaxInd(data);
  let val = data[maxInd];
  data[maxInd] = 0;
  while (val) {
    maxInd++;
    data[maxInd % data.length]++;
    val--;
  }
  return data;
}

function firstPartSolution(
  initData: number[],
): { repeats: number; data: number[] } {
  let data = [...initData];
  const resArr: string[] = [];
  while (!resArr.includes(data.join(","))) {
    resArr.push(data.join(","));
    data = distribute(data);
  }
  return { repeats: resArr.length, data };
}

function secondPartSolution(initData: number[]): number {
  let data = [...initData];
  const target = data.join(",");
  let counter = 0;
  do {
    counter++;
    data = distribute(data);
  } while ((data.join(",") !== target));
  return counter;
}

const main = async () => {
  const rawData = await getRawLine("./2017/day_6/data/input.txt");
  const data = rawData.split(" ").map((e) => +e);
  const { repeats, data: newData } = firstPartSolution(data);
  console.log("Part 1:", repeats);
  console.log("Part 2:", secondPartSolution(newData));
};

main();
