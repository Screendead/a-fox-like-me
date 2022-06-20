import { FirebaseApp, initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyChU5p_9V-cthnqTWW3F6RmPTzXj1k0cgg',
  authDomain: 'a-fox-like-me.firebaseapp.com',
  projectId: 'a-fox-like-me',
  storageBucket: 'a-fox-like-me.appspot.com',
  messagingSenderId: '63753981593',
  appId: '1:63753981593:web:4de94fe39bb4d3d18c3208',
};

export function useFirebase() {
  const [app, setApp] = useState<FirebaseApp>();

  useEffect(() => {
    const _app = initializeApp(firebaseConfig);

    setApp(_app);
  }, []);

  return app;
}
