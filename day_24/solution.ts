import { getRawLines,getRawLine } from "#utils";
import {part2} from './test.ts'
type Action = {
  action: string;
  firstEl: string;
  secondEl: string;
  result: string;
};

type ActionExt = {
  action: string;
  firstEl: string | ActionExt;
  secondEl: string | ActionExt;
  result: string;
};

function getInitState(data: string[]): Map<string, number> {
  const res: Map<string, number> = new Map();
  let el = data.shift();
  while (el) {
    const arr = el.split(": ");
    res.set(arr[0], +arr[1]);
    el = data.shift();
  }
  return res;
}

function getActions(data: string[]): Action[] {
  const res: Action[] = [];
  while (data.length) {
    const el = data.shift()!;
    const arr = el.split(" -> ")!;
    const descArr = arr[0].split(" ");
    let t = [descArr[0], descArr[2]].sort();
    res.push({
      action: descArr[1],
      firstEl: t[0],
      secondEl: t[1],
      result: arr[1],
    });
  }
  return res;
}

function and(a: number, b: number) {
  return a === 1 && b === 1 ? 1 : 0;
}

function or(a: number, b: number) {
  return a === 0 && b === 0 ? 0 : 1;
}

function xor(a: number, b: number) {
  return a === b ? 0 : 1;
}

function calc(a: number, b: number, action: string): number {
  if (action === "AND") {
    return and(a, b);
  }
  if (action === "OR") {
    return or(a, b);
  }
  if (action === "XOR") {
    return xor(a, b);
  }
  return 0;
}

function firstPartSolution(
  state: Map<string, number>,
  actions: Action[],
): string {
  while (actions.length) {
    const el = actions.shift()!;
    if (state.has(el.firstEl) && state.has(el.secondEl)) {
      state.set(
        el.result,
        calc(state.get(el.firstEl)!, state.get(el.secondEl)!, el.action),
      );
    } else {
      actions.push(el);
    }
  }
  let keys = Array.from(state.keys()).filter((e) => e.startsWith("z")).sort();
  let res = "";
  keys.forEach((key) => res = state.get(key) + res);
  return res;
}
function getVal(state: Map<string, number>, letter: string): string {
  let keys = Array.from(state.keys()).filter((e) => e.startsWith(letter));
  let res = "";
  keys.forEach((key) => res = state.get(key) + res);

  return res;
}

function replace(el: ActionExt, actions: ActionExt[]): ActionExt {
  if (
    typeof el.firstEl === "string" && !el.firstEl.startsWith("x") &&
    !el.firstEl.startsWith("y")
  ) {
    let n = actions.find((e) => e.result === el.firstEl)!;
    el.firstEl = replace(n, actions);
  }
  if (
    typeof el.secondEl === "string" && !el.secondEl.startsWith("x") &&
    !el.secondEl.startsWith("y")
  ) {
    let n = actions.find((e) => e.result === el.secondEl)!;

    el.secondEl = replace(n, actions);
  }
  return el;
}

function secondPartSolution(
  state: Map<string, number>,
  actions: ActionExt[],
): string {
  const keys = Array.from(state.keys()).filter((e) => e.startsWith("z")).sort();
  let errors:string[]=[]
  for (let i = 0; i < 4; i++) {
    let f = actions.find((e) =>
      e.result === `z${i.toString().padStart(2, "0")}`
    )!;
    let t = replace(f, actions)
    console.log(`z${i.toString().padStart(2, "0")}`, t); 
    if(t.action!=="XOR")
      errors.push(`z${i.toString().padStart(2, "0")}`)
  }
  console.log(keys)
  return "";
}

const main = async () => {
  let rawData = await getRawLines("./day_24/data/input.txt");

  let initState = getInitState(rawData);
  let actions = getActions(rawData);
  // let xVal = getVal(initState,'x')
  // let yVal = getVal(initState,'y')

  // console.log('x','0'+xVal)
  // console.log('y','0'+yVal)
  // console.log('a',(Number.parseInt(xVal,2)+Number.parseInt(yVal,2)).toString(2))
  let first = firstPartSolution(initState, actions);
  rawData = await getRawLines("./day_24/data/input.txt");
  initState = getInitState(rawData);
  actions = getActions(rawData);
  let rawData2 = await getRawLines("./day_24/data/input.txt");

  // console.log(secondPartSolution(initState, actions));
console.log(part2(rawData2.join('\n')))
  // console.log('z',first.slice(-xVal.length-1))
  // console.log(initState.get('z19'))
  // console.log("Part 1",Number.parseInt(first,2))
};
main();

// a 11000000010100110101110001 1 0100000011011100110
// z 10111111110100110101101010 0 0100000011011100110
