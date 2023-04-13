import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: 0,
    cover: "",
  });

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (book.title && book.desc && book.price) {
        const response = await axios.post(
          "http://localhost:8800/books",
          JSON.stringify(book),
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log(response?.data);
        navigate("/");
      } else {
        console.log("complete all fields");
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(e) {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // console.log(book);
  return (
    <form action="post" onSubmit={handleSubmit}>
      <h1>Add New Books</h1>
      <section>
        <label htmlFor="title">Book Title &nbsp;</label>
        <input
          id="title"
          name="title"
          type="text"
          value={book.title}
          placeholder="title"
          onChange={handleChange}
          required
          minLength="5"
          maxLength="30"
          autoComplete="false"
        />
      </section>
      <section>
        <label htmlFor="desc">Book Description &nbsp;</label>
        <input
          id="desc"
          name="desc"
          type="text"
          value={book.desc}
          placeholder="Description"
          onChange={handleChange}
          required
          minLength="20"
          maxLength="100"
          autoComplete="false"
        />
      </section>
      <section>
        <label htmlFor="price">Book Price &nbsp;</label>
        <input
          id="price"
          name="price"
          type="number"
          value={book.price}
          placeholder="price"
          onChange={handleChange}
          required
        />
      </section>
      <section>
        <label htmlFor="cover">Upload Book Cover &nbsp;</label>
        <input
          id="cover"
          name="cover"
          type="file"
          accept="image/*"
          value={book.cover}
          onChange={handleChange}
        />
      </section>

      <button type="submit">Add</button>
    </form>
  );
};
export default Add;
