import { getRawLine } from "#utils";

function updateArr(
  initData: number[],
  len: number,
  position: number,
): number[] {
  let data = [...initData, ...initData];
  let sl = data.slice(position, position + len).reverse();
  data.splice(position, len, ...sl);
  let first = data.slice(position, initData.length);
  return [
    ...data.slice(
      initData.length,
      initData.length + (initData.length - first.length),
    ),
    ...first,
  ];
}

function hashCycle(initData: number[], actions: number[],initSpace:number,initPosition:number):[number,number,number[]]{
  let space = initSpace;
  let position = initPosition;
  let data = [...initData];
  actions.forEach((e) => {
    data = updateArr(data, e, position);
    position = (position + e + space) % data.length;

    space++;
  });
  return [space,position,data]
}
function firstPartSolution(initData: number[], actions: number[]): number {
 const space = 0;
 const position = 0;
  let data = [...initData];
  data = hashCycle(data,actions,space,position)[2]
  return data[0] * data[1];
}

function preparePart2Init(rawData: string): number[] {
  return [...rawData.split("").map((e) => e.charCodeAt(0)), ...[
    17,
    31,
    73,
    47,
    23,
  ]];
}

function toPart2Result(initData: number[]): string {
  const res: number[] = [];
  let data = [...initData];
  while (data.length) {
    const subArr = data.splice(0, 16);
    let resItem = subArr[0];
    for (let i = 1; i < subArr.length; i++) {
      resItem = resItem ^ subArr[i];
    }
    res.push(resItem);
  }
  return res.map(e=>e.toString(16).padStart(2,'0')).join('')
}

function secondPartSolution(initData: number[], actions: number[]): string {
  let space = 0;
  let position = 0;
  let data = [...initData];
  for(let i=0;i<64;i++){
    [space,position,data] = hashCycle(data,actions,space,position)
  }
  return toPart2Result(data)
}

const main = async () => {
  const rawData = await getRawLine("./2017/day_10/data/input.txt");

  const part1Data = rawData.split(",").map((e) => +e);
  const part2Data = preparePart2Init(rawData);

  const size =  256;
  const arr = Array.from({ length: size }, (_, k) => k);
  console.log("Part 1:", firstPartSolution(arr, part1Data));

  console.log("Part 2:", secondPartSolution(arr,part2Data));
};

main();
