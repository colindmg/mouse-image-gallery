/* eslint-disable react/no-unknown-property */

import creativeImages from "../content/CreativeImages";
import DynamicImage from "./DynamicImage";

const Scene = () => {
  return (
    <>
      <ambientLight intensity={3} />
      <group>
        {creativeImages.map((image, index) => (
          <DynamicImage key={index} imageUrl={image.image} />
        ))}
      </group>
    </>
  );
};

export default Scene;
