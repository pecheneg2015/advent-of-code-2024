import { getRawLines } from "#utils";

type Element = {
  name: string;
  val: number;
  children: string[];
};

type ElUpd = Element & { res: number };

function prepareItem(data: string): Element {
  const arr = data.split(" -> ");
  const vals = arr[0].split(" ");
  return {
    children: arr.length === 1 ? [] : arr[1].split(", "),
    name: vals[0],
    val: +vals[1].slice(1, -1),
  };
}

function firstPartSolution(
  initData: Element[],
): string {
  const items = initData.map((e) => e.name);
  const childrens = initData.map((e) => e.children).flat();

  return items.find((e) => !childrens.includes(e))!;
}

function calc(initData: Element[], init: string): { res: number; val: number;children:string[] } {
  const { children, val } = initData.find((e) => e.name === init)!;
  let res = val;
  children.forEach((child) => {
    res += calc(initData, child)["res"];
  });
  return { res, val,children };
}

function secondPartSolution(initData: Element[], init: string) {
  const { children } = initData.find((e) => e.name === init)!;
  const resArr: ElUpd[] = [];
  children.forEach((child) => {
    const { res, val,children } = calc(initData, child);
    resArr.push({
      name: child,
      res,
      val,
      children
    });
  });
  const m: Record<string, number> = {};
  resArr.forEach((el) => {
    if (!m[el.res]) {
      m[el.res] = 0;
    }
    m[el.res]++;
  });
  const invalidVal = Object.entries(m).find((e) => e[1] === 1)!;

  const validVal =+( Object.entries(m).find((e) => e[1] !== 1)!)[0];
  if(!invalidVal)
    return false
  const invalidEl = resArr.find((e) => e.res === (+invalidVal[0]))!;
  const et =initData.filter(e=>invalidEl.children.includes(e.name)).filter(e=>e.children.length>0).map(e=>e.children).flat()
  const els = initData.filter(e=>et.includes(e.name)).filter(e=>e.children.length>0).map(e=>e.children).flat()
  if(!els.length){
    return (invalidEl.val+(validVal-invalidEl.res))
  }else{
  return secondPartSolution(initData,invalidEl.name)
  }
  
}

const main = async () => {
  const rawData = await getRawLines("./2017/day_7/data/input.txt");
  const data = rawData.map(prepareItem);
  const head = firstPartSolution(data);
  
  console.log("Part 1:", head);
  console.log("Part 2:",secondPartSolution(data, head));
};

main();
