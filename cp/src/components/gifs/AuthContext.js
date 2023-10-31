import React, { useState } from 'react';

// Component for adding GIFs to favorites
const FavoriteGIFs = () => {
  const [favorites, setFavorites] = useState([]);

  const handleAddToFavorites = (gifID) => {
    // Assuming you have a way to get the gifID, add it to favorites list
    setFavorites([...favorites, gifID]);
  };

  return (
    <div>
      <button onClick={() => handleAddToFavorites('gif123')}>Add to Favorites</button>
      <ul>
        {favorites.map((gifID, index) => (
          <li key={index}>GIF ID: {gifID}</li>
        ))}
      </ul>
    </div>
  );
};

// Component for viewing favorites
const ViewFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((gifID, index) => (
          <li key={index}>GIF ID: {gifID}</li>
        ))}
      </ul>
    </div>
  );
};

export { FavoriteGIFs, ViewFavorites };
