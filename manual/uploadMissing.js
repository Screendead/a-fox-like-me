import admin from 'firebase-admin';
import data from './data.json' assert {type: 'json'};
import serviceAccount from './serviceAccount.json' assert {type: 'json'};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const storage = admin.storage();
const bucket = storage.bucket('a-fox-like-me.appspot.com');

data.forEach(async ({
  name,
  tokenId,
}) => {
  const exists = await bucket.file(`foxes/${tokenId}.png`).exists();

  if (exists[0]) {
    // console.log(`#${tokenId} ${name} already exists.`);
  } else {
    // console.log(`Uploading #${tokenId} ${name}...`);
    await bucket.upload(`./foxes_all/${tokenId}.png`, {
      destination: `foxes/${tokenId}.png`,
      metadata: {
        contentType: 'image/png',
      },
    });
    console.log(`Uploaded #${tokenId} ${name}!`);
  }
});
