import { getRawLines } from "#utils";

function firstPartSolution(rules: number[][], pages: number[][]): number {
  let res = 0;
  console.log(rules, pages);
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    let isValid = true;
    for (let j = 0; j < rules.length; j++) {
      const [before, after] = rules[j];
      const beforeInd = page.findIndex((el) => el === before);
      const afterInd = page.findLastIndex((el) => el === after);
      if (beforeInd !== -1 && afterInd !== -1 && beforeInd > afterInd) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      res += page[Math.floor(page.length / 2)];
    }
  }
  return res;
}

function secondPartSolution(rules: number[][], pages: number[][]): number {
  let res = 0;
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    let isValid = true;
    for (let j = 0; j < rules.length; j++) {
      const [before, after] = rules[j];
      let beforeInd = page.findIndex((el) => el === before);
      let afterInd = page.findLastIndex((el) => el === after);
      if (beforeInd !== -1 && afterInd !== -1 && beforeInd > afterInd) {
        isValid = false;
        while (beforeInd > afterInd) {
          let t = page[beforeInd];
          page[beforeInd] = page[afterInd];
          page[afterInd] = t;
          beforeInd = page.findIndex((el) => el === before);
          afterInd = page.findLastIndex((el) => el === after);
        }
        j = -1;
      }
    }
    if (!isValid) {
      console.log(page);
      res += page[Math.floor(page.length / 2)];
    }
  }
  return res;
}

function prepareData(
  rawData: string[],
): { rules: number[][]; pages: number[][] } {
  const rules: number[][] = [];
  const pages: number[][] = [];

  let el = rawData.shift();
  while (el) {
    rules.push(el.split("|").map((e) => +e));
    el = rawData.shift();
  }
  el = rawData.shift();
  while (el) {
    pages.push(el.split(",").map((e) => +e));
    el = rawData.shift();
  }
  return { rules, pages };
}
const main = async () => {
  const rawData = await getRawLines("./day_5/data/input.txt");
  const { pages, rules } = prepareData(rawData);
  console.log("Part 1: ", firstPartSolution(rules, pages));
  console.log("Part 2: ", secondPartSolution(rules, pages));
};

main();
