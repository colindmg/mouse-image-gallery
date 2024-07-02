/* eslint-disable react/no-unknown-property */
import { useLoader } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";
import DynamicImageInfos from "./DynamicImageInfos";

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
  uniform float uOpacity;

  void main() {
    vec3 texture = texture2D(uTexture, vUv).rgb;
    gl_FragColor = vec4(texture, uOpacity);
  }
`;

const DynamicImage = ({
  imageObject,
  isTransparent,
  imageIndex,
  selectedImageIndex,
  setSelectedImageIndex,
}) => {
  // CHARGEMENT DE L'IMAGE ET DE SES DIMENSIONS
  const texture = useLoader(TextureLoader, imageObject.image);
  const [dimensions, setDimensions] = useState({ width: 3, height: 3 });

  useEffect(() => {
    const img = new Image();
    img.src = imageObject.image;
    img.onload = () => {
      setDimensions({ width: (img.width * 3) / img.height, height: 3 });
    };
  }, [imageObject.image]);

  // ANIMATION DU SHADER
  const mesh = useRef();
  const uniforms = useRef({
    uTexture: { value: texture },
    uOpacity: { value: 1 },
  });
  const opacity = useMotionValue(1);

  // ANIMATION DE L'OPACITÉ
  useEffect(() => {
    if (!isTransparent) {
      animate(opacity, 1, {
        duration: 0.5,
        delay: 0.03 * imageIndex,
        ease: "easeOut",
        onUpdate: (progress) =>
          (mesh.current.material.uniforms.uOpacity.value = progress),
      });
    } else {
      animate(opacity, 0, {
        duration: 0.5,
        delay: 0.03 * imageIndex,
        ease: "easeOut",
        onUpdate: (progress) =>
          (mesh.current.material.uniforms.uOpacity.value = progress),
      });
    }
  }, [isTransparent, imageIndex, opacity]);

  return (
    <>
      <motion.mesh
        ref={mesh}
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
        <planeGeometry args={[dimensions.width, dimensions.height, 15, 15]} />
        <motion.shaderMaterial
          uniforms={uniforms.current}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
        />
        {/* <motion.meshBasicMaterial
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
        /> */}
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
