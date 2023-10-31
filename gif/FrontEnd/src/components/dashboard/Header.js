import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const history = useNavigate();
  const logout = () => {
    history("/");
  };

  return (
    <header>
      <h1>
        <Link style={{color:"white"}} to="/dashboard">_Giphy Galaxy</Link>
      </h1>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search GIFs by ID or Category"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <nav>
        <Link to="/recommended">Recommended</Link>
        <Link to="/favorites">favorites</Link>
        <Link to="/dashboard/profile">Profile</Link>
        <button onClick={logout}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;
