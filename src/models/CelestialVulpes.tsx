import { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Foximity } from './fox/Foximity';
import { FoxPlanet } from './FoxPlanet';

export function CelestialVulpes(props: { foxes: Foximity[] }) {
  const [foxPlanets, setFoxPlanets] = useState<JSX.Element[]>([]);

  useFrame(() => {
    let _cv: JSX.Element[] = [];
    for (let i = 0; i < props.foxes.length; i++) {
      // Get x, y in circle based on index and length of array
      let _x = Math.cos(2 * Math.PI * i / props.foxes.length) * 5;
      let _y = Math.sin(2 * Math.PI * i / props.foxes.length) * 5;

      _cv.push(<FoxPlanet key={i} position={[_x, _y, 0]} />);
    }
    setFoxPlanets(_cv);
  });

  return (
    <group>{foxPlanets}</group>
  );
}
