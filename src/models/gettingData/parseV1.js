import fs from 'node:fs/promises'
import inputArray from "./V1FoxesOSData.json"

async function getItem (tokenNum){

}

async function loopFoxes (loopTimes){
    let foxArray = []
    console.log(inputArray);
for (let i = 1; i < loopTimes; i++) { //1300 Tokens
    // foxArray.push(await getItem (i))

    console.log(i);
    if (foxArray.length === loopTimes-1) {
        // fs.writeFile("./parsedV1data.json",JSON.stringify(foxArray))
        // return foxArray
    }
    
    // console.log(foxArray.length);
    }  
}


loopFoxes (10)//112
// console.log(foxArray);
// fs.writeFile("./data.json",JSON.stringify(foxArray))



// url = inputArray[i].image_preview_url
// let newUrl = url.replace(/w=s\d+/, 'w=s256');
// inputArray[i].traits


