import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ArtistDetails = ({ artistDetails, imageIndex }) => {
  const pVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5,
        duration: 0.7,
        ease: "easeOut",
      },
    },
    hidden: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const h2Variants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.7,
        duration: 0.7,
        ease: "easeOut",
      },
    },
    hidden: {
      opacity: 0,
      x: -70,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    artistDetails && (
      <>
        <div className="absolute top-20 left-20 flex flex-col gap-1 text-neutral-900">
          <motion.p
            className="text-3xl font-bold tracking-wide"
            initial="hidden"
            animate={imageIndex !== -1 ? "visible" : "hidden"}
            variants={pVariants}
          >
            No.{artistDetails.number}
          </motion.p>
          <motion.h2
            className="text-3xl"
            initial="hidden"
            animate={imageIndex !== -1 ? "visible" : "hidden"}
            variants={h2Variants}
          >
            {artistDetails.name}{" "}
          </motion.h2>
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
