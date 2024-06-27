/* eslint-disable react/no-unknown-property */
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Vector2 } from "three";
import creativeImages from "../content/CreativeImages";
import DynamicImage from "./DynamicImage";

const Scene = () => {
  const [mousePosition, setMousePosition] = useState(new Vector2(0, 0));
  const cameraRef = useRef();

  const handleMouseMove = (event) => {
    const { innerWidth, innerHeight } = window;
    const x = (event.clientX / innerWidth) * 2 - 0.5; // Normalized to [-0.5, 0.5]
    const y = -(event.clientY / innerHeight) * 2 + 0.5; // Normalized to [-0.5, 0.5]
    setMousePosition(new Vector2(x, y));
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if (cameraRef.current) {
      const speedFactor = 0.05;
      cameraRef.current.position.x += mousePosition.x * speedFactor;
      cameraRef.current.position.y += mousePosition.y * speedFactor;
      cameraRef.current.position.z = 10; // Keep the camera at a fixed distance
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
            imageUrl={image.image}
            imagePosition={image.position}
            imageScale={image.scale ? image.scale : 1}
          />
        ))}
      </group>
    </>
  );
};

export default Scene;
