import { getRawLines } from "#utils";
type Item = {
  target: number;
  parts: number[];
};

function prepareData(raw: string[]): Item[] {
  const res: Item[] = [];
  raw.forEach((rawString) => {
    const arr = rawString.split(":").map((e) => e.trim());
    res.push({
      target: +arr[0],
      parts: arr[1].split(" ").map((e) => +e),
    });
  });
  return res;
}

function applyOp(a: number, b: number, act: string) {
  let res = 0;
  if (act === "*") {
    res = a * b;
  }
  if (act === "+") {
    res = a + b;
  }
  if (act === "|") {
    res = +`${a}${b}`;
  }
  return res;
}

function isValidEq({ parts, target }: Item, acts: string[]) {
  const stack: [number, string][] = acts.map((e) => [parts[0], e]);
  while (stack.length) {
    const el = stack.pop();
    if (el) {
      const ind = el[1].length;
      const act = el[1][ind - 1];
      const newVal = applyOp(el[0], parts[ind], act);
      if (newVal === target && ind === parts.length - 1) {
        return true;
      }
      if (newVal < target || ind < parts.length) {
        acts.forEach((e) => {
          stack.push([newVal, el[1] + e]);
        });
      }
    }
  }
  return false;
}
function firstPartSolution(data: Item[]): number {
  let res = 0;
  data.forEach((item) => {
    if (isValidEq(item, ["+", "*"])) {
      res += item.target;
    }
  });
  return res;
}

function secondPartSolution(data: Item[]): number {
  let res = 0;
  data.forEach((item) => {
    if (isValidEq(item, ["+", "*","|"])) {
      res += item.target;
    }
  });
  return res;
}

const main = async () => {
  const rawData = await getRawLines("./day_7/data/input.txt");
  const data = prepareData(rawData);
  console.log("Part 1: ", firstPartSolution(data));
  console.log("Part 2: ", secondPartSolution(data));
};

main();
