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

type Sizes = '32x32' | '30x30'
  | '64x64' | '60x60'
  | '128x128' | '120x120'
  | '256x256' | '240x240'
  | '512x512' | '300x300'
  | '600x600' | undefined; // undefined means "use the original size"

export function useFirebaseStorageImage(
  fox: Fox | undefined,
  size: Sizes = undefined,
) {
  const [imageURL, setImageURL] = useState<string>();

  useEffect(() => {
    if (!fox) return;

    let loadImage = async () => {
      let path = size
        ? `foxes/thumbnails/${fox.tokenId}_${size}.webp`
        : `foxes/${fox.tokenId}.png`;
      // let path = `foxes/${fox.tokenId}.png`;

      let location = ref(storage, path);
      let url = await getDownloadURL(location);
      setImageURL(url);
    };

    loadImage();
  }, [fox, size]);

  return imageURL;
}
