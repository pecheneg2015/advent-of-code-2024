import { getRawLine } from "#utils";

function calc(data: number[],delta:number=1): number {
  let res = 0;
  for (let i = 0; i < data.length; i++) {
    let el = data[i];
    let nextEl = data[(i + delta) % data.length];
    if (el === nextEl) {
      res += el;
    }
  }
  return res;
}

function secondPartSolution(data: number[]): number {
  for (let i = data.length - 1; i >= 0; i--) {
    let first = data[i];
    for (let k = i - 1; k >= 0; k--) {
      let second = data[k];
      for (let j = 1; j < k; j++) {
        let third = data[j];

        if (first + second + third === 2020) {
          return first * second * third;
        }
        if (first + second + third > 2020) {
          break;
        }
      }
    }
  }
  return 0;
}

const main = async () => {
  const rawData = await getRawLine("./2017/day_1/data/input.txt");
  const data = rawData.split("").map((e) => +e);
  console.log("Part 1: ", calc(data));
  console.log("Part 2: ", calc(data,data.length/2));
};

main();
