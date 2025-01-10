import { getRawLines } from "#utils";

type Action = {
  reg: string;
  act: string;
  val: number;
};

type Element = {
  action: Action;
  condition: Action;
};

function prepareItem(data: string): Element {
  const arr = data.split(" ");
  return {
    action: {
      act: arr[1],
      reg: arr[0],
      val: +arr[2],
    },
    condition: {
      act: arr[5],
      reg: arr[4],
      val: +arr[6],
    },
  };
}

function applyAct(
  action: Action,
  vals: Record<string, number>,
): Record<string, number> {
  const { act, reg, val } = action;
  const regVal = vals[reg] ?? 0;
  switch (act) {
    case "inc":
      vals[reg] = regVal + val;
      return vals;
    case "dec":
      vals[reg] = regVal - val;
      return vals;
    default:
      return vals;
  }
}

function checkCond(action: Action, vals: Record<string, number>): boolean {
  const { act, reg, val } = action;
  const regVal = vals[reg] ?? 0;
  switch (act) {
    case ">":
      return regVal > val;
    case "<":
      return regVal < val;
    case ">=":
      return regVal >= val;
    case "<=":
      return regVal <= val;
    case "==":
      return regVal === val;
    case "!=":
      return regVal !== val;
    default:
      return false;
  }
}
function calc(
  initData: Element[],
): number[] {
  let vals: Record<string, number> = {};
  const maxVals:number[]= []
  initData.forEach((el) => {
    const { action, condition } = el;
    const condRes = checkCond(condition, vals);
    if (condRes) {
      vals = applyAct(action, vals);
    }
    maxVals.push(Math.max(...Object.values(vals)))
  });
  return maxVals;
}

const main = async () => {
  const rawData = await getRawLines("./2017/day_8/data/input.txt");
  const data = rawData.map(prepareItem);
  const calcRes = calc(data)
  console.log("Part 1:", calcRes.at(-1));
  console.log("Part 2:",Math.max(...calcRes));
};

main();
