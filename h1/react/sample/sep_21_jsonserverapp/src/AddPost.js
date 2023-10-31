import React, { Component, useEffect, useState } from "react";

const refresh = () => window.location.reload(true);

class AddPost extends Component {
  state = {
    title: "",
  };
  handleChange = (e) =>{
    this.setState({title: e.target.value})
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const { title } = this.state;
    // send POST request to the JSON server to create a new post
    fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((response) => response.json())
      .then((newPost) => {
        //Handle the new post data, e.g., update state or display a success message
        console.log("NEW post:", newPost);

        // Clear the input filed
        this.setState({ title: "" });
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
    // window.location.reload(true);
  };
  render() {
    const { title } = this.state;
    return (
      <div>
        <h2>Add a new Post</h2>
        <form on onSubmit={this.handleSubmit}>
          <div>
            <label>Title:</label>
            <input type="text" value={title} onChange={this.handleChange} />
          </div>
          <button type="submit" onClick={refresh}>
            Add Post
          </button>
        </form>
      </div>
    );
  }
}
export default AddPost;
