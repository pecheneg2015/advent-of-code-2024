import { getRawLine } from "#utils";

function getMulResult(data: string): number {
  let res = 0;
  data.matchAll(/mul\(\d{1,},\d{1,}\)/g).toArray().map((e) => {
    let [a, b] = e[0].substring(4, e[0].length - 1).split(",").map((e) => +e);
    res += a * b;
  });
  return res;
}
function firstPartSolution(data: string): number {
  return getMulResult(data);
}

function secondPartSolution(data: string): number {
  let disableIndex = data.indexOf("don't()");
  while (disableIndex !== -1) {
    const firstPart = data.substring(0, disableIndex);
    const secondPart = data.substring(disableIndex, data.length);
    data = firstPart +
      secondPart.substring(secondPart.indexOf("do()"), secondPart.length);
    disableIndex = data.indexOf("don't()");
  }

  return getMulResult(data);
}

const main = async () => {
  const rawData = await getRawLine("./day_3/data/input.txt");
  console.log("Part 1: ", firstPartSolution(rawData));
  console.log("Part 2: ", secondPartSolution(rawData));
};

main();
