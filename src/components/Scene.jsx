/* eslint-disable react/no-unknown-property */
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import PropTypes from "prop-types";
import { useRef } from "react";
import creativeImages from "../content/CreativeImages";
import useMouse from "../hooks/useMouse";
import DynamicImage from "./DynamicImage";

const Scene = ({ selectedImageIndex, setSelectedImageIndex }) => {
  // GESTION DES MOUVEMENTS DE LA CAMÉRA EN FONCTION DE LA POSITION DE LA SOURIS
  const cameraRef = useRef();
  const mouse = useMouse();

  // GESTION DU MOUVEMENT DE LA CAMÉRA QUAND UNE IMAGE EST SÉLECTIONNÉE
  const zoomZ = 7;

  // USE FRAME D'ANIMATION DE LA CAMÉRA
  useFrame(() => {
    if (cameraRef.current) {
      // Si aucune image n'est sélectionnée
      if (selectedImageIndex === -1) {
        const speedFactor = 0.05;
        cameraRef.current.position.x += mouse.x.get() * speedFactor;
        cameraRef.current.position.y += mouse.y.get() * speedFactor;

        if (cameraRef.current.position.z < 10) {
          cameraRef.current.position.z += 0.1;
        }
      } else {
        const image = creativeImages[selectedImageIndex];
        const speedFactor = 0.025;
        cameraRef.current.position.x +=
          (image.position[0] - cameraRef.current.position.x) * speedFactor;
        cameraRef.current.position.y +=
          (image.position[1] - cameraRef.current.position.y) * speedFactor;
        cameraRef.current.position.z +=
          (zoomZ - cameraRef.current.position.z) * speedFactor;
      }
    }
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 10]} />
      <ambientLight intensity={3} />
      <group>
        {creativeImages.map((image, index) => (
          <DynamicImage
            key={index}
            imageObject={image}
            isTransparent={
              selectedImageIndex !== -1 && selectedImageIndex !== index
            }
            imageIndex={index}
            selectedImageIndex={selectedImageIndex}
            setSelectedImageIndex={setSelectedImageIndex}
          />
        ))}
      </group>
    </>
  );
};

Scene.propTypes = {
  selectedImageIndex: PropTypes.number,
  setSelectedImageIndex: PropTypes.func,
};

export default Scene;
