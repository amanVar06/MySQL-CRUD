import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Books = () => {
  const [books, setBooks] = useState([]);

  const effectRan = useRef(false);

  useEffect(() => {
    console.log("mounted");
    if (effectRan.current === true) {
      const fetchAllBooks = async () => {
        try {
          const response = await axios.get("http://localhost:8800/books", {
            headers: {
              "Content-Type": "application/json",
            },
          });

          console.log(response?.data);
          return response?.data?.data;
        } catch (err) {
          console.log(err);
        }
      };

      fetchAllBooks()
        .then((books) => setBooks(books))
        .catch((err) => console.log(err));
    }

    return () => {
      console.log("Unmounted");
      console.log("Already Ran Once, in clean up function");
      effectRan.current = true;
    };
  }, []);

  async function handleDelete(bookId) {
    try {
      const response = await axios.delete(
        `http://localhost:8800/books/${bookId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response?.data?.message);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <article>
      <h1>Aman Book Shop</h1>
      <div className="books">
        {books.length ? (
          books.map((book) => (
            <div className="book" key={book.id}>
              {book.cover && (
                <img
                  loading="lazy"
                  width={250}
                  height={250}
                  src={book.cover}
                  alt={book.title}
                />
              )}
              <h2 className="no-wrap">{book?.title} </h2>
              <p>{book?.desc}</p>
              <p>{book?.price}</p>
              <div className="btn-group">
                <button
                  className="delete"
                  type="button"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
                <button className="update" type="button">
                  <Link to={`update/${book.id}`}>Update</Link>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No Books Now</p>
        )}
      </div>

      <Link to="add">
        <button className="add-new-btn" type="button">
          Add New Book
        </button>
      </Link>
    </article>
  );
};
export default Books;
