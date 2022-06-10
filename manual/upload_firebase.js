import fs from 'fs/promises';
import admin from 'firebase-admin';
import serviceAccount from './serviceAccount.json' assert {type: 'json'};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function uploadSingle(file) {
  await admin.storage().bucket('a-fox-like-me.appspot.com').upload(`./foxes_v1/${file}`, {
    destination: `foxes/v1/${file}`,
    metadata: {
      contentType: 'image/png',
    },
  });

  console.log(`Uploaded ${file}`);
}


async function upload() {
  let promises = [];

  // Get all files in ./foxes
  let files = await fs.readdir('./foxes_v1');
  files = files.filter(file => file.endsWith('.png'));
  for (let i = 0; i < files.length; i++) {
    promises.push(uploadSingle(files[i]));
  }

  await Promise.all(promises);

  console.log('Uploaded all files');
}


upload();
