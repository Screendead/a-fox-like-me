import * as THREE from 'three';
import { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Foximity } from './fox/Foximity';
import { FoxPlanetWrapper } from './fox-planet/FoxPlanetWrapper';


export function SolarSystem(props: { foxes: Foximity[] }) {
  const [rings, setRings] = useState<Foximity[][]>();
  const [minProxmity, setMinProxmity] = useState(0);
  const [maxProxmity, setMaxProxmity] = useState(0);
  const [foxPlanets, setFoxPlanets] = useState<JSX.Element[]>([]);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let rings: Foximity[][] = [];
    let _min = 100;
    let _max = 0;
    for (let fox of props.foxes) {
      rings[fox.proximity] = rings[fox.proximity] || [];
      rings[fox.proximity].push(fox);

      if (fox.proximityPercentage < _min) _min = fox.proximityPercentage;
      if (fox.proximityPercentage > _max) _max = fox.proximityPercentage;
    }
    setRings(rings);
    setMinProxmity(_min);
    setMaxProxmity(_max);
  }, [props.foxes]);

  useFrame(() => {
    if (!rings) return;

    let foxPlanets: JSX.Element[] = [];

    for (let i = 0; i < rings.length; i++) {
      if (!rings[i]) continue;

      let thisRingProxmity = (i / rings.length) * (maxProxmity - minProxmity) + minProxmity;

      for (let j = 0; j < rings[i].length; j++) {
        let _f = rings[i][j];
        let _c = (j / rings[i].length) * Math.PI * 2;

        let position = new THREE.Vector3(
          Math.cos(_c + rotation / i) * thisRingProxmity,
          Math.sin(_c + rotation / i) * thisRingProxmity,
          0,
        );

        foxPlanets.push(<FoxPlanetWrapper key={_f.fox.tokenId} position={position} fox={_f.fox} />);
      }
    }
    setFoxPlanets(foxPlanets);
    setRotation(rotation + 0.01);
  });

  return (
    <>
      <group>{foxPlanets}</group>
    </>
  );
}
