/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";

import Scene from "./components/Scene";

function App() {
  return (
    <>
      <div className="h-screen w-screen relative bg-gray-100">
        <Canvas>
          <Scene />
        </Canvas>
      </div>
    </>
  );
}

export default App;
