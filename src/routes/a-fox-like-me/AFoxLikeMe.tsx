import "./AFoxLikeMe.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { foximity } from "../../models/foximity";
import { Canvas } from "@react-three/fiber";
import { Foximity } from "../../models/fox/Foximity";
import { SolarSystem } from "../../models/SolarSystem";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import metadataIcon from "./metadata.svg";
import backIcon from "./back.svg";
import kindredIcon from "./kindred.svg";
import distantIcon from "./distant.svg";

import { TwitterIcon, TwitterShareButton } from "react-share";

function foxInfoRow(fox: Foximity) {
  return (
    <tr key={fox.tokenID}>
      <td className="fox-id">
        <Link className="fox-sublink" to={`/find/${fox.fox.tokenId}`}>
          #{fox.tokenID}
        </Link>
      </td>
      <td className="fox-name">
        <Link className="fox-sublink" to={`/find/${fox.fox.tokenId}`}>
          {fox.fox.name}
        </Link>
      </td>
      <td className="similarity">{fox.proximityPercentage.toFixed(2)}%</td>
    </tr>
  );
}

export function AFoxLikeMe() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { width } = useWindowDimensions();

  const [fox, setFox] = useState<Foximity | undefined>();
  const [foximities, setFoximities] = useState<Foximity[]>([]);

  const [shownDisplay, setShownDisplay] = useState<JSX.Element>();

  const [info, setInfo] = useState<JSX.Element>();
  const [kindred, setKindred] = useState<JSX.Element>();
  const [distant, setDistant] = useState<JSX.Element>();
  const [twitterShare, setTwitterShare] = useState<JSX.Element>();

  useEffect(() => {
    setShownDisplay(undefined);

    if (id) {
      try {
        let _f = foximity(id);
        setFox(_f.find(f => f.fox.tokenId === id));
        setFoximities(_f);
      } catch (e) {
        console.log(e);
      }
    } else {
      setFox(undefined);
      setFoximities([]);
    }
  }, [id]);

  useEffect(() => {
    setInfo(
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
          <table>
            <tbody>
              {fox?.fox.attributes.map((a, i) => {
                return (<tr key={`fox-${fox?.tokenID}-attr-${i}`}>
                  <td className="trait-name">{a.trait_type}:</td>
                  <td>{a.value}</td>
                </tr>);
              })}
            </tbody>
          </table>
        </div>
      </div>
    );

    setKindred(
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
                .map(foxInfoRow)}
            </tbody>
          </table>
        </div>
      </div>
    );

    setDistant(
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
                .map(foxInfoRow)}
            </tbody>
          </table>
        </div>
      </div>
    );

    setTwitterShare(
      <TwitterShareButton
        url={`https://afoxlikeme.xyz/find/${fox?.fox.tokenId}`}
        title={`The kindred foxes of 🦊 ${fox?.fox.name}`}
        via="FoxesNFT"
        hashtags={["afoxlikeme"]}
        className={`twitter-share-button`}>
        <TwitterIcon size={45} round />
      </TwitterShareButton>
    );
  }, [fox, foximities, width]);

  return (
    <>
      {!shownDisplay && <span className="bottom-left button-list">
        <button className="action-button" onClick={() => navigate("/")}>
          <img className="button-icon" src={backIcon} alt="Back to search page" />
        </button>
        {twitterShare}
      </span>}
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
          {foximities && <SolarSystem foxes={foximities} navigate={navigate} />}
        </Canvas>
      </div>
      {width <= 1200
        ? (shownDisplay ? shownDisplay : <>
          <button className="action-button top-left" onClick={() => {
            setShownDisplay(info);
          }}>
            <img className="button-icon" src={metadataIcon} alt="View fox metadata" />
          </button>
          <button className="action-button top-right" onClick={() => {
            setShownDisplay(kindred);
          }}>
            <img className="button-icon" src={kindredIcon} alt="View kindred foxes" />
          </button>
          <button className="action-button bottom-right" onClick={() => {
            setShownDisplay(distant);
          }}>
            <img className="button-icon" src={distantIcon} alt="View distant foxes" />
          </button>
        </>)
        : <>
          {info}
          {kindred}
          {distant}
        </>}
    </>
  );
}
