import { getRawLine } from "#utils";

// string + two pointers
function firstPartSolution(data: number[]): number {
  let str = "";
  let ind = 0;
  data.forEach((e, i) => {
    if (i % 2 === 0) {
      str = str + `${ind},`.repeat(e);
      ind++;
    } else {
      str = str + ".,".repeat(e);
    }
  });
  const strArr = str.split(",");
  strArr.pop();
  const arr = strArr.map((e) => Number.isInteger(+e) ? +e : -1);
  let left = 0;
  let right = arr.length - 1;
  while (right > left) {
    if (arr[left] === -1) {
      if (right === -1) {
        right--;
      } else {
        const t = arr[left];
        arr[left] = arr[right];
        arr[right] = t;
        right--;
      }
    } else {
      left++;
    }
  }
  return arr.filter((e) => e !== -1).reduce(
    (acc, el, ind) => acc + (el * ind),
    0,
  );
}

// arr manipulation
function secondPartSolution(data: number[]): number {
  const arr: [number, number, number][] = [];
  let counter = 0;
  data.forEach((e, i) => {
    arr.push([i % 2, e, i % 2 === 0 ? counter : -1]);
    if (i % 2 === 0) {
      counter++;
    }
  });
  let right = arr.length - 1;
  while (true) {
    if (right < 0) {
      break;
    }
    if (arr[right][0] === 0) {
      const ind = arr.findIndex((e, i) =>
        e[0] === 1 && right > i && e[1] >= arr[right][1]
      );
      if (ind !== -1) {
        const moveItem = arr[right];
        if (arr[ind][1] === moveItem[1]) {
          const t = arr[ind];
          arr[ind] = moveItem;
          arr[right] = t;
          right -= 1;
        } else {
          arr.splice(ind, 0, moveItem);
          arr[ind + 1][1] -= arr[ind][1];
          arr[right + 1] = [...arr[ind + 1]];
          arr[right + 1][1] = arr[ind][1];
        }
      } else {
        right -= 1;
      }
    } else {
      right--;
    }
  }

  let res = 0;
  let ind = 0;
  do {
    const el = arr.shift() as [number, number, number];
    while (el[1] > 0) {
      if (el[0] === 0) {
        res += ind * el[2];
      }
      ind++;
      el[1]--;
    }
  } while (arr.length);
  return res;
}

const main = async () => {
  const rawData = await getRawLine("./day_9/data/input.txt");
  const data = rawData.split("").map((e) => +e);
  console.log("Part 1: ", firstPartSolution(data));
  console.log("Part 2: ", secondPartSolution(data));
};

main();
