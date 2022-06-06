import inputArray from "./V1FoxesOSData.json"
// import fs from 'node:fs/promises'

export async function runMe(): Promise<string> {
  console.log('Handling V1 Foxes...');

  function constructItem(i: any) {
    let url = inputArray[i].image_preview_url
    console.log('image_preview_url', url);
    let newUrl = url.replace(/s\d+$/, 'w=s256');
    console.log('newUrl', newUrl);
    let traits = inputArray[i].traits
// delete thisTrait.order;
// delete thisTrait.order;
    // console.log(traits);
    let FoxJson = {
      "image": newUrl,
      "tokenId": "G"+ inputArray[i].token_id.substring(0, 5),
      "description": inputArray[i].description,
      "name": inputArray[i].name,
      "attributes": traits
    }
    return FoxJson
  }

  async function loopFoxes(loopTimes: any) {
    let foxArray = []
    console.log(inputArray);

    for (let i = 1; i < loopTimes; i++) { // 1300 Tokens
      foxArray.push(await constructItem(i))

      console.log(i);
      if (foxArray.length === loopTimes - 1) {
      // fs.writeFile("./parsedV1data.json",JSON.stringify(foxArray))
      console.log(foxArray);

        // return foxArray
      }

      // console.log(foxArray.length);
    }
  }


  // loopFoxes(10) // 112
  // console.log(foxArray);
  // fs.writeFile("./data.json",JSON.stringify(foxArray))

  return JSON.stringify([]);
}
