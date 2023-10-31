import React, { useState } from 'react';

const SearchByCategory = () => {
  const [category, setCategory] = useState('');
  const [categoryResults, setCategoryResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`API_ENDPOINT/search?category=${category}`);
      const data = await response.json();
      setCategoryResults(data.results);
    } catch (error) {
      console.error('Error fetching GIFs by category:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {categoryResults.map((gif) => (
          <li key={gif.id}>{gif.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchByCategory;
