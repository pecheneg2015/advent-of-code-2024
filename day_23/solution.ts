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
      m.set(`${el0}${el1}${el2}${el3}`, r[i + 1]);
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

function getGraph(data: string[][]): Record<string, string[]> {
  let m: Record<string, string[]> = {};
  data.forEach(([a, b]) => {
    if (!m[a]) {
      m[a] = [];
    }
    if (!m[b]) {
      m[b] = [];
    }
    m[a].push(b);
    m[b].push(a);
    m[a].sort();
    m[b].sort();
  });
  return m;
}

function getPart1Solution(data: string[][]): number {
  let r: Set<string> = new Set();
  let graph = getGraph(data);
  let stack: string[][] = Object.keys(graph).map((e) => [e]);
  while (stack.length) {
    let el = stack.pop()!;
    if (el.length === 3) {
      r.add(el.sort().join("-"));
      continue;
    }
    if (el.length === 1) {
      graph[el[0]].forEach((e) => stack.push([...el, e]));
    } else {
      Object.keys(graph).forEach((key) => {
        if (
          !el.includes(key) &&
          new Set(el).intersection(new Set(graph[key])).size === el.length
        ) {
          stack.push([...el, key]);
        }
      });
    }
  }
  return Array.from(r).filter((e) =>
    e.split("-").findIndex((el) => el.startsWith("t")) !== -1
  ).length;
}

function getPart2Solution(data: string[][]): string {
  let test: string[] = [];
  let graph = getGraph(data);
  const keys = Object.keys(graph).sort();
  let stack: string[][] = keys.map((e) => [e]);
  while (stack.length) {
    let el = stack.pop()!;
    if (el.length === 1) {
      graph[el[0]].forEach((e) => stack.push([...el, e]));
    } else {
      let c = 0;
      keys.forEach((key) => {
        if (
          !el.includes(key) &&
          new Set(el).intersection(new Set(graph[key])).size === el.length
        ) {
          stack.push([...el, key]);
          c++;
        }
      });
      if (c === 0 && el.length > test.length) {
        test = el;
        console.log(test.length, test.sort().join(","));
      }
    }
  }
  return test.sort().join(",");
}

function getPart2SolutionV2(data: string[][]): string {
  let test: string[] = [];
  let graph = getGraph(data);
  let graphUpd: Map<string, Set<string>> = new Map();
  Object.keys(graph).forEach((key) => {
    let val = graph[key];
    graphUpd.set(key, new Set(val));
  });
  let keys = Object.keys(graph).sort((a, b) => b.localeCompare(a));
  let maxLen = 0;
  let re = undefined;
  for (let i = 0; i < keys.length; i++) {
    let s = graphUpd.get(keys[i])!;
    for (let j = 0; j < keys.length; j++) {
      if (i === j) {
        continue;
      }
      let s2 = graphUpd.get(keys[j])!;
      let intr = s.intersection(s2);
      if (intr.size > maxLen) {
        maxLen = intr.size;
        re = intr;
      }
    }
  }
  maxLen -= 1;
  let intrArr: string[] = [];
  for (let i = 0; i < keys.length; i++) {
    let s = graphUpd.get(keys[i])!;
    for (let j = 0; j < keys.length; j++) {
      if (i === j) {
        continue;
      }
      let s2 = graphUpd.get(keys[j])!;
      let intr = s.intersection(s2);
      if (intr.size === maxLen) {
        intrArr.push(Array.from(intr).sort().join("-"));
      }
    }
  }

  let uniqueIntrArrr = Array.from(new Set(intrArr));
  let uniqueIntrSetArr = uniqueIntrArrr.map((e) => new Set(e.split("-")));
  let graphVals: Set<string>[] = Array.from(graphUpd.values());
  let intrMap: Map<string, number> = new Map();
  uniqueIntrArrr.forEach((e) => intrMap.set(e, 0));
  graphVals.forEach((graphEl) => {
    uniqueIntrSetArr.forEach((s, i) => {
      if (s.isSubsetOf(graphEl)) {
        let currentVal = intrMap.get(uniqueIntrArrr[i])!;
        intrMap.set(uniqueIntrArrr[i], currentVal + 1);
      }
    });
  });
  // console.log(intrMap)
  intrMap.keys().forEach((key) => {
    if (intrMap.get(key)! > 12) {
      intrMap.delete(key);
    }
  });
  let filteredKeys = Array.from(
    new Set(Array.from(intrMap.keys()).map((e) => e.split("-")).flat()),
  );
  console.log(filteredKeys.length);
  keys.forEach((key) => {
    if (!filteredKeys.includes(key)) {
      delete graph[key];
    }
  });
  filteredKeys.forEach((key) => {
    graph[key] = graph[key].filter((e) => filteredKeys.includes(e));
  });

  keys = filteredKeys;
  let stack: string[][] = keys.map((e) => [e]);
  while (stack.length) {
    let el = stack.pop()!;
    if (el.length === 1) {
      graph[el[0]].forEach((e) => stack.push([...el, e]));
    } else {
      let c = 0;
      keys.forEach((key) => {
        if (
          !el.includes(key) &&
          new Set(el).intersection(new Set(graph[key])).size === el.length
        ) {
          stack.push([...el, key]);
          c++;
        }
      });
      if (c === 0 && el.length > test.length) {
        test = el;
        console.log(test.length, test.sort().join(","));
      }
    }
  }
  return test.sort().join(",");
}

function getPart2SolutionV3(data: string[][]): string {
  let len = 3;
  let graph = getGraph(data);
  let r: Set<string> = new Set( Object.keys(graph));


  do {
    let stack: string[][] = Array.from(r).map((e) => e.split('-'));

    r = new Set()
    while (stack.length) {
      let el = stack.pop()!;
      if (el.length === len) {
        r.add(el.sort().join("-"));
        continue;
      }
      if (el.length === 1) {
        graph[el[0]].forEach((e) => stack.push([...el, e]));
      } else {
        Object.keys(graph).forEach((key) => {
          if (
            !el.includes(key) &&
            new Set(el).intersection(new Set(graph[key])).size === el.length
          ) {
            stack.push([...el, key]);
          }
        });
      }
    }
    let keys =Array.from(new Set(Array.from(r).map(e=>e.split('-')).flat()))
    Object.keys(graph).map(e=>{if(!keys.includes(e)){
      delete graph[e]
    }})
    Object.keys(graph).map(e=>{
      graph[e]= graph[e].filter(e=>keys.includes(e))
    })
    console.log(len,keys.length)

    len++
  } while (r.size > 1);

  console.log(r);
  return "";
}
const main = async () => {
  const rawData = await getRawLines("./day_23/data/input.txt");
  const data = rawData.map((e) => e.split("-").sort()).sort((a, b) =>
    a[0].localeCompare(b[0])
  );
  console.log("Part 1:", getPart1Solution(data));
  console.log("Part 2:",getPart2SolutionV3(data));
};
main();
