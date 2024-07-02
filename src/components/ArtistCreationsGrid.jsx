// IMAGE GRID USED IN THE ARTIST DETAILS VIEW

import PropTypes from "prop-types";
import ArtistCreationImage from "./ArtistCreationImage";

const ArtistCreationsGrid = ({ artistName, gallery }) => {
  return (
    <div
      id="artist-gallery"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-screen max-[520px]:hidden"
    >
      {gallery.map((image, index) => (
        <ArtistCreationImage
          key={artistName + " - Image n°" + (index + 1)}
          sourceUrl={image.imgSrc ? image.imgSrc : image}
          blurHash={image.blurHash ? image.blurHash : ""}
          altText={artistName + " - Image n°" + (index + 1)}
        />
      ))}
    </div>
  );
};

ArtistCreationsGrid.propTypes = {
  artistName: PropTypes.string.isRequired,
  gallery: PropTypes.array.isRequired,
};
export default ArtistCreationsGrid;
