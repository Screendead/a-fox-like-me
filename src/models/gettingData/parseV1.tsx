import inputArray from "./V1FoxesOSData.json"
// import fs from 'node:fs/promises'

export async function runMe(): Promise<string> {
  console.log('Handling V1 Foxes...');
  let FoxJson = {}
  let foxArray: typeof FoxJson[] = [];


  function constructItem(i: any) {
    let url = inputArray[i].image_preview_url
    console.log('image_preview_url', url);
    let newUrl = url.replace(/s\d+$/, 'w=s256');
    console.log('newUrl', newUrl);
    let traits = inputArray[i].traits
    // console.log(traits);

    //     for (let i = 1; i < traits.length; i++) {
    // let thisTrait = traits[i];
    // delete thisTrait.order;
    //     }
    let traitstructure = {}
    let cleanTraits: typeof traitstructure[] = [];
    
    for (let i = 1; i < traits.length; i++) {
      let thisTrait = traits[i];

      const { order,display_type,max_value,trait_count, ...cleanTrait } = thisTrait;
      // delete thisTrait.order;
      cleanTraits.push(cleanTrait)
    }
      FoxJson = {
        "image": newUrl,
        "tokenId": "G" + inputArray[i].token_id.substring(0, 5),
        "description": inputArray[i].description,
        "name": inputArray[i].name,
        "attributes": cleanTraits
      }
      return FoxJson
    
  }


  async function loopFoxes(loopTimes: any) {

    console.log(inputArray);

    for (let i = 0; i < loopTimes; i++) { // 1300 Tokens
      foxArray.push(await constructItem(i))

      console.log(i);
      if (foxArray.length === loopTimes - 1) {
        // fs.writeFile("./parsedV1data.json",JSON.stringify(foxArray))
        console.log(foxArray);
        return foxArray;
        // return foxArray
      }

      // console.log(foxArray.length);
    }
  }


  // loopFoxes(3).then(result => {


  // got final result
  // }) // 112
  // console.log(foxArray);
  // fs.writeFile("./data.json",JSON.stringify(foxArray))
  return JSON.stringify(await loopFoxes(112));
  //return await loopFoxes(3)
}
