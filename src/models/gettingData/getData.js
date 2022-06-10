import fetch from 'node-fetch'
import fs from 'node:fs/promises'

async function getItem (tokenNum){
let response = await fetch ("https://opensea.mypinata.cloud/ipfs/QmTM2banPba5x8scA9V6n7KgCbqjjAuarHDXuSboPPWHGh/metadata/" + tokenNum + ".json")
return await response.json()
}

async function loopFoxes (loopTimes){
    let foxArray = []
for (let i = 1; i < loopTimes; i++) { //1300 Tokens
    foxArray.push(await getItem (i))
    if (foxArray.length === loopTimes-1) {
        fs.writeFile("./data.json",JSON.stringify(foxArray))
        // return foxArray
    }
    
    // console.log(foxArray.length);
    }  
}



loopFoxes (1300)
// console.log(foxArray);
// fs.writeFile("./data.json",JSON.stringify(foxArray))
