import { useEffect, useState } from 'react';
import { Foximity } from './fox/Foximity';
import { FoxPlanet } from './fox-planet/FoxPlanet';
import { Fox } from './fox/Fox';
import { NavigateFunction } from 'react-router-dom';


const ORBITS = [
  { radius: 2, count: 3 },
  { radius: 3.5, count: 7 },
  { radius: 5, count: 11 },
];


export function SolarSystem(props: {
  foxes: Foximity[],
  navigate: NavigateFunction,
}) {
  const [mainFox, setMainFox] = useState<Fox>();
  const [orbits, setOrbits] = useState<JSX.Element[]>([]);

  useEffect(() => {
    let _orbits = [];

    setMainFox(props.foxes.splice(0, 1)[0].fox);

    for (let i = 0; i < ORBITS.length; i++) {
      let _f = props.foxes.splice(0, ORBITS[i].count).map((f, j) => {
        let size = Math.pow(f.proximityPercentage, 2) / 10000 * 2;

        return <FoxPlanet
          key={`${i}-${j}`}
          index={j + 1}
          siblingCount={ORBITS[i].count}
          fox={f.fox}
          size={size}
          orbitRadius={ORBITS[i].radius}
          imageURL={
            `https://storage.googleapis.com/a-fox-like-me.appspot.com/foxes/thumbnails/${f.fox.tokenId}_240x240.webp`
          }
          navigate={props.navigate} />
      });

      _orbits.push(..._f);
    }

    setOrbits(_orbits);
  }, [props.foxes, props.navigate]);

  return (
    <>
      {mainFox && <group>
        <FoxPlanet
          key={0}
          main
          fox={mainFox}
          imageURL={
            `https://storage.googleapis.com/a-fox-like-me.appspot.com/foxes/thumbnails/${mainFox.tokenId}_240x240.webp`
          }
          navigate={props.navigate} />
      </group>}
      {orbits && <group>{orbits}</group>}
    </>
  );
}
