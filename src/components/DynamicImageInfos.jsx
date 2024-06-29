import { Text } from "@react-three/drei";
import PropTypes from "prop-types";

const DynamicImageInfos = ({ twitter, position, imageScale, isVisible }) => {
  return (
    <Text
      color="black"
      fontSize={0.2}
      position={[
        position[0] + 0.5 * imageScale,
        position[1] - 1.7 * imageScale,
        position[2],
      ]}
      fillOpacity={isVisible ? 1 : 0}
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
