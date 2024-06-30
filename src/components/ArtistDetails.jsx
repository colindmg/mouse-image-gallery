import PropTypes from "prop-types";

const ArtistDetails = ({ artistDetails, imageIndex }) => {
  return (
    artistDetails && (
      <>
        <div className="absolute top-20 left-20 flex flex-col gap-1 text-neutral-900">
          <p className="text-3xl font-bold tracking-wide">
            No.{imageIndex + 1}
          </p>
          <h2 className="text-3xl">{artistDetails.name}</h2>
        </div>
      </>
    )
  );
};

ArtistDetails.propTypes = {
  artistDetails: PropTypes.object,
  imageIndex: PropTypes.number,
};

export default ArtistDetails;
