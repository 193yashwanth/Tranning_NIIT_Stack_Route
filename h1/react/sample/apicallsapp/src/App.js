import React from "react";
import PersonList from "./GetRequest";
import { PostRequest } from "./PostRequest";

class App extends React.Component {
  render() {
    return (
      <div>
        <h3 className="p-3 text-center">React HTTP GET Requests with axios</h3>
        <PersonList />
        <PostRequest />
      </div>
    );
  }
}
export { App };