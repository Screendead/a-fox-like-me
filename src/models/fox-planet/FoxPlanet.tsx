import './FoxPlanet.scss';
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Fox } from '../fox/Fox';
import { useTexture } from '@react-three/drei';

export function FoxPlanet(props: JSX.IntrinsicElements['mesh'] & { fox: Fox, imageURL: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [texture, setTexture] = useState<THREE.Texture>();

  useTexture(props.imageURL, tx => {
    tx = tx as THREE.Texture;
    tx.wrapS = tx.wrapT = THREE.RepeatWrapping;
    tx.repeat.set(1, 1);
    tx.center.set(0.5, 0.5);

    meshRef.current.rotation.z = 0;
    tx.rotation = 0;
    setTexture(tx);
  });

  useFrame(() => {
    if (!texture) return;

    meshRef.current.rotation.z += 0.01;
    texture.rotation -= 0.01;
  });

  return (
    <mesh
      {...props}
      ref={meshRef}>
      <circleGeometry args={[1, 8]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
