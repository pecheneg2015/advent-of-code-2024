import { getRawLines } from "#utils";

function xor(a: number, b: number): number {
  let aBug = BigInt(a);
  let bBug = BigInt(b);
  let res = aBug ^ bBug;
  return Number(res);
}
function getNext(val: number): number {
  let secret = xor(val * 64, val) % 16777216;

  secret = xor(Math.floor(secret / 32), secret) % 16777216;
  secret = xor(secret * 2048, secret) % 16777216;
  return secret;
}
function getNum(init: number, repeats: number): number {
  let res = init;
  let c = 0;
  while (c < repeats) {
    res = getNext(res);
    c++;
  }
  return res;
}

function getNumArrPart2(init: number, repeats: number): Map<string, number> {
  let res = init;
  let c = 0;

  const r: number[] = [res - Math.floor(res / 10) * 10];
  while (c < repeats) {
    res = getNext(res);
    r.push(res - Math.floor(res / 10) * 10);
    c++;
  }
  const result: number[] = [];
  for (let i = 1; i < r.length; i++) {
    result.push(r[i] - r[i - 1]);
  }
  let m: Map<string, number> = new Map();
  for (let i = 3; i < result.length; i++) {
    const el0 = result[i - 3];
    const el1 = result[i - 2];
    const el2 = result[i - 1];
    const el3 = result[i];
    if (!m.has(`${el0}${el1}${el2}${el3}`)) {
      m.set(`${el0}${el1}${el2}${el3}`, r[i+1]);
    }
  }
  return m;
}

function part2Solution(ms: Map<string, number>[], keys: string[]) {
  let max = 0;
  let c = "";
  keys.forEach((key) => {
    let r = 0;
    ms.forEach((m) => {
      r += m.get(key) ?? 0;
    });
    if (r > max) {
      max = r;
      c = key;
    }
  });
  return max;
}
const main = async () => {
  const rawData = await getRawLines("./day_22/data/input.txt");
  const data = rawData.map((e) => +e);
 
  console.log("Part 1:",data.reduce((acc, el) => acc + getNum(el, 2000), 0));
  const arr = data.map((e) => getNumArrPart2(e, 2000));
  const keys = Array.from(new Set(arr.map((e) => Array.from(e.keys())).flat()));
  console.log("Part 2:",part2Solution(arr, keys));
};
main();
