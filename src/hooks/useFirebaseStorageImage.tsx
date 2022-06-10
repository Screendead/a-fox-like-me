import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { Fox } from "../models/fox/Fox";

let app = initializeApp({
  authDomain: "a-fox-like-me.firebaseapp.com",
  projectId: "a-fox-like-me",
  storageBucket: "a-fox-like-me.appspot.com",
  messagingSenderId: "63753981593",
  appId: "1:63753981593:web:4de94fe39bb4d3d18c3208",
});
let storage = getStorage(app);

export function useFirebaseStorageImage(fox: Fox | undefined) {
  const [imageURL, setImageURL] = useState<string>();

  useEffect(() => {
    if (!fox) return;

    let loadImage = async () => {
      let location = ref(storage, `foxes/${fox.tokenId}.png`);
      let url = await getDownloadURL(location);
      setImageURL(url);
    };

    loadImage();
  }, [fox?.tokenId]);

  return imageURL;
}
