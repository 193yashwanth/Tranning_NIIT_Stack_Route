import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext'; // Assume you have an AuthContext for authentication

const FavoriteGIFs = () => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);

  const handleAddToFavorites = async (gifID) => {
    try {
      const response = await fetch(`API_ENDPOINT/users/${user.id}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ gifID }),
      });
      if (response.ok) {
        setFavorites([...favorites, gifID]);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const handleViewFavorites = async () => {
    try {
      const response = await fetch(`API_ENDPOINT/users/${user.id}/favorites`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      setFavorites(data.favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  return (
    <div>
      <button onClick={handleViewFavorites}>View Favorites</button>
      <ul>
        {favorites.map((gifID) => (
          <li key={gifID}>{/* Display GIF details here */}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteGIFs;
