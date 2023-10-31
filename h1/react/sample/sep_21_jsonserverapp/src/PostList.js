import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

class PostList extends Component {
    state = {
        posts: [],
    };
    componentDidMount() {
        axios.get("http://localhost:3001/posts")
            .then((response) => {
                this.setState({posts: response.data});
        })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }
    render() {
        const { posts } = this.state;
        return(
            <div>
                <h1>posts</h1>
                <ul>
                    {posts.map((post) =>(
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            </div>
        );
    }
}
export default PostList;