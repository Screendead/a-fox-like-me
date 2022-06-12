import fs from 'fs/promises';
import fetch from 'node-fetch';
import data from './V1FoxesOSData.json' assert {type: 'json'};


async function download() {
  for (let i = 0; i < data.length; i++) {
    let fox = data[i];
    let url = fox.image_url;

    let result = await fetch(url);
    let buffer = await result.buffer();
    // let location = ref(storage, `foxes/${fox.tokenId}.png`);

    await fs.writeFile(`./foxes/v1/${fox.token_id}.png`, buffer);
  }
}


download();
