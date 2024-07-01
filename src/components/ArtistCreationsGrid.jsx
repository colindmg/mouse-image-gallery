import PropTypes from "prop-types";
import ArtistCreationImage from "./ArtistCreationImage";

const ArtistCreationsGrid = ({ artistName, gallery }) => {
  return (
    <div
      id="artist-gallery"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-screen max-[520px]:hidden"
    >
      {gallery.map((image, index) => (
        // <div key={image} className="h-[350px] overflow-hidden">
        //   <img
        //     src={image}
        //     alt={artistName + " - Image n°" + (index + 1)}
        //     className="object-cover w-full h-full object-center scale-110 hover:scale-100 transition-transform duration-300 ease-in-out"
        //   />
        // </div>
        <ArtistCreationImage
          key={image}
          sourceUrl={image.imgSrc ? image.imgSrc : image}
          blurHash={image.blurHash}
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
