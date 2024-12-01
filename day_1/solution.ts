import { getRawLines } from "#utils";

function prepareData(
  rawData: string[],
): { firstList: number[]; secondList: number[] } {
  const firstList: number[] = [];
  const secondList: number[] = [];
  rawData.forEach((e) => {
    const arr = e.split(" ");
    firstList.push(Number.parseInt(arr.at(0) ?? ""));
    secondList.push(Number.parseInt(arr.at(-1) ?? ""));
  });
  return {
    firstList,
    secondList,
  };
}

function firstPartSolution(firstList: number[], secondList: number[]): number {
  let res: number = 0;
  const firstListSorted = firstList.sort((a, b) => a - b);
  const secondListSorted = secondList.sort((a, b) => a - b);
  firstListSorted.forEach((e, i) => {
    res += Math.abs(e - secondListSorted[i]);
  });
  return res;
}

function secondPartSolution(firstList: number[], secondList: number[]): number {
  let res: number = 0;
  const frequencyMap: Map<number, number> = new Map();
  secondList.forEach((e) => {
    if (!frequencyMap.has(e)) {
      frequencyMap.set(e, 1);
    } else {
      frequencyMap.set(e, (frequencyMap.get(e) ?? 0) + 1);
    }
  });
  firstList.forEach((e) => {
    const frequency: number = frequencyMap.get(e) ?? 0;
    res += e * frequency;
  });
  return res;
}

const main = async () => {
  const rawData = await getRawLines("./day_1/data/input.txt");
  const { firstList, secondList } = prepareData(rawData);
  console.log("Part 1: ", firstPartSolution(firstList, secondList));
  console.log("Part 2: ", secondPartSolution(firstList, secondList));
};

main();
