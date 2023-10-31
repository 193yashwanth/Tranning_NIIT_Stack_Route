import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../dashboard/Header";

const FavoriteGIFs = (props) => {
  const [favoriteGIFs, setFavoriteGIFs] = useState([]);
  const [gifs, setGifs] = useState([]);
  const [gifToAdd, setGIFToAdd] = useState("");
  const username = props.loggedInUsername;

  // Function to retrieve favorite GIFs
  const fetchFavoriteGIFs = () => {
    axios
      .get(`http://127.0.0.1:5000/favourites/${username}`)
      .then((response) => {
        setFavoriteGIFs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching favorite GIFs:", error);
      });
  };

  // Function to add a GIF to favorites
  const addGIFToFavorites = () => {
    if (gifToAdd) {
      axios
        .post("http://127.0.0.1:5000/favourites/add", {
          gif_id: gifToAdd,
          username: username,
        })
        .then((response) => {
          console.log("GIF added to favorites:", response.data.message);
          // You can update the favorite GIFs list here.
          fetchFavoriteGIFs();
        })
        .catch((error) => {
          console.error("Error adding GIF to favorites:", error);
        });
    }
  };

  const handleDeleteFavorites = (gifId) => {
    axios
      .delete("http://127.0.0.1:5000/favourites/remove", {
        data: {
          gif_id: gifId,
          username: username,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("GIF removed from favorites:", response.data.message);
          // You can update the favorite GIFs list here.
          fetchFavoriteGIFs();
        } else {
          console.error(
            "Failed to remove GIF from favorites:",
            response.status,
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error removing GIF from favorites:", error);
      });
  };

  const handleCount = (gifId) => {
    const apiUrl = `http://127.0.0.1:5000/gifs/incrementCount/${gifId}`;

    axios
      .post(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          const updatedData = gifs.map((gif) => {
            if (gif.id === gifId) {
              return { ...gif, count: gif.count + 1 };
            }
            return gif;
          });

          setGifs(updatedData);

          console.log("Count incremented:", response.data);
        } else {
          throw new Error("Failed to increment count");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    // Fetch the user's favorite GIFs when the component mounts.
    fetchFavoriteGIFs();
  }, [username]);

  return (
    <div>
      <Header/>
      <h2>Favorite GIFs of {username}</h2>
      <div>
        <input
          type="text"
          placeholder="Enter GIF ID to add to favorites"
          value={gifToAdd}
          onChange={(e) => setGIFToAdd(e.target.value)}
        />
        <button onClick={addGIFToFavorites}>Add to Favorites</button>
      </div>
      <ul>
        {favoriteGIFs.map((gif) => (
          <li key={gif.id}>
            <img src={gif.url} alt={gif.title} />
            <p>{gif.title}</p>
            <div className="button m-3">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => handleDeleteFavorites(gif.id)}
              >
                Delete Favorites
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => handleCount(gif.id)}
              >
                Increment Count
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteGIFs;
