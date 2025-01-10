import { getRawLines } from "#utils";

function rotateMatrix(matrix: Array<Array<unknown>>) {
  return matrix[0].map((_, index) => matrix.map((row) => row[index]).reverse());
}

function prepareArr(rawArr: string[][]): string[][][] {
  let res: string[][][] = [];
  let r: string[][] = [];
  while (rawArr.length) {
    let el = rawArr.shift();
    if (!el?.length) {
      res.push(r);
      r = [];
    } else {
      r.push(el);
    }
  }
  res.push(r)
  return res;
}

function isLock(data: string[][]): boolean {
  let r = new Set(data[0]);
  return r.size === 1 && r.has("#");
}

function toNumArr(data: string[][]): number[] {
  let res = Array.from({ length: data[0].length }, () => 0);
  for (let i = 1; i < data.length - 1; i++) {
    let row = data[i];
    row.forEach((el, ind) => {
      if (el === "#") {
        res[ind]++;
      }
    });
  }

  return res;
}


function isValidPair(lock:number[],key:number[]):boolean{
for(let i=0;i<lock.length;i++){
  if(lock[i]+key[i]>5)
    return false
}
  return true
}
function findPairsCount(lock:number[],keyArr:number[][]):number{
  let res =0
keyArr.forEach(key=>{
  if(isValidPair(lock,key))
    res++
})
  return res
}
function solution(locks: number[][], keys: number[][]) {
  let res = 0;
  locks.forEach(lock=>{
    res+=findPairsCount(lock,keys)
  })
  return res;
}
const main = async () => {
  const rawData = await getRawLines("./day_25/data/input.txt");
  const data = prepareArr(rawData.map((e) => e.split("")));
  const lockArr = data.filter(isLock).map(toNumArr);
  const keyArr = data.filter((e) => !isLock(e)).map(toNumArr);
  console.log(solution(lockArr,keyArr));
  // const field = rawData.map((e) => e.split(""));
  // const startPoint: Point = findPoint(field, "S");
  // const endPoint: Point = findPoint(field, "E");
  // console.log(
  //   "Part 1:",
  //   caclCheatPathCount(field, startPoint, endPoint, 2, 100),
  // );
  // console.log(
  //   "Part 2:",
  //   caclCheatPathCount(field, startPoint, endPoint, 20, 100),
  // );
};
main();
