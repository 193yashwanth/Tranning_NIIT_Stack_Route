import React, { useState } from 'react';

const SearchAllGIFs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`API_ENDPOINT/search?query=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((gif) => (
          <li key={gif.id}>{gif.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchAllGIFs;
