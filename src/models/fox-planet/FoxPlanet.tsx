import './FoxPlanet.scss';
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Fox } from '../fox/Fox';
import { useTexture } from '@react-three/drei';
import { NavigateFunction } from 'react-router-dom';

export function FoxPlanet(props: JSX.IntrinsicElements['mesh'] & {
  main?: boolean,
  index?: number,
  siblingCount?: number,
  fox: Fox,
  size?: number,
  orbitRadius?: number,
  imageURL: string,
  navigate: NavigateFunction,
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [texture, setTexture] = useState<THREE.Texture>();
  const [hover, setHover] = useState(false);
  const [orbitPosition, setOrbitPosition] = useState<number>();

  useEffect(() => {
    setTexture(undefined);
    meshRef.current.rotation.z = 0;
    if (texture) texture.rotation = 0;

    // Next line needs to be disabled as we want to run this code on props.fox change, but
    // NOT on texture change.
    // eslint-disable-next-line
  }, [props.fox]);

  useEffect(() => {
    let _o = props.main ? 0 : props.index! / props.siblingCount! * Math.PI * 2;
    setOrbitPosition(_o);
  }, [props.main, props.index, props.siblingCount]);

  useEffect(() => {
    meshRef.current.rotation.z = 0;

    if (texture) {
      texture.rotation = 0;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.imageURL]);

  useTexture(props.imageURL, tx => {
    tx = tx as THREE.Texture;
    tx.wrapS = tx.wrapT = THREE.RepeatWrapping;
    tx.repeat.set(1, 1);
    tx.center.set(0.5, 0.5);

    setTexture(tx);
  });

  useFrame((_, delta, __) => {
    if (!texture) return;

    let _dr = delta * (props.size ?? 1);

    texture.rotation -= _dr;
    meshRef.current.rotation.z = -texture!.rotation;

    if (!orbitPosition) return;

    setOrbitPosition(orbitPosition + delta / props.orbitRadius!);

    meshRef.current.position.x = Math.cos(orbitPosition) * props.orbitRadius!;
    meshRef.current.position.y = Math.sin(orbitPosition) * props.orbitRadius!;
  });

  return (
    <>
      <mesh
        {...props}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        onClick={() => props.navigate(`/find/${props.fox.tokenId}`)}
        ref={meshRef}>
        <circleGeometry args={[(props.size || 1.5) * 0.75, 8]} />
        <meshStandardMaterial
          color={!props.main && hover ? '#ffcccc' : '#ffffff'}
          map={texture} />
      </mesh>
    </>
  );
}
