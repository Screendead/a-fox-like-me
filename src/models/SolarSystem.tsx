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
  const [orbitPaths, setOrbitPaths] = useState<JSX.Element[]>([]);
  const [showRings, setShowRings] = useState(false);

  useEffect(() => {
    let handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setShowRings(!showRings);
      }
    }

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    }
  }, [showRings]);

  useEffect(() => {
    let _o = [];
    let _orbits = [];

    setMainFox(props.foxes.splice(0, 1)[0].fox);

    for (let i = 0; i < ORBITS.length; i++) {
      _o.push(
        <mesh
          key={`orbit-${i}`}
          position={[0, 0, -0.001]}
        >
          <ringGeometry args={[
            ORBITS[i].radius - 0.01,
            ORBITS[i].radius + 0.01,
            128,
          ]} />
          <meshBasicMaterial
            color={0xffffff}
            opacity={0.5}
            transparent={true}
          />
        </mesh>
      );

      let _f = props.foxes.splice(0, ORBITS[i].count).map((f, j) => {
        let size = Math.sqrt(f.proximityPercentage / ORBITS[i].radius) * 0.15;

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

    setOrbitPaths(_o);
    setOrbits(_orbits);

    // eslint-disable-next-line
  }, [props.foxes]);

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
      {showRings && orbitPaths && <group>
        {orbitPaths}
      </group>}
      {orbits && <group>{orbits}</group>}
    </>
  );
}
