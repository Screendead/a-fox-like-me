import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Fox } from './fox/Fox';
import { useTexture } from '@react-three/drei';

export function FoxPlanet(props: JSX.IntrinsicElements['mesh'] & { fox: Fox }) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  let ipfsImage = props.fox.image;
  let httpsImage = ipfsImage.replace('ipfs://', 'https://ipfs.io/ipfs/');

  const texture = useTexture(httpsImage);

  useFrame(() => {
    // ref.current.rotation.z += 0.01;
  });

  return (
    <mesh castShadow receiveShadow
      {...props}
      ref={ref}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <circleGeometry args={[
        1,
        8,
      ]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
}
