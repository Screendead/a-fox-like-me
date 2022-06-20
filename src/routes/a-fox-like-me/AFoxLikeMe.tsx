import "./AFoxLikeMe.scss";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { foximity } from "../../models/foximity";
import { Canvas } from "@react-three/fiber";
import { Foximity } from "../../models/fox/Foximity";
import { SolarSystem } from "../../models/SolarSystem";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export function AFoxLikeMe() {
  const { id } = useParams();
  const { width } = useWindowDimensions();

  const [fox, setFoximity] = useState<Foximity | undefined>();
  const [foximities, setFoximities] = useState<Foximity[]>([]);

  const [shownDisplay, setShownDisplay] = useState<JSX.Element>();

  const info = (
    <div className={`display top-left`}>
      <div className="internalDisplay">
        {width <= 1200 && <div>
          <button className="action-button top-right" onClick={
            () => setShownDisplay(undefined)
          }>CLOSE</button>
        </div>}
        <div className="heading">
          <img className="pfp" src={
            `https://storage.googleapis.com/a-fox-like-me.appspot.com/foxes/thumbnails/${fox?.fox.tokenId}_120x120.webp`
          } alt="pfp" />
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
    </div>
  );
  const kindred = (
    <div className="display top-right">
      <div className="internalDisplay">
        {width <= 1200 && <div>
          <button className="action-button top-right" onClick={
            () => setShownDisplay(undefined)
          }>CLOSE</button>
        </div>}
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
              .slice(1, 11)
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
  );
  const distant = (
    <div className="display bottom-right">
      <div className="internalDisplay">
        {width <= 1200 && <div>
          <button className="action-button top-right" onClick={
            () => setShownDisplay(undefined)
          }>CLOSE</button>
        </div>}
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
              .slice(0, 5)
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
  );

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
          {foximities && <SolarSystem foxes={foximities} />}
        </Canvas>
      </div>
      {width <= 1200
        ? (shownDisplay ? shownDisplay : <>
          <button className="action-button top-left" onClick={() => {
            setShownDisplay(info);
          }}>Show Info</button>
          <button className="action-button top-right" onClick={() => {
            setShownDisplay(kindred);
          }}>Show Kindred</button>
          <button className="action-button bottom-right" onClick={() => {
            setShownDisplay(distant);
          }}>Show Distant</button>
        </>)
        : <>
          {info}
          {kindred}
          {distant}
        </>}
    </>
  );
}
