/* eslint-disable react/no-unknown-property */
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Vector2 } from "three";
import creativeImages from "../content/CreativeImages";
import DynamicImage from "./DynamicImage";

const Scene = () => {
  // IMAGE SÉLECTIONNÉE
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);

  // GESTION DES MOUVEMENTS DE LA CAMÉRA EN FONCTION DE LA POSITION DE LA SOURIS
  const [mousePosition, setMousePosition] = useState(new Vector2(0, 0));
  const cameraRef = useRef();

  const handleMouseMove = (event) => {
    const { innerWidth, innerHeight } = window;
    const x = (event.clientX / innerWidth) * 2 - 1;
    const y = -((event.clientY / innerHeight) * 2 - 1);
    // console.log(x, y);
    setMousePosition(new Vector2(x, y));
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // GESTION DU MOUVEMENT DE LA CAMÉRA QUAND UNE IMAGE EST SÉLECTIONNÉE
  const zoomZ = 8;

  // USE FRAME D'ANIMATION DE LA CAMÉRA
  useFrame(() => {
    if (cameraRef.current) {
      // Si aucune image n'est sélectionnée
      if (selectedImageIndex === -1) {
        const speedFactor = 0.05;
        cameraRef.current.position.x += mousePosition.x * speedFactor;
        cameraRef.current.position.y += mousePosition.y * speedFactor;

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

export default Scene;
