import {  getRawLines } from "#utils";

function isValidKey(data:string[]):boolean{
  let res:boolean = true
  let m:Record<string,number>={}
  data.forEach(e=>{
    if(!m[e])
      m[e]=0
    m[e]++
  })
  return Object.values(m).findIndex(e=>e>1)===-1;
}

function updateArr(data:string[]):string[]{
  return data.map(e=>e.split('').sort().join())
}

const main = async () => {
  const rawData = await getRawLines("./2017/day_4/data/input.txt");
  const data = rawData.map(e=>e.split(' '));
  // const fieldSize = getSize(data);
  console.log("Part 1: ",data.filter(isValidKey).length);
  console.log("Part 2: ", data.filter(isValidKey).map(updateArr).filter(isValidKey).length);
};

main();
// 368078
