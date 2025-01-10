import { getRawLines } from "#utils";

function prepareColorData(raw: string[]): string[] {
  return raw[0].split(", ")
  // .sort((a, b) =>
    // b.length - a.length || b.localeCompare(a)
  // );
}


const cache: Map<string,number> = new Map();
// simple dfs + cache
function dfs(target: string, colors: string[]) {
  if (cache.has(target)) {
    return cache.get(target)!;
  }
  if(target==='')
    return 1
  let res = 0;
  colors.forEach((color) => {
    if (target.startsWith(color)) {
      res += dfs(target.substring(color.length),colors);
    }
  });
  cache.set(target,res)
  return res;
}

function calc(
  colors: string[],
  targets: string[],
): number {
  return 1
}
function firstPartSolution(
  colors: string[],
  targets: string[],
): number {
  let res = 0;
  targets.forEach((target, i) => {
    res+= dfs(target,colors)?1:0
  });
  return res;
}


function secondPartSolution(colors: string[], targets: string[]): number {
  let res = 0;
  targets.forEach((target, i) => {
    res+= dfs(target,colors)
  });
  return res;
}
const main = async () => {
  const rawData = await getRawLines("./day_19/data/input.txt");
  const colors = prepareColorData(rawData);
  const targets = rawData.slice(2);
  console.log("Part 1:", firstPartSolution(colors, targets));
  console.log("Part 2:", secondPartSolution(colors, targets));
};
main();
