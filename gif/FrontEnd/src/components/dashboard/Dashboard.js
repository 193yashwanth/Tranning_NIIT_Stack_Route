// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Dashboard.css";
// import Footer from "./Footer";
// import Featch_Gif from "./gifs/Featch_Gif";

// const Search_Gif = ({ searchQuery }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchGifs = async () => {
//       if (typeof searchQuery === "string" && searchQuery.trim() !== "") {
//         setLoading(true);
//         try {
//           const results = await axios.get(
//             `http://127.0.0.1:5000/gifs/${searchQuery}`
//           );
//           setData(results.data);
//           setLoading(false);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//           setLoading(false);
//         }
//       } else {
//         setData([]);
//       }
//     };
// console.log(data);
//     fetchGifs();
//   }, [searchQuery]);

//   const renderGifs = () => {
//     if (loading) {
//       return <p>Loading...</p>;
//     }

//     if (!Array.isArray(data)) {
//       return <p>Data is not in the expected format.</p>;
//     }

//     if (data.length === 0) {
//       return <p>No results found.</p>;
//     }

//     return data.map((gif) => (
//       <div key={gif.id} className="gif">
//         <div className="card" style={{ width: "18rem" }}>
//           <img src={gif.url} className="card-img-top" alt="gif" />
//           <div className="button m-3">
//             <button type="button" className="btn btn-outline-danger">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 fill="currentColor"
//                 className="bi bi-heart"
//                 viewBox="0 0 16 16"
//               >
//                 <path d="M8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.920 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.060.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
//               </svg>
//             </button>
//             <button type="button" className="btn btn-outline-secondary">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 fill="currentColor"
//                 className="bi bi-arrow-up-circle"
//                 viewBox="0 0 16 16"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     ));
//   };

//   return <div>{renderGifs()}</div>;
// };

// const Dashboard = () => {
//   const [searchValue, setSearchValue] = useState("");
//   const history = useNavigate();
//   const logout = () => {
//     history("/");
//   };

//   return (
//     <div>
//       <header>
//         <h1>_Giphy Galaxy</h1>
//         <form className="d-flex">
//           <input
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             className="form-control me-2"
//             type="search"
//             placeholder="Search"
//             aria-label="Search"
//           />
//           <button
//             className="btn btn-outline-success"
//             type="submit"
//             //   onClick={() => setQuery(searchValue)}
//           >
//             Search
//           </button>
//         </form>
//         <nav>
//           <Link to="/profile">Profile</Link>
//           <Link to="/favorites">Favorites</Link>
//           <Link to="/recommendations">Recommendations</Link>
//           <button onClick={logout}>Logout</button>
//         </nav>
//       </header>
//       {/* <Search_Gif searchQuery={searchValue} /> */}
//       <br />
//       <Featch_Gif/>
//       {/* <Footer/> */}
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./Dashboard.css";
import axios from "axios";
import Footer from "../Footer";

const Dashboard = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [gifs, setGifs] = useState([]);
  const [showAllGifs, setShowAllGifs] = useState(true);
  const [favoriteMessage, setFavoriteMessage] = useState("");
    // console.log(props.loggedInUsername);
    // console.log(props);
    const name = props.loggedInUsername

  const handleSearch = async () => {
    if (searchQuery) {
      const response = await fetch(
        `http://127.0.0.1:5000/gifs/${searchQuery}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (!data.message) {
        const gifsArray = Array.isArray(data) ? data : [data];
        setGifs(gifsArray);
        setShowAllGifs(false);
      } else {
        setGifs([]);
      }
    }
  };

  useEffect(() => {
    const fetchAllGifs = async () => {
      const response = await fetch("http://127.0.0.1:5000/gifs", {
        method: "GET",
      });
      const data = await response.json();
      setGifs(data);
    };
    fetchAllGifs();
  }, []);


  

  const handleAddToFavorites = (gifId) => {
    const apiUrl = "http://127.0.0.1:5000/favourites/add";

    const requestData = {
      gif_id: gifId,
      username: name, // Assuming 'name' contains the username
    };

    axios
      .post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json", // Specify the headers object correctly
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setFavoriteMessage("GIF added to favorites!");
        } else {
          console.log(
            "Failed to add GIF to favorites. Server response:",
            response.status,
            response.data
          );
          setFavoriteMessage("Failed to add GIF to favorites.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setFavoriteMessage("Failed to add GIF to favorites.");
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

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <div className="gif-container">
        {showAllGifs
          ? gifs.map((gif) => (
              <div key={gif.id} className="gif-card">
                <img src={gif.url} alt={gif.title} />
                <div className="button m-3">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleAddToFavorites(gif.id)}
                  >
                    Add to Favorites
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => handleCount(gif.id)}
                  >
                    Increment Count
                  </button>
                </div>
              </div>
            ))
          : gifs.map((gif) => (
              <div key={gif.id} className="gif-card">
                <img src={gif.url} alt={gif.title} />
                <div className="button m-3">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleAddToFavorites(gif.id)}
                  >
                    Add to Favorites
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => handleCount(gif.id)}
                  >
                    Increment Count
                  </button>
                </div>
              </div>
            ))}
      </div>
      <Footer/>
    </div>
  );
};

export default Dashboard;
