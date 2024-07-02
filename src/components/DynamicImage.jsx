/* eslint-disable react/no-unknown-property */
import { useFrame, useLoader } from "@react-three/fiber";
import { animate, useMotionValue, useSpring } from "framer-motion";
import { motion } from "framer-motion-3d";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";
import DynamicImageInfos from "./DynamicImageInfos";

const vertexShader = `
  varying vec2 vUv;
  uniform vec2 uDelta;
  float PI = 3.141592653589793238;

  void main() {
    vUv = uv;
    vec3 newPosition = position;
    newPosition.x += sin(uv.y * PI) * uDelta.x * 0.1;
    newPosition.y += sin(uv.x * PI) * uDelta.y * 0.1;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
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
  camera,
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
    uDelta: { value: { x: 0, y: 0 } },
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

  // ANIMATION DE COURBURE DE L'IMAGE
  const uDeltaX = useSpring(0, { stiffness: 100, damping: 30 });
  const uDeltaY = useSpring(0, { stiffness: 100, damping: 30 });

  useFrame(() => {
    if (camera) {
      const cameraX = camera.current.position.x;
      const cameraY = camera.current.position.y;

      uDeltaX.set(-1 * (imageObject.position[0] - cameraX));
      uDeltaY.set(-1 * (imageObject.position[1] - cameraY));

      uniforms.current.uDelta.value = {
        x: uDeltaX.get(),
        y: uDeltaY.get(),
      };
    } else {
      uDeltaX.set(0);
      uDeltaY.set(0);

      uniforms.current.uDelta.value = {
        x: uDeltaX.get(),
        y: uDeltaY.get(),
      };
    }
  });

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
        <planeGeometry args={[dimensions.width, dimensions.height, 10, 10]} />
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
  camera: PropTypes.object || null,
};

export default DynamicImage;
