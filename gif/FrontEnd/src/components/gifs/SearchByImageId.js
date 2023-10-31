import React, { useState } from 'react';

const SearchByImageID = () => {
  const [imageID, setImageID] = useState('');
  const [image, setImage] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`API_ENDPOINT/gifs/${imageID}`);
      const data = await response.json();
      setImage(data);
    } catch (error) {
      console.error('Error fetching GIF by ID:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={imageID}
        onChange={(e) => setImageID(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {image && <img src={image.url} alt={image.title} />}
    </div>
  );
};

export default SearchByImageID;
