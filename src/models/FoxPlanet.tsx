import * as THREE from 'three';
import { useRef, useState } from 'react';

export function FoxPlanet(props: JSX.IntrinsicElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  return (
    <mesh castShadow receiveShadow
      {...props}
      ref={ref}
      scale={clicked ? 1 : 1.5}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <sphereGeometry args={[
        0.5,
        32,
        32,
      ]} />
      {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
      <meshToonMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}
