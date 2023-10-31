import React from "react";
const Login = () => (
  <div>
    <form style={{ display: "flex" }}>
      <div className="in">
        <label>
          Name:
          <input type="text" name="name" />
          Phone Number:
          <input type="number" name="phonenumber" />
          Email:
          <input type="text" name="email" />
        </label>
        <input type="submit" value={"submit"} />
      </div>
    </form>
  </div>
);
export default Login;
