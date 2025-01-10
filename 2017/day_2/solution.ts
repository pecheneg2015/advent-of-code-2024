import { getRawLines } from "#utils";
type Item = {
  min: number;
  max: number;
  letter: string;
  password: string;
};
function prepareData(
  rawData: string[],
): number[][] {
  const res: number[][] = [];
  rawData.forEach(row=>{
    res.push(row.split(' ').map(e=>+e).sort((a,b)=>b-a))
  })
  return res;
}


function findRawRes(data: number[]): number {
  for(let i=0;i<data.length;i++){
    let el =data[i]
    for(let j=i+1;j<data.length;j++){
      let newEl = data[j]
      let r = el/newEl
      if(Number.isInteger(r)){
        return r
      }
    }
  }
  return 0;
}

const main = async () => {
  const rawData = await getRawLines("./2017/day_2/data/input.txt");
  const data = prepareData(rawData);
  console.log(data)
  console.log("Part 1:",data.reduce((acc,el)=>acc+(el.at(0)!-el.at(-1)!),0) );
  console.log("Part 2: ", data.reduce((acc,el)=>acc+findRawRes(el),0) );
};

main();
