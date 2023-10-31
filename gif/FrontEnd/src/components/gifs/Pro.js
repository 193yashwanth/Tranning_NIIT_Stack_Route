import React, { useState, useContext } from 'react';
import axios from 'axios'; // Import Axios
import { AuthContext } from './AuthContext'; // Assume you have an AuthContext for authentication

const FavoriteGIFs = () => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);

  const handleAddToFavorites = async (gifID) => {
    try {
      const data = {
        user_id: user.id,
        gif_id: gifID,
      };

      const response = await axios.post('http://127.0.0.1:5000/favourites/add', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setFavorites([...favorites, gifID]);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const handleViewFavorites = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/favourites/${user.id}`);

      setFavorites(response.data.favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  return (
    <div>
     
    </div>
  );
};

export default FavoriteGIFs;