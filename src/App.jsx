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

        {/* BLURRY SHAPES ON THE SIDES */}
        <img
          src="/shapes/leftblur.svg"
          alt="Blur Shapes"
          className="pointer-events-none fixed top-0 left-0 h-screen"
        />
        <img
          src="/shapes/leftblur.svg"
          alt="Blur Shapes"
          className="pointer-events-none fixed top-0 right-0 h-screen rotate-180"
        />
      </div>
    </>
  );
}

export default App;
