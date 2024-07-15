// DETAILS AND BUTTONS APPEARING BESIDE THE IMAGE SELECTED

import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";
const sizes = ["XS", "S", "M", "L", "XL"];

const ArtistDetails = ({
  artistDetails,
  imageIndex,
  setSelectedImageIndex,
}) => {
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

  // GESTION DU CHOIX DE LA TAILLE (FICTIF)
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    artistDetails && (
      <>
        {/* NAME & NUMBER OF THE ARTIST */}
        <div className="absolute top-[13%] left-[7%] flex flex-col gap-1 text-neutral-900 pointer-events-none max-w-[300px]">
          <motion.p
            className="text-5xl font-bold font-[Impact] tracking-wide  text-balance"
            initial="hidden"
            animate={imageIndex !== -1 ? "visible" : "hidden"}
            variants={pVariants}
          >
            {artistDetails.name}
          </motion.p>
          <motion.h2
            className="text-lg text-neutral-600"
            initial="hidden"
            animate={imageIndex !== -1 ? "visible" : "hidden"}
            variants={h2Variants}
          >
            {artistDetails.price && artistDetails.price}
          </motion.h2>
        </div>

        {/* ARTIST DESCRIPTION */}
        {artistDetails.description && (
          <div className="absolute bottom-[13%] right-[7%] text-neutral-900 pointer-events-none">
            <p className="text-sm text-right text-balance w-56 max-lg:hidden">
              {artistDetails.description.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: imageIndex !== -1 ? 0 : 1 }}
                  animate={{ opacity: imageIndex === -1 ? 0 : 1 }}
                  transition={{
                    delay: imageIndex === -1 ? 0 : index * 0.1,
                    duration: 0.3,
                  }}
                >
                  {word + " "}
                </motion.span>
              ))}
            </p>
          </div>
        )}

        {/* CROSS TO CLOSE THE DETAILS AND GO BACK*/}
        <button
          onClick={() => {
            setSelectedImageIndex(-1);
          }}
        >
          <motion.img
            src="/icons/close.svg"
            alt="Cross"
            className="absolute top-[13%] right-[7%] w-10 cursor-pointer"
            initial={{ opacity: imageIndex !== -1 ? 0 : 1 }}
            animate={{ opacity: imageIndex === -1 ? 0 : 1 }}
            transition={{
              duration: imageIndex === -1 ? 0.5 : 0.8,
              delay: imageIndex === -1 ? 0 : 1,
            }}
          />
        </button>

        {/* CHEVRON DOWN IF THE ARTIST IS PROVIDED A GALLERY */}
        {artistDetails.gallery && (
          <a href="#artist-gallery">
            <motion.img
              src="/icons/chevron-down.svg"
              alt="Chevron Down"
              className="absolute bottom-[13%] left-[13%] w-10 bounce-animation"
              initial={{ opacity: imageIndex !== -1 ? 0 : 1 }}
              animate={{ opacity: imageIndex === -1 ? 0 : 1 }}
              transition={{
                duration: imageIndex === -1 ? 0.5 : 0.8,
                delay: imageIndex === -1 ? 0 : 1,
              }}
            />
          </a>
        )}

        {/* SIZE & ADD TO CART BUTTONS */}
        <div className="flex flex-col absolute bottom-[13%] left-[7%]">
          {/* SIZE BUTTONS */}
          <div className="flex gap-3">
            {sizes.map((size, index) => (
              <motion.button
                key={size}
                className={`text-sm ${
                  size === selectedSize
                    ? "text-neutral-900 font-semibold"
                    : "text-neutral-600"
                }`}
                initial={{ opacity: imageIndex !== -1 ? 0 : 1 }}
                animate={{ opacity: imageIndex === -1 ? 0 : 1 }}
                transition={{
                  duration: imageIndex === -1 ? 0.5 : 0.8,
                  delay: imageIndex === -1 ? 0 : index * 0.1 + 1,
                }}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </motion.button>
            ))}
          </div>
        </div>
      </>
    )
  );
};

ArtistDetails.propTypes = {
  artistDetails: PropTypes.object,
  imageIndex: PropTypes.number,
  setSelectedImageIndex: PropTypes.func,
};

export default ArtistDetails;
