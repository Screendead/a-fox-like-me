import data from './data.json' assert {type: 'json'};
import fs from 'fs/promises';
import admin from 'firebase-admin';
import serviceAccount from './serviceAccount.json' assert {type: 'json'};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


async function getURL(file) {
  try {
    await admin
      .storage()
      .bucket('a-fox-like-me.appspot.com')
      .file(file)
      .makePublic();

    return `https://storage.googleapis.com/a-fox-like-me.appspot.com/${file}`;
  } catch (e) {
    console.log('Error', file);
    return null;
  }
}


const sizes = [
  '32x32',
  '30x30',
  '64x64' ,
  '60x60',
  '128x128',
  '120x120',
  '256x256',
  '240x240',
  '300x300',
];

async function getURLsForFox(fox) {
  let url = await getURL(`foxes/${fox.tokenId}.png`);
  let thumbsList = await Promise.all(sizes.map(async (size) => {
    return {
      webp: await getURL(`foxes/thumbnails/${fox.tokenId}_${size}.webp`),
      jpeg: await getURL(`foxes/thumbnails/${fox.tokenId}_${size}.jpeg`),
      size,
    };
  }));
  let thumbs = {};
  thumbsList.forEach((thumb) => {
    thumbs[thumb.size] = {
      webp: thumb.webp,
      jpeg: thumb.jpeg,
    }
  });

  console.log(`${fox.tokenId} done`);

  return {
    ...fox,
    images: {
      'original': url,
      'thumbs': thumbs,
    },
  };
}

async function main() {
  let promises = [];

  for (let i = 0; i < 1; i++) {
    promises.push(getURLsForFox(data[i]));
  }

  let result = await Promise.all(promises);

  fs.writeFile('./data_with_images.json', JSON.stringify(result, null, 2));
}


main();
