import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../dashboard/Header";

const RecommendedGIFs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/gifs");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching GIF data:", error);
      }
    };

    fetchData();
  }, []);
  data.sort((a, b) => b.count - a.count);

  const handleCount = (gifId) => {
    const apiUrl = `http://127.0.0.1:5000/gifs/incrementCount/${gifId}`;

    axios
      .post(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          const updatedData = data.map((el) => {
            if (el.id === gifId) {
              return { ...el, count: el.count + 1 };
            }
            return el;
          });

          setData(updatedData);

          console.log("Count incremented:", response.data);
        } else {
          throw new Error("Failed to increment count");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const renderGIFs = () => {
    return data.map((el) => (
      <div key={el.id} className="gif">
        <div className="card" style={{ width: "18rem" }}>
          <img src={el.url} className="card-img-top" alt="gif" />
          <p>{el.title}</p>
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
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => handleCount(el.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
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
    <div>
      <Header/>
      <div className="gifs">{renderGIFs()}</div>
    </div>
  );
};

export default RecommendedGIFs;
