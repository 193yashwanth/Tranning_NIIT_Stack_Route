import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [action, setAction] = useState("Login Form");

  const handleLoginClick = () => {
    setAction("Login Form");
    setIsLogin(true);
  };

  const handleSignupClick = () => {
    setAction("Sign Up Form");
    setIsLogin(false);
  };

  // const handleSignupLinkClick = () => {
  //   setIsLogin(false);
  // };

  return (
    <div className="container">
      <div className="wrapper ">
        <div className="title-text">
          <div className={`title ${isLogin ? "login" : "signup"}`}>
            {action}
          </div>
          <div className={`title ${isLogin ? "signup" : "login"}`}>
            {action}
          </div>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input type="radio" name="slide" id="login" checked={isLogin} />
            <input type="radio" name="slide" id="signup" checked={!isLogin} />
            <label
              htmlFor="login"
              className="slide login"
              onClick={handleLoginClick}
            >
              Login
            </label>
            <label
              htmlFor="signup"
              className="slide signup"
              onClick={handleSignupClick}
            >
              Signup
            </label>
            <div className="slider-tab"></div>
          </div>
          <div className="form-inner">
            <form action="#" className={isLogin ? "login" : "signup"}>
              {action === "Login Form" ? (
                <div></div>
              ) : (
                <div className="field">
                  <input type="text" placeholder="Name" required />
                </div>
              )}
              <div className="field">
                <input type="text" placeholder="Email Address" required />
              </div>
              <div className="field">
                <input type="password" placeholder="Password" required />
              </div>
              {action === "Login Form" ? (
                <div></div>
              ) : (
                <div className="field">
                  <input type="text" placeholder="Conform Password" required />
                </div>
              )}
              {action === "Login Form" ? (
                <div className="pass-link">
                  <a href="#">Forgot password?</a>
                </div>
              ) : (
                <div></div>
              )}
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Login" />
              </div>
              {action === "Login Form" ? (
                <div className="signup-link">
                  Not a member? <a href="">Signup now</a>
                </div>
              ) : (
                <div></div>
              )}
            </form>
            <form action="#" className={isLogin ? "signup" : "login"}>
              <div className="field">
                <input type="text" placeholder="Email Address" required />
              </div>
              <div className="field">
                <input type="password" placeholder="Password" required />
              </div>
              <div className="field">
                <input
                  type="password"
                  placeholder="Confirm password"
                  required
                />
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Signup" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
