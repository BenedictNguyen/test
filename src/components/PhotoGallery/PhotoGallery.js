import React, { useState, useEffect } from 'react';
import '../PhotoGallery/PhotoGallery.css';

const ImageGallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isForward, setIsForward] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('https://676cffa90e299dd2ddfe11f1.mockapi.io/Tintucsukien')
      .then((response) => response.json())
      .then((data) => {
        setImages(data[0]?.images || []);
      })
      .catch((error) => console.error('Error fetching images:', error));
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        let newIndex;
        if (isForward) {
          newIndex = (prevIndex + 2) % images.length;
        } else {
          newIndex = (prevIndex - 2 + images.length) % images.length;
        }

        if (newIndex === 0 || newIndex === images.length - 1) {
          setIsForward(!isForward);
        }
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images.length, isForward]);

  return (
    <div className="photoGalleryContent">
      <h2 className="galleryTitle">Thư viện ảnh</h2>
      <div className="sliderContainer">
        <div className="imageSlider" style={{ transform: `translateX(-${(currentImageIndex * 100) / 5}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="sliderItem">
              <img src={image} alt={`Image ${index + 1}`} className="sliderImage" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;