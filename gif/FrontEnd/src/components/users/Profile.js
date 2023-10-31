import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import Header from "../dashboard/Header";

const UserProfile = ({ username }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/users/${username}`, {
        method: "DELETE",
      });
      const data = await response.json();
      alert(data.message);
      history("/");
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setUserData(data.user);
        } else {
          console.log("User not found");
        }
        setLoading(false);
      })
      .catch((error) => console.error("Error:", error));
  }, [username]);

  if (loading) {
    return (
      <div>
        <Header />
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Header/>
      {userData ? (
        <div>
          <Header />
          <h2>User Profile</h2>
          <p>Username: {userData.username}</p>
          <img
            src={`http://127.0.0.1:5000/uploads/${userData.profile_picture}`}
            alt="Profile"
            style={{ width: "100px", height: "100px" }}
          />
          <br></br>
          <Link to="/dashboard/users/edit">edit account</Link>
          <br></br>
          <button onClick={handleDelete}>Delete Account</button>
        </div>
      ) : (
        <div>User not found</div>
      )}
    </div>
  );
};

export default UserProfile;
