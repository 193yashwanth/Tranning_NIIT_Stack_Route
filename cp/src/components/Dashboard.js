import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Featch_Gif from './gifs/Featch_Gif'

const Dashboard = () => {
  const history = useNavigate();

  const logout = () => {
    history("/");
  };

  return (
    <div>
      <header>
        <h1>_Giphy Galaxy</h1>
        <nav>
          <Link to="/profile">Profile</Link>
          <Link to="/favorites">favorites</Link>
          <Link to="/recommendations">Recommendations</Link>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>
      <Featch_Gif/>
    </div>
  );
};

export default Dashboard;
