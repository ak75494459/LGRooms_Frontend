import { useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";

type Props = {
  imageUrl: string[];
};

const AspectRatioPublicImage = ({ imageUrl }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!imageUrl || imageUrl.length === 0) {
    return <p>No images available</p>;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrl.length);
    console.log(
      "Current Index:",
      currentIndex,
      "Image URL:",
      imageUrl[currentIndex]
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrl.length - 1 : prevIndex - 1
    );
    console.log(
      "Current Index:",
      currentIndex,
      "Image URL:",
      imageUrl[currentIndex]
    );
  };

  return (
    <div className="p-3 bg-gray-100">
      {/* Image Display */}
      <div className="relative">
        <AspectRatio ratio={16 / 9} >
          <img
            src={imageUrl[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="rounded-md object-cover h-full w-full "
          />
        </AspectRatio>

        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-black"
        >
          ◀
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-black"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default AspectRatioPublicImage;
