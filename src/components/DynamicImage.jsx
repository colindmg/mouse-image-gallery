/* eslint-disable react/no-unknown-property */
import { useLoader } from "@react-three/fiber";
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

const DynamicImage = ({ imageUrl, imagePosition, imageScale }) => {
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
    <mesh
      position={imagePosition ? imagePosition : [0, 0, 0]}
      scale={imageScale}
    >
      <planeGeometry args={[dimensions.width, dimensions.height]} />
      <shaderMaterial
        uniforms={{ uTexture: { value: texture } }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
      {/* <meshBasicMaterial color={"red"} /> */}
    </mesh>
  );
};

DynamicImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imagePosition: PropTypes.array,
  imageScale: PropTypes.number,
};

export default DynamicImage;
