import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (books.trim() === "") {
      return;
    }

    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${books}`
        );
        setResults(response.data.items || []);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBooks();
  }, [books]);

  return (
    <>
      <h1>React Book Search</h1>
      <input
        type="text"
        placeholder="Search Books"
        value={books}
        onChange={(e) => setBooks(e.target.value)}
      />
      <h3>Search Results: {results.length}</h3>
      <ul className="card">
        {results.map((book, index) => (
          <li key={book.id}>
            {index + 1}: {book.volumeInfo.title}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
