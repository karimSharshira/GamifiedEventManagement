import React, { useEffect, useState } from 'react';
import leanImage from '../Assets/Espace.jpg';

const Espace = () => {
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

export default Espace;
