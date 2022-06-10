import "./AFoxLikeMe.scss";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Fox } from "../../models/fox/Fox";
import { foximity } from "../../models/foximity";
import { Canvas } from "@react-three/fiber";
import { FoxPlanet } from "../../models/fox-planet/FoxPlanet";
import { Foximity } from "../../models/fox/Foximity";
import { FoxPlanetWrapper } from "../../models/fox-planet/FoxPlanetWrapper";
import { useFirebaseStorageImage } from "../../hooks/useFirebaseStorageImage";

export function AFoxLikeMe() {
  let { id } = useParams();

  const [fox, setFoximity] = useState<Foximity | undefined>();
  const [foximities, setFoximities] = useState<Foximity[]>([]);
  const imageURL = useFirebaseStorageImage(fox?.fox);

  useEffect(() => {
    if (id) {
      try {
        let _f = foximity(id);
        setFoximity(_f.find(f => f.fox.tokenId === id));
        setFoximities(_f);
      } catch (e) {
        console.log(e);
      }
    } else {
      setFoximity(undefined);
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
          {fox && <FoxPlanetWrapper position={[0, 0, 0]} fox={fox?.fox} />}
        </Canvas>
      </div>
      {fox && <div className="display top-left">
        <div className="internalDisplay">
          <div className="heading">
            <img className="pfp" src={imageURL} alt="pfp" />
            <span>
              <h2 className="component-title">{fox?.fox.name.toUpperCase()}</h2>
              <h3 className="component-subtitle">#{fox?.tokenID}</h3>
            </span>
          </div>
          <ul>
            {fox?.fox.attributes.map((a, i) => {
              return (<li key={`fox-${fox?.tokenID}-attr-${i}`}>
                <span className="trait-name">{a.trait_type}</span>: {a.value}
              </li>);
            })}
          </ul>
        </div>
      </div>}
      <div className="display top-right">
        <div className="internalDisplay">
          <div className="heading">
            <h2 className="component-title">KINDRED FOXES</h2>
          </div>
          <table className="cFoxes">
            <thead>
              <tr>
                <th>Fox ID</th>
                <th>Name</th>
                <th>Similarity</th>
              </tr>
            </thead>
            <tbody>
              {foximities
                .slice(0, 10)
                .map(f => (<tr key={f.tokenID}>
                    <td>
                      <Link className="fox-sublink" to={`/find/${f.fox.tokenId}`}>
                        {f.tokenID}
                      </Link>
                    </td>
                    <td>
                      <Link className="fox-sublink" to={`/find/${f.fox.tokenId}`}>
                        {f.fox.name}
                      </Link>
                    </td>
                    <td>{f.proximityPercentage}%</td>
                  </tr>))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="display bottom-right">
        <div className="internalDisplay">
          <div className="heading">
            <h2 className="component-title">DISTANT FOXES</h2>
          </div>
          <table className="dFoxes">
            <thead>
              <tr>
                <th>Fox ID</th>
                <th>Name</th>
                <th>Similarity</th>
              </tr>
            </thead>
            <tbody>
              {[...foximities]
                .sort((a, b) => a.proximityPercentage - b.proximityPercentage)
                .slice(0, 10)
                .map(f => (<tr key={f.tokenID}>
                    <td>
                      <Link className="fox-sublink" to={`/find/${f.fox.tokenId}`}>
                        {f.tokenID}
                      </Link>
                    </td>
                    <td>
                      <Link className="fox-sublink" to={`/find/${f.fox.tokenId}`}>
                        {f.fox.name}
                      </Link>
                    </td>
                    <td>{f.proximityPercentage}%</td>
                  </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
