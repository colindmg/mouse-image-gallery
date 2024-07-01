/* eslint-disable react/no-unknown-property */
import { useLoader } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { TextureLoader } from "three";
import DynamicImageInfos from "./DynamicImageInfos";

// const vertexShader = `
//   varying vec2 vUv;
//   void main() {
//     vUv = uv;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `;

// const fragmentShader = `
//   uniform sampler2D uTexture;
//   varying vec2 vUv;
//   void main() {
//     gl_FragColor = texture2D(uTexture, vUv);
//   }
// `;

const DynamicImage = ({
  imageObject,
  isTransparent,
  imageIndex,
  selectedImageIndex,
  setSelectedImageIndex,
}) => {
  const texture = useLoader(TextureLoader, imageObject.image);
  const [dimensions, setDimensions] = useState({ width: 3, height: 3 });

  useEffect(() => {
    const img = new Image();
    img.src = imageObject.image;
    img.onload = () => {
      setDimensions({ width: (img.width * 3) / img.height, height: 3 });
    };
  }, [imageObject.image]);

  return (
    <>
      <motion.mesh
        position={imageObject.position ? imageObject.position : [0, 0, 0]}
        scale={imageObject.scale ? imageObject.scale : 1}
        onPointerDown={() => {
          if (selectedImageIndex !== -1 && window.scrollY === 0) {
            setSelectedImageIndex(-1);
          } else {
            setSelectedImageIndex(imageIndex);
          }
        }}
        onPointerEnter={() => {
          if (selectedImageIndex === -1 || selectedImageIndex === imageIndex) {
            document.body.style.cursor = "pointer";
          }
        }}
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

      {/* INFORMATIONS SUR L'IMAGE */}
      <DynamicImageInfos
        twitter={imageObject.twitter}
        position={imageObject.position}
        imageScale={imageObject.scale ? imageObject.scale : 1}
        isVisible={selectedImageIndex === imageIndex}
      />
    </>
  );
};

DynamicImage.propTypes = {
  imageObject: PropTypes.object,
  isTransparent: PropTypes.bool,
  imageIndex: PropTypes.number,
  selectedImageIndex: PropTypes.number,
  setSelectedImageIndex: PropTypes.func,
};

export default DynamicImage;
