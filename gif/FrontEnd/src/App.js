// //npm install styled-components
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/users/Login';
// import Registration from './components/users/Registration'; 
// import Dashboard from './components/Dashboard';
// import RecommendedGIFs from './components/gifs/RecommendedGifs';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Registration />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/recommendations" element={<RecommendedGIFs />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/users/Login";
import Registration from "./components/users/Registration"; // Import the Login component
import Dashboard from "./components/dashboard/Dashboard";
import { useState } from "react";

import UserProfile from "./components/users/Profile";
import UpdateProfile from "./components/users/ProfileUpdate";
import FavoriteGIFs from "./components/gifs/FavoriteGifs";
import RecommendedGIFs from "./components/gifs/RecommendedGifs";

const App = () => {
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  // console.log(loggedInUsername);

  const handleRegistration = (username) => {
    setLoggedInUsername(username);
  };

  const handleLogin = (username) => {
    setLoggedInUsername(username);
  };

  const handleLogout = () => {
    setLoggedInUsername(null);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="/register"
          element={<Registration handleRegistration={handleRegistration} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard loggedInUsername={loggedInUsername} />}
        />
        <Route
          path="/favorites"
          element={<FavoriteGIFs loggedInUsername={loggedInUsername} />}
        />
        <Route path="/recommended" element={<RecommendedGIFs />} />
        <Route
          path="/dashboard/profile"
          element={<UserProfile username={loggedInUsername} />}
        />
        <Route
          path="/dashboard/users/edit"
          element={<UpdateProfile initialUsername={loggedInUsername} />}
        />
      </Routes>
    </Router>
  );
};

export default App;