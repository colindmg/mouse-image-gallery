/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import ArtistDetails from "./components/ArtistDetails";
import Scene from "./components/Scene";
import creativeImages from "./content/CreativeImages";

function App() {
  // GESTION DE L'IMAGE/ARTISTE SÉLECTIONNÉ(E)
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const [selectedImageObject, setSelectedImageObject] = useState(null);

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
    if (index !== -1) {
      setSelectedImageObject(creativeImages[index]);
    }
  };

  return (
    <>
      <div className="h-screen w-screen relative bg-gray-100">
        <Canvas>
          <Scene onImageSelect={handleImageSelect} />
        </Canvas>

        {/* BLURRY SHAPES ON THE SIDES */}
        <img
          src="/shapes/leftblur.svg"
          alt="Blur Shapes"
          className="pointer-events-none fixed top-0 left-0 h-screen select-none"
        />
        <img
          src="/shapes/leftblur.svg"
          alt="Blur Shapes"
          className="pointer-events-none fixed top-0 right-0 h-screen rotate-180 select-none"
        />

        {/* ARTIST DETAILS */}
        <ArtistDetails
          artistDetails={selectedImageObject}
          imageIndex={selectedImageIndex}
        />
      </div>

      {/* <div className="h-screen w-screen bg-red-500"></div> */}
    </>
  );
}

export default App;
