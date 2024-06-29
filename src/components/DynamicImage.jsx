/* eslint-disable react/no-unknown-property */
import { useLoader } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { TextureLoader } from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  void main() {
    gl_FragColor = texture2D(uTexture, vUv);
  }
`;

const DynamicImage = ({
  imageUrl,
  imagePosition,
  imageScale,
  isTransparent,
  imageIndex,
  selectedImageIndex,
  setSelectedImageIndex,
}) => {
  const texture = useLoader(TextureLoader, imageUrl);
  const [dimensions, setDimensions] = useState({ width: 3, height: 3 });

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setDimensions({ width: (img.width * 3) / img.height, height: 3 });
    };
  }, [imageUrl]);

  return (
    <motion.mesh
      position={imagePosition ? imagePosition : [0, 0, 0]}
      scale={imageScale}
      onPointerDown={() => {
        selectedImageIndex !== -1
          ? setSelectedImageIndex(-1)
          : setSelectedImageIndex(imageIndex);
      }}
      onPointerEnter={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <planeGeometry args={[dimensions.width, dimensions.height]} />
      {/* <shaderMaterial
        uniforms={{ uTexture: { value: texture } }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      /> */}
      {/* <meshBasicMaterial color={"red"} /> */}
      <motion.meshBasicMaterial
        map={texture}
        transparent
        opacity={isTransparent ? 0 : 1}
        animate={{
          opacity: isTransparent ? 0 : 1,
          transition: {
            duration: 0.5,
            ease: "easeOut",
            delay: 0.03 * imageIndex,
          },
        }}
      />
    </motion.mesh>
  );
};

DynamicImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imagePosition: PropTypes.array,
  imageScale: PropTypes.number,
  isTransparent: PropTypes.bool,
  imageIndex: PropTypes.number,
  selectedImageIndex: PropTypes.number,
  setSelectedImageIndex: PropTypes.func,
};

export default DynamicImage;
