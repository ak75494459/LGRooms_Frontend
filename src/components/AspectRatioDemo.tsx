import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";

type Props = {
  imageUrl: string[]; 
};

export function AspectRatioDemo({ imageUrl }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrl.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrl.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="p-3 bg-gray-50">
      {/* Image Display */}
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl[currentIndex]} // Access the current image correctly
            alt={`Image ${currentIndex + 1}`}
            className="rounded-md object-cover h-full w-full"
          />
        </AspectRatio>
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          ◀
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
