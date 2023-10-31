import React, { useState } from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";

const Registration = ({ handleRegistration }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    profile_picture: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profile_picture: file,
    });
  };

  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("username", formData.username);
    form.append("password", formData.password);
    form.append("profile_picture", formData.profile_picture);

    try {
      const response = await fetch("http://127.0.0.1:5000/users/register", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Registration successful: " + data.message);
        const loggedInUsername = data.username;
        handleRegistration(loggedInUsername);
        history("/dashboard");
      } else {
        const data = await response.json();
        alert("Registration failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registration</h2>
        <input
          className="input-field"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
        />
        <input
          className="input-field"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <input
          className="input-field"
          type="file"
          name="profile_picture"
          onChange={handleFileChange}
        />
        <button className="button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
