import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from '../Login/Login';

const Featch_Gif = ({ searchQuery }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchGifs = async () => {
      if (typeof searchQuery === 'string' && searchQuery.trim() !== '') {
        try {
          const results = await axios.get('https://api.giphy.com/v1/gifs/search', {
            params: {
              api_key: 'LZOK9mitNhrrDlFM4sodGUGGKv0vOhWL',
              q: searchQuery,
            },
          });

          setData(results.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        // If the search query is not a valid string, clear the data
        setData([]);
      }
    };

    fetchGifs();
  }, [searchQuery]);

  const renderGifs = () => {
    if (data.length === 0) {
      return <p>No results found.</p>;
    }

    return data.map((el) => (
      <div key={el.id} className="gif">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={el.images.fixed_height.url}
            className="card-img-top"
            alt="gif"
          />
          <div className="button m-3">
            <button type="button" className="btn btn-outline-danger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path d="M8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.920 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.060.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
            </button>
            <button type="button" className="btn btn-outline-secondary">
              <svg
                xmlns="http://w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-up-circle"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="gifs">
      {renderGifs()}
    </div>
  );
};

function Navbar() {
  const [searchValue, setSearchValue] = useState('');
//   const [query, setQuery] = useState('')
//   console.log(query);

  return (
    <div>
      <Router>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" to="/">
              Gipher
            </a>
            <Link
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </Link>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    Link
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    Link
                  </Link>
                </li>
              </ul>
              <form className="d-flex">
                <input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success"
                  type="submit"
                //   onClick={() => setQuery(searchValue)}
                >
                  Search
                </button>
              </form>
              <form>
                <Link
                  className="btn btn-outline-success mx-2"
                  type="submit"
                  to="/Login"
                >
                  Login
                </Link>
              </form>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element="" />
        </Routes>
      </Router>
      <Featch_Gif searchQuery={searchValue} />
    </div>
  );
}

export default Navbar;
