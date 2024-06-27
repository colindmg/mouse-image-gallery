/* eslint-disable react/no-unknown-property */

import creativeImages from "../content/CreativeImages";
import DynamicImage from "./DynamicImage";

const Scene = () => {
  return (
    <>
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
