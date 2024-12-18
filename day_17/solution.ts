import { getRawLines } from "#utils";
let arr = [
  "000",
  "001",
  "010",
  "011",
  "100",
  "101",
  "110",
  "111",
];
type Program = {
  A: number ;
  B: number ;
  C: number ;
  actions: number[];
};

function prepareData(raw: string[]): Program {
  return {
    A: +raw[0].split(": ")[1],
    B: +raw[1].split(": ")[1],
    C: +raw[2].split(": ")[1],
    actions: raw[4].split(": ")[1].split(",").map((e) => +e),
  };
}

function firstPartSolution(data: Program): string {
  return execute(data).join(",");
}

function getComboLiteral(data: Program, action: number) {
  if (action === 4) {
    return data.A;
  }
  if (action === 5) {
    return data.B;
  }
  if (action === 6) {
    return data.C;
  }
  if (action === 7) {
    throw new Error("");
  }
  return action;
}
function adv(data: Program, ind: number): Program {
  const literal = data.actions[ind + 1];
  const comboLiteral = getComboLiteral(data, literal);
  data.A = Math.trunc(data.A / (2 ** comboLiteral));
  return data;
}

// Тут используем BigInt т.к. по дефолту с number xor  возвращает 32-битное число
function xor(a:number,b:number):number{
  let aBug = BigInt(a)
  let bBug = BigInt(b)
  let res = aBug^bBug
  return Number(res);  
}
function bxl(data: Program, ind: number): Program {
  const literal = data.actions[ind + 1];
  data.B = xor( data.B ,literal);
  return data;
}

function bst(data: Program, ind: number): Program {
  const literal = data.actions[ind + 1];
  const comboLiteral = getComboLiteral(data, literal);
  data.B = comboLiteral % 8;
  return data;
}

function jnz(data: Program, ind: number): [Program, number] {
  if (data.A === 0) {
    return [data, ind + 2];
  }
  return [data, data.actions[ind + 1]];
}

function bxc(data: Program): Program {
  let val = xor(data.B,data.C) ;
  data.B = val;
  return data;
}

function out(data: Program, ind: number): number {
  const literal = data.actions[ind + 1];
  const comboLiteral = getComboLiteral(data, literal);
  return comboLiteral % 8;
}

function bdv(data: Program, ind: number): Program {
  const literal = data.actions[ind + 1];
  const comboLiteral = getComboLiteral(data, literal);
  data.B = Math.trunc(data.A / (2 ** comboLiteral));
  return data;
}

function cdv(data: Program, ind: number): Program {
  const literal = data.actions[ind + 1];
  const comboLiteral = getComboLiteral(data, literal);
  data.C = Math.trunc(data.A / (2 ** comboLiteral));
  return data;
}

function execute(data: Program): number[] {
  let res: number[] = [];
  let ind = 0;
  while (ind < data.actions.length) {
    let action = data.actions[ind];
    switch (action) {
      case 0:
        data = adv(data, ind);
        ind += 2;
        break;
      case 1:
        data = bxl(data, ind);
        ind += 2;
        break;
      case 2:
        data = bst(data, ind);
        ind += 2;
        break;
      case 3:
        [data, ind] = jnz(data, ind);
        break;
      case 4:
        data = bxc(data);
        ind += 2;
        break;
      case 5:
        res.push(out(data, ind));
        ind += 2;
        break;
      case 6:
        data = bdv(data, ind);
        ind += 2;
        break;
      case 7:
        data = cdv(data, ind);
        ind += 2;
        break;
    }
  }
  return res;
}
function find(data: Program): number {
  let stack = [""];
  let newStack:string[] = [];
  let len = 1
  let target = data.actions.join(",");
  let targetLen = target.length;

  while(len<=targetLen){
    while(stack.length){
      let st = stack.shift()
      arr.forEach((arrEl) => {
        let newEl = st +arrEl;
        data.A = Number.parseInt(newEl, 2);
        let r = execute(data).join(',');
        if(target.endsWith(r) && r.length===len){
          // console.log(r)
          newStack.push(newEl)

        }
      });
    }
    stack =[...newStack]
    newStack=[]
    len+=2
  }

 
 
  return Math.min(...(stack.map(e=>Number.parseInt(e,2))));
}
const main = async () => {
  const rawData = await getRawLines("./day_17/data/input.txt");
  const data = prepareData(rawData);
  console.log("Part 1:",firstPartSolution(data));
  console.log("Part 2:", find(data));
};
main();
