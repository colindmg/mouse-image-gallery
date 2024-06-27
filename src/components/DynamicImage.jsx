/* eslint-disable react/no-unknown-property */
import { useLoader } from "@react-three/fiber";
import PropTypes from "prop-types";
import { TextureLoader } from "three";

const DynamicImage = ({ imageUrl }) => {
  const texture = useLoader(TextureLoader, imageUrl);

  return (
    <mesh>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

DynamicImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default DynamicImage;
