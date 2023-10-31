import React, { useEffect, useState } from "react";

const Book = () => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    featch
      .get("http://127.0.0.1:5000/book")
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
      });
  }, []);

  return (
    <div>
      <h1>Books</h1>
      <div className="container">
        {book.map((ask) => (
          <ul key={ask.id}>
            <li>{ask.title}</li>
            <li>{ask.author}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Book;
