import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const DynamicImageInfos = ({ twitter, position, imageScale, isVisible }) => {
  const textRef = useRef(null);
  const [opacity, setOpacity] = useState(isVisible ? 1 : 0);

  // Mettre à jour l'opacité progressivement lorsque isVisible change
  useEffect(() => {
    if (isVisible) {
      let opacityValue = 0;
      const opacityIncrement = 0.1;
      const fadeInInterval = setInterval(() => {
        opacityValue += opacityIncrement;
        if (opacityValue >= 1) {
          opacityValue = 1;
          clearInterval(fadeInInterval);
        }
        setOpacity(opacityValue);
      }, 50);
      return () => clearInterval(fadeInInterval);
    } else {
      let opacityValue = 1;
      const opacityDecrement = 0.1;
      const fadeOutInterval = setInterval(() => {
        opacityValue -= opacityDecrement;
        if (opacityValue <= 0) {
          opacityValue = 0;
          clearInterval(fadeOutInterval);
        }
        setOpacity(opacityValue);
      }, 50);
      return () => clearInterval(fadeOutInterval);
    }
  }, [isVisible]);

  // Mettre à jour l'opacité du texte à chaque frame
  useFrame(() => {
    if (textRef.current) {
      textRef.current.material.opacity = opacity;
      textRef.current.needsUpdate = true;
    }
  });

  return (
    <Text
      ref={textRef}
      color="black"
      fontSize={0.2}
      position={[
        position[0] + 0.5 * imageScale,
        position[1] - 1.7 * imageScale,
        position[2],
      ]}
      fillOpacity={opacity}
    >
      {twitter}
    </Text>
  );
};

DynamicImageInfos.propTypes = {
  twitter: PropTypes.string,
  position: PropTypes.array,
  imageScale: PropTypes.number,
  isVisible: PropTypes.bool,
};

export default DynamicImageInfos;
