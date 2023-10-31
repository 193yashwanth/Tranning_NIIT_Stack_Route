import React from "react";
import './Style1.css';
const Home = () => {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Welcome to my website</h1>
        <p>This is the home page of this website.</p>
        <form>
          <div className="in">
            <label>
              FirstName:
              <input type="text" name="firstname" />
            </label>
            <label>
              LastName:<input type="text" name="lastname"></input>{" "}
            </label>
            <label>
              Email:<input type="text" name="email"></input>{" "}
            </label>
            <label>
              Username:<input type="text" name="Username"></input>{" "}
            </label>
            <label>
              Password:<input type="text" name="Password"></input>{" "}
            </label>
            <input type="button" value={"submit"}></input>
          </div>
        </form>
      </div>
    );
};

export default Home;
