import { getRawLine, getRawLines } from "#utils";

function getSize(elNum: number): number {
  let res = 1;
  let layerItems = 8;
  while (res < elNum) {
    res += layerItems;
    layerItems += 8;
  }
  return res;
}

function firstPartSolution(data: number, fieldSize: number): number {
  const fieldSizeSqrt = Math.sqrt(fieldSize);

  const centerPoint = [(fieldSizeSqrt - 1) / 2, (fieldSizeSqrt - 1) / 2];
  const targetPoint = [
    fieldSizeSqrt - 1,
    (fieldSizeSqrt - 1) - (fieldSize - data),
  ];
  return Math.abs(centerPoint[0] - targetPoint[0]) +
    Math.abs(centerPoint[1] - targetPoint[1]);
}

function secondPartSolution(data: number, matrix: number[]): number {
  return matrix.find(e=>e>data)!
}


const main = async () => {
  const rawData = await getRawLine("./2017/day_3/data/input.txt");
  const rawMatrixData = await getRawLines("./2017/day_3/matrix_items.txt");
  const matrixData = rawMatrixData.map(e=>+e);

  const data = +rawData;
  const fieldSize = getSize(data);
  console.log("Part 1: ",firstPartSolution(data,fieldSize));
  console.log("Part 2: ", secondPartSolution(data,matrixData));
};

main();
