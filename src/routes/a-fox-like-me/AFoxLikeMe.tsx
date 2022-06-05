import "./AFoxLikeMe.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Fox } from "../../models/fox/Fox";
import { Foximity } from "../../models/fox/Foximity";
import { foximity } from "../../models/foximity";
import { Canvas } from "@react-three/fiber";
import { Box } from "../../models/box";
import { CelestialVulpes } from "../../models/CelestialVulpes";

export function AFoxLikeMe() {
  let { id } = useParams();

  const [fox, setFox] = useState<Fox | undefined>();
  const [foximities, setFoximities] = useState<Foximity[]>([]);

  const [celestialVulpes, setCelestialVulpes] = useState<JSX.Element[]>([]);

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
    <div className="experience-container">
      <Canvas shadows camera={{
        fov: 30,
        near: 0.1,
        far: 1000,
        position: [0, 0, 25],
      }}>
        <directionalLight
          castShadow
          position={[10, 10, 10]}
          intensity={1} />
        <CelestialVulpes foxes={foximities} />
      </Canvas>
    </div>
  );
}
