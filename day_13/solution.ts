import { getRawLines } from "#utils";

type Point = [number, number];
type Data = {
  aDelta: Point;
  bDelta: Point;
  target: Point;
};

function preparePoint(data: string): Point {
  const arr = data.split(" ");
  return [
    Number.parseInt((arr.at(-2) ?? "").substring(1)),
    Number.parseInt((arr.at(-1) ?? "").substring(1)),
  ];
}

function prepareTargetPoint(data: string): Point {
  const arr = data.split(" ");
  const x = (arr.at(-2) ?? "").split("=");
  const y = (arr.at(-1) ?? "").split("=");

  return [
    Number.parseInt(x.at(-1) ?? ""),
    Number.parseInt(y.at(-1) ?? ""),
  ];
}

function prepareData(data: string[]): Data[] {
  const res: Data[] = [];
  while (data.length) {
    const currentArr = data.splice(0, 4);
    res.push({
      aDelta: preparePoint(currentArr[0]),
      bDelta: preparePoint(currentArr[1]),
      target: prepareTargetPoint(currentArr[2]),
    });
  }
  return res;
}
function calc(data: Data[],priceA:number,priceB:number): number {
  let res = 0;
  data.forEach((item) => {
    const [a, c] = item.aDelta;
    const [b, d] = item.bDelta;
    const [X, Y] = item.target;
    const x = (d * X - b * Y) / (a * d - b * c);
    const y = (c * X - a * Y) / (b * c - a * d);
    if (Number.isInteger(x) && Number.isInteger(y)) {
      res += x * priceA + y*priceB;
    }
  });
  return res;
}

const main = async () => {
  const rawData = await getRawLines("./day_13/data/input.txt");
  let data = prepareData(rawData);
  console.log("Part 1: ", calc(data,3,1));
  data= data.map(e=>({...e,target:[e.target[0]+10000000000000,e.target[1]+10000000000000]}))
  console.log("Part 2: ", calc(data,3,1));
};

main();
