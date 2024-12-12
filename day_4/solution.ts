import { getRawLines } from "#utils";

function rotate(matrix: string[][]): string[][] {
  return matrix[0].map((val, index) =>
    matrix.map((row) => row[index]).reverse()
  );
}

function calcHorizontal(data: string[][]): number {
  let res = 0;
  data.forEach((e) => {
    let str = e.join("");

    let startInd = -1;
    while (true) {
      let ind = str.indexOf("XMAS", startInd + 1);
      if (ind !== -1) {
        startInd = ind;
        res++;
      } else {
        break;
      }
    }
  });

  return res;
}

function calcDiagonal(data: string[][]): number {
  let res = 0;
  for (let i = 0; i < data.length - 3; i++) {
    for (let j = 0; j < data[0].length - 3; j++) {
      if (
        `${data[i][j]}${data[i + 1][j + 1]}${data[i + 2][j + 2]}${
          data[i + 3][j + 3]
        }` === "XMAS"
      ) {
        res++;
      }
    }
  }
  return res;
}

function firstPartSolution(data: string[][]): number {
  let res = 0;

  res += calcHorizontal(data);
  data = rotate(data);
  res += calcHorizontal(data);

  data = rotate(data);
  res += calcHorizontal(data);

  data = rotate(data);
  res += calcHorizontal(data);
  res += calcDiagonal(data);
  data = rotate(data);
  res += calcDiagonal(data);

  data = rotate(data);
  res += calcDiagonal(data);

  data = rotate(data);
  res += calcDiagonal(data);
  return res;
}

function secondPartSolution(data: string[][]): number {
  let res = 0;
  for (let i = 1; i < data.length - 1; i++) {
    for (let j = 1; j < data[0].length - 1; j++) {
      if (data[i][j] === "A") {
        const mainDiagonalIsValid = data[i - 1][j - 1] !== data[i + 1][j + 1] &&
          ["M", "S"].includes(data[i - 1][j - 1]) &&
          ["M", "S"].includes(data[i + 1][j + 1]);
        const secondaryDiagonalIsValid =
          data[i - 1][j + 1] !== data[i + 1][j - 1] &&
          ["M", "S"].includes(data[i - 1][j + 1]) &&
          ["M", "S"].includes(data[i + 1][j - 1]);
        if (mainDiagonalIsValid && secondaryDiagonalIsValid) {
          res++;
        }
      }
    }
  }
  return res;
}

const main = async () => {
  const rawData = await getRawLines("./day_4/data/input.txt");
  const data = rawData.map((e) => e.split(""));
  console.log("Part 1: ", firstPartSolution(data));
  console.log("Part 2: ", secondPartSolution(data));
};

main();
