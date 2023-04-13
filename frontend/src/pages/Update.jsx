import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const { bookId } = useParams();

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
      const response = await axios.put(
        `http://localhost:8800/books/${bookId}`,
        JSON.stringify(book),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response?.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  console.log(book);

  function handleChange(e) {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <form action="put" onSubmit={handleSubmit}>
      <h1>Update Book</h1>
      <section>
        <label htmlFor="title">Book Title &nbsp;</label>
        <input
          id="title"
          name="title"
          type="text"
          value={book.title}
          placeholder="title"
          onChange={handleChange}
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

      <button type="submit">Update</button>
    </form>
  );
};
export default Update;
