import React, { useEffect, useState } from 'react';
import leanImage from '../Assets/lean.jpg';

const DogPicture = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    setImageUrl(leanImage);
  }, []);

  return (
    <div>
      <img src={imageUrl} alt='event' />
    </div>
  );
};

export default DogPicture;
