import fs from 'fs/promises';
import fetch from 'node-fetch';
import data from './V1FoxesOSData.json' assert {type: 'json'};
import { initializeApp } from 'firebase/app';
import { getStorage, connectStorageEmulator, ref, uploadBytes } from 'firebase/storage';


initializeApp({
  apiKey: "AIzaSyChU5p_9V-cthnqTWW3F6RmPTzXj1k0cgg",
  authDomain: "a-fox-like-me.firebaseapp.com",
  projectId: "a-fox-like-me",
  storageBucket: "a-fox-like-me.appspot.com",
  messagingSenderId: "63753981593",
  appId: "1:63753981593:web:4de94fe39bb4d3d18c3208",
});
const storage = getStorage();
connectStorageEmulator(storage, 'localhost', 9199);


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
