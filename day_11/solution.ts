import { getRawLine } from "#utils";

// brute-force
function firstPartSolution(data: string[]): number {
  let arr: string[] = [...data];
  let counter = 1;
  while (counter <= 25) {
    const currentArr: string[] = [];
    arr.forEach((e) => {
      if (e === "0") {
        currentArr.push("1");
      } else if (e.length % 2 === 0) {
        const mid = e.length / 2;
        const first = +e.substring(0, mid);
        const second = +e.substring(mid);
        currentArr.push(first.toString());
        currentArr.push(second.toString());
      } else {
        currentArr.push((2024 * (+e)).toString());
      }
    });
    arr = currentArr;
    counter++;
  }
  return arr.length;
}


// map
function secondPartSolution(data: string[]): number {
  let m:Record<string,number>={}
  data.forEach(e=>{
    if(!m[e])
      m[e]=0
    m[e]++
  })
  let counter = 1
  while (counter <= 75) {
    const m2:Record<string,number>={}

    for(const k in m){
      const e = m[k]
      if (k === "0") {
        if(e>0){
          if(!m2['1'])
            m2['1']=0;
          m2['1']+=e
        }
      } else if (k.length % 2 === 0) {
        const mid = k.length / 2;
        const first = +k.substring(0, mid);
        const second = +k.substring(mid);
        if(!m2[first])
          m2[first]=0;
        m2[first]+=e
        if(!m2[second])
          m2[second]=0;
        m2[second]+=e
      } else {
        const numVal = (2024 * (+k)).toString()
        if(!m2[numVal])
          m2[numVal]=0;
        m2[numVal]+=e
      }

    }
    m ={...m2}
    counter++;
  }
  return Object.values(m).reduce((acc,el)=>acc+el,0);
}

const main = async () => {
  const rawData = await getRawLine("./day_11/data/input.txt");
  const data = rawData.split(" ");
  console.log("Part 1: ", firstPartSolution(data));
  console.log("Part 2: ", secondPartSolution(data));
};

main();
