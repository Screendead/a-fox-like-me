import './FoxPlanet.scss';
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Fox } from '../fox/Fox';
import { useTexture } from '@react-three/drei';

export function FoxPlanet(props: JSX.IntrinsicElements['mesh'] & { fox: Fox }) {
  const ref = useRef<THREE.Mesh>(null!);
  const [texture, setTexture] = useState<THREE.Texture>();

  let ipfsImage = props.fox.image;
  let httpsImage = ipfsImage.replace('ipfs://', 'https://ipfs.io/ipfs/');

  useTexture(httpsImage, tx => {
    tx = tx as THREE.Texture;
    tx.wrapS = tx.wrapT = THREE.RepeatWrapping;
    tx.repeat.set(1, 1);

    setTexture(tx);
  });

  useFrame(() => {
    if (!texture) return;

    ref.current.rotation.z += 0.01;
    texture.center.set(0.5, 0.5);
    texture.rotation -= 0.01;
  });

  return (
    <mesh
      {...props}
      ref={ref}>
      <circleGeometry args={[1, 8]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
