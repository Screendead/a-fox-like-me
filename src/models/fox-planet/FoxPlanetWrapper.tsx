import './FoxPlanet.scss';
import { useEffect, useState } from 'react';
import { Fox } from '../fox/Fox';
import { FoxPlanet } from './FoxPlanet';
import { useFirebaseStorageImage } from '../../hooks/useFirebaseStorageImage';

export function FoxPlanetWrapper(props: JSX.IntrinsicElements['mesh'] & { fox: Fox }) {
  const imageURL = useFirebaseStorageImage(props.fox);

  if (!imageURL) return <></>;

  return (
    <FoxPlanet
      key={props.fox.tokenId}
      position={props.position}
      fox={props.fox}
      imageURL={imageURL} />
  );
}
