import React, { useState, useEffect } from 'react';
import './FadingCarousel.css'; // Create this CSS file for styling

const FadingCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 15000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div>
      {images.map((image, index) => (
        <div
          key={index}
          className={`carousel-image ${
            index === currentImageIndex ? 'visible' : ''
          }`}
        >
          <img src={image} alt={`Slide ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default FadingCarousel;
