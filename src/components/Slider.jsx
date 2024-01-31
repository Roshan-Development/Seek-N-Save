import React, { useState } from 'react';

const Slider = ({ imageData }) => {
    const {imgUrls} = imageData.data()
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageData.length);
  };

  const goToPrevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageData.length) % imageData.length
    );
  };

  return (
    <div className="slider-container">
      <div className="slider-image">
        <img
          src={imageData[currentIndex].imageUrl}
          alt={imageData[currentIndex].altText}
        />
      </div>
      <div className="slider-buttons">
        <button onClick={goToPrevImage} disabled={currentIndex === 0}>
          Previous
        </button>
        <button onClick={goToNextImage} disabled={currentIndex === imageData.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Slider;
