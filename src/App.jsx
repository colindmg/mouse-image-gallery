/* eslint-disable react/no-unknown-property */
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

import creativeImages from "./content/CreativeImages";

function App() {
  const texture = useLoader(TextureLoader, creativeImages[0].image);

  return (
    <>
      <div className="h-screen w-screen relative bg-gray-100">
        <Canvas>
          <ambientLight intensity={3} />
          <mesh>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={texture} />
          </mesh>
        </Canvas>
      </div>
    </>
  );
}

export default App;
