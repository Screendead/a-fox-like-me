import "./AFoxLikeMe.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Fox } from "../../models/fox/Fox";
import { foximity } from "../../models/foximity";
import { Canvas } from "@react-three/fiber";
import { FoxPlanet } from "../../models/fox-planet/FoxPlanet";

export function AFoxLikeMe() {
  let { id } = useParams();

  const [fox, setFox] = useState<Fox | undefined>();
  // const [foximities, setFoximities] = useState<Foximity[]>([]);

  useEffect(() => {
    if (id) {
      try {
        let _f = foximity(parseInt(id));
        setFox(_f.find(f => f.fox.tokenId === parseInt(id!))?.fox);
        // setFoximities(_f);
      } catch (e) {
        console.log(e);
      }
    } else {
      setFox(undefined);
      // setFoximities([]);
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
      <div className="display">
        <div className="internalDisplay">
          <div className="heading">
            <img className="pfp" src="https://lh3.googleusercontent.com/64GLMX85SvN6lehNLg45wePcrBweBlgaRHe-LQh4XXcvdiy8bIGPfiSBw6ZBAbQpuN51ejH0-S2JMvDa9Ht-NFkHdmWvNiY-oAUx=w600" alt="pfp" />
            <span>
              <h2 className="component-title">LAGUNA LACUNA</h2>
              <h3 className="component-subtitle">#417</h3>
            </span>
          </div>
          <p>Philosophy: Stoic</p>
          <p>Speicies: Jester</p>
          <p>Virtue: Knack for accents</p>
          <p>Virtue: Good at swearing</p>
          <p>Virtue: Makes an increadible curry</p>
          <p>Baggage: Sanctimonious</p>
          <p>Baggage: Bad Speller</p>
          <p>Baggage: Always Late</p>
        </div>
      </div>
    </>
  );
}
