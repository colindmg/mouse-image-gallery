import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

const ArtistCreationImage = ({ sourceUrl, blurHash, altText }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = sourceUrl;
  }, [sourceUrl]);

  return (
    <div className="relative h-[350px] overflow-hidden">
      {/* IMAGE BLURRED EN ATTENDANT LE CHARGEMENT */}
      <div
        className="absolute w-full h-full top-0 left-0"
        style={{ display: isLoaded ? "none" : "block" }}
      >
        <Blurhash
          hash={blurHash}
          width="100%"
          height="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      </div>

      {/* IMAGE CHARGÉE */}
      <img
        src={sourceUrl}
        alt={altText}
        className="object-cover w-full h-full object-center scale-110 hover:scale-100 transition-transform duration-300 ease-in-out"
      />
    </div>
  );
};

ArtistCreationImage.propTypes = {
  sourceUrl: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  blurHash: PropTypes.string.isRequired,
};

export default ArtistCreationImage;
