import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ handleLogin }) => {
  // <-- Added curly braces to destructure handleLogin
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const history = useNavigate();

  const handleSubmit = async (e) => {
    // <-- Changed handlesubmit to handleSubmit
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${formData.username}&password=${formData.password}`,
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        const loggedInUsername = formData.username;
        // console.log(formData.username);
        handleLogin(loggedInUsername);
        history("/dashboard");
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
        <p className="register-link">
          don't have an account? <Link to={"/register"}>Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
