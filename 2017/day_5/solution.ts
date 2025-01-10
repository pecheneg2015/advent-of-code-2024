import {  getRawLines } from "#utils";
 
function firstPartSolution(initData:number[]):number{
  const data =[...initData]
 let currentInd = 0;
 let steps = 0
 while(currentInd>=0 && currentInd<data.length){
  steps++
  const val = data[currentInd];
  const newInd = currentInd+val;
  data[currentInd]++
  currentInd= newInd
 }
  return steps;
}

function secondPartSolution(initData:number[]):number{
  const data =[...initData]
  let currentInd = 0;
  let steps = 0
  while(currentInd>=0 && currentInd<data.length){
   steps++
   const val = data[currentInd];
   const newInd = currentInd+val;
   if(val>=3){
    data[currentInd]--
   }else{
    data[currentInd]++
   }
   currentInd= newInd
  }
   return steps;
 }
 
const main = async () => {
  const rawData = await getRawLines("./2017/day_5/data/input.txt");
  const data = rawData.map(e=>+e);
  console.log("Part 1:",firstPartSolution(data))
  console.log("Part 2:",secondPartSolution(data))
};

main();
