import { getRawLine } from "#utils";

function firstPartSolution(rawData: string[]): number {
  let res = 0;
  let data = [...rawData];
  let newData:string[] = []
  let isOk = true
  
  data.forEach(el=>{
    if(isOk && el!=="!"){
      newData.push(el)
    }else
    if(isOk && el==="!"){
      isOk=false
    }else
    if(!isOk ){
      isOk=true
    }
  })
  data = newData
  newData=[]
  isOk = true
  data.forEach(el=>{
    if(isOk && el!=="<"){
      newData.push(el)
    }else
    if(isOk && el==="<"){
      isOk=false
    }else
    if(!isOk && el===">"){
      isOk=true
    }
  })

  data = newData.filter(e=>['{','}'].includes(e))
  let addVal: number = 0;
  data.forEach((el) => {
    if (el === "{") {
      addVal++;
    }else
    if (el === "}")  {
      res += addVal;
      addVal--;
    }
  });

  return res;
}


function secondPartSolution(rawData: string[]): number {
  let res = 0;
  let data = [...rawData];
  let newData:string[] = []
  let isOk = true
  
  data.forEach(el=>{
    if(isOk && el!=="!"){
      newData.push(el)
    }else
    if(isOk && el==="!"){
      isOk=false
    }else
    if(!isOk ){
      isOk=true
    }
  })
 data = newData
 isOk =false
 data.forEach(e=>{
  if(!isOk && e==="<"){
    isOk=true
  }else if(isOk && e===">"){
    isOk =false
  }else if(isOk){
    res++
  }
 })
  return res;
}
const main = async () => {
  const rawData = await getRawLine("./2017/day_9/data/input.txt");
  const data = rawData.split("");
  console.log("Part 1:", firstPartSolution(data));
  console.log("Part 2:", secondPartSolution(data));
};

main();
