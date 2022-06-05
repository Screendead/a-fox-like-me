import "./AFoxLikeMe.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Fox } from "../../models/fox/Fox";
import { foximity } from "../../models/foximity";
import { Canvas } from "@react-three/fiber";
import { FoxPlanet } from "../../models/fox-planet/FoxPlanet";
import { Foximity } from "../../models/fox/Foximity";

export function AFoxLikeMe() {
  let { id } = useParams();

  const [fox, setFox] = useState<Fox | undefined>();
  const [foximities, setFoximities] = useState<Foximity[]>([]);

  useEffect(() => {
    if (id) {
      try {
        let _f = foximity(parseInt(id));
        setFox(_f.find(f => f.fox.tokenId === parseInt(id!))?.fox);
        setFoximities(_f);
      } catch (e) {
        console.log(e);
      }
    } else {
      setFox(undefined);
      setFoximities([]);
    }
  }, [id]);

  return (
    <>
      <div className="experience-container">
        <Canvas
          linear
          flat
          camera={{
          fov: 30,
          near: 0.1,
          far: 1000,
          position: [0, 0, 25],
        }}>
          <ambientLight />
          {fox && <FoxPlanet position={[0, 0, 0]} fox={fox} />}
        </Canvas>
      </div>
      {fox && <div className="display">
        <div className="internalDisplay">
          <div className="heading">
            <img className="pfp" src={fox.image.replace('ipfs://', 'https://ipfs.io/ipfs/')} alt="pfp" />
            <span>
              <h2 className="component-title">{fox.name.toUpperCase()}</h2>
              <h3 className="component-subtitle">#{fox.tokenId}</h3>
            </span>
          </div>
          <ul>
            {fox.attributes.map(a => {
              return (<li key={a.trait_type}>
                <span className="trait-name">{a.trait_type}</span>: {a.value}
              </li>);
            })}
          </ul>
        </div>
      </div>}
      <div className="experience-container">
        <div className="display">
          <div className="internalDisplay">
            <div className="heading">
              <h2 className="component-title">DISTANT FOXES</h2>
            </div>
            <table id="dFoxes">
              <thead>
                <tr>
                  <th>Token ID</th>
                  <th>Name</th>
                  <th>Distance</th>
                </tr>
              </thead>
              <tbody>
                {foximities.map(f => (
                  <tr key={f.fox.tokenId}>
                    <td>{f.fox.tokenId}</td>
                    <td>{f.fox.name}</td>
                    <td>{f.proximityPercentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
