import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext'; // Assume you have an AuthContext for authentication

const RecommendedGIFs = () => {
  const [recommendations, setRecommendations] = useState([]);
  const { user } = useContext(AuthContext);

  const handleRecommendations = async () => {
    try {
      const response = await fetch(`API_ENDPOINT/users/${user.id}/recommendations`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div>
      <button onClick={handleRecommendations}>View Recommendations</button>
      <ul>
        {recommendations.map((gif) => (
          <li key={gif.id}>
            <img src={gif.url} alt={gif.title} />
            <p>{gif.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedGIFs;
