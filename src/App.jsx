/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
      <div className="h-screen w-screen relative bg-gray-100">
        <Canvas>
          <Scene onImageSelect={handleImageSelect} />
        </Canvas>

        {/* BLURRY SHAPES ON THE SIDES */}
        <motion.img
          src="/shapes/leftblur.svg"
          alt="Blur Shapes"
          className="pointer-events-none fixed top-0 left-0 h-screen select-none"
          animate={{
            opacity: selectedImageIndex === -1 ? 1 : 0,
            transition: { duration: 0.5 },
          }}
        />
        <motion.img
          src="/shapes/leftblur.svg"
          alt="Blur Shapes"
          className="pointer-events-none fixed top-0 right-0 h-screen rotate-180 select-none"
          animate={{
            opacity: selectedImageIndex === -1 ? 1 : 0,
            transition: { duration: 0.5 },
          }}
        />

        {/* ARTIST DETAILS */}
        <ArtistDetails
          artistDetails={selectedImageObject}
          imageIndex={selectedImageIndex}
        />
      </div>

      {/* GALLERY D'IMAGES SI IL Y'EN A POUR L'ARTISTE SELECTIONNÉ */}
      {selectedImageIndex !== -1 &&
        creativeImages[selectedImageIndex].gallery && (
          <div
            id="artist-gallery"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-screen"
          >
            {creativeImages[selectedImageIndex].gallery.map((image, index) => (
              <div key={image} className="h-[350px] overflow-hidden">
                <img
                  src={image}
                  alt={
                    creativeImages[selectedImageIndex].name +
                    " - Image n°" +
                    (index + 1)
                  }
                  className="object-cover w-full h-full object-center scale-110 hover:scale-100 transition-transform cursor-pointer duration-300 ease-in-out"
                />
              </div>
            ))}
          </div>
        )}
    </>
  );
}

export default App;
