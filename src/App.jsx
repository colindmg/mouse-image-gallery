/* eslint-disable react/no-unknown-property */
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import ArtistCreationsGrid from "./components/ArtistCreationsGrid";
import ArtistDetails from "./components/ArtistDetails";
import Scene from "./components/Scene";
import creativeImages from "./content/CreativeImages";

function App() {
  // GESTION DE L'IMAGE/ARTISTE SÉLECTIONNÉ(E)
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const [selectedImageObject, setSelectedImageObject] = useState(null);

  useEffect(() => {
    if (selectedImageIndex !== -1) {
      setSelectedImageObject(creativeImages[selectedImageIndex]);
    }
  }, [selectedImageIndex]);

  // ACTIVE LE SCROLL LORSQUE UNE IMAGE AVEC UNE GALLERY EST SÉLECTIONNÉE
  useEffect(() => {
    if (
      selectedImageIndex !== -1 &&
      creativeImages[selectedImageIndex].gallery
    ) {
      document.body.style.overflowY = "auto";
    } else {
      document.body.style.overflowY = "hidden";
    }
  }, [selectedImageIndex]);

  return (
    <>
      <div className="h-screen w-screen relative bg-gray-100 max-[520px]:hidden">
        <Canvas>
          <Suspense fallback={null}>
            <Scene
              selectedImageIndex={selectedImageIndex}
              setSelectedImageIndex={setSelectedImageIndex}
            />
          </Suspense>
        </Canvas>
        <Loader
          containerStyles={{
            backgroundColor: "#f3f4f6",
            color: "#191919",
          }}
          barStyles={{
            background: "#191919",
            height: "2px",
            color: "#191919",
          }}
        />

        {/* BLURRY SHAPES ON THE SIDES */}
        <motion.img
          src="/shapes/leftblur.svg"
          alt="Blur Shapes"
          className="pointer-events-none fixed top-0 left-0 h-screen select-none"
          animate={{
            opacity: selectedImageIndex === -1 ? 1 : 0,
            transition: {
              duration: 0.5,
              delay: selectedImageIndex === -1 ? 0 : 0.5,
            },
          }}
        />
        <motion.img
          src="/shapes/leftblur.svg"
          alt="Blur Shapes"
          className="pointer-events-none fixed top-0 right-0 h-screen rotate-180 select-none"
          animate={{
            opacity: selectedImageIndex === -1 ? 1 : 0,
            transition: {
              duration: 0.5,
              delay: selectedImageIndex === -1 ? 0 : 0.5,
            },
          }}
        />

        {/* ARTIST DETAILS */}
        <ArtistDetails
          artistDetails={selectedImageObject}
          imageIndex={selectedImageIndex}
          setSelectedImageIndex={setSelectedImageIndex}
        />
      </div>

      {/* GALLERY D'IMAGES SI IL Y'EN A POUR L'ARTISTE SELECTIONNÉ */}
      {selectedImageIndex !== -1 &&
        creativeImages[selectedImageIndex].gallery && (
          <ArtistCreationsGrid
            artistName={creativeImages[selectedImageIndex].name}
            gallery={creativeImages[selectedImageIndex].gallery}
          />
        )}

      {/* MESSAGE POUR LES MOBILE */}
      <div className="fixed top-0 left-0 h-screen w-screen items-center justify-center hidden p-9 max-[520px]:flex bg-gray-100">
        <p className="text-sm uppercase text-neutral-900 text-center">
          Sorry, this demo is not available on mobile. Please use a desktop
        </p>
      </div>
    </>
  );
}

export default App;
