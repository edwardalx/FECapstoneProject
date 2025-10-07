import React, { useEffect, useState } from "react";
import BookDetailCard from "../components/BookDetailCard";
import { useBookStore } from "../zu-store/bookShelfStore";
import { useParams } from "react-router-dom";
export default function BookDetails() {
  const books = useBookStore((state) => state.books);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredBook, setFilteredBook] = useState({});

  useEffect(() => {
    try {
      setLoading(true);
      const storedBook = localStorage.getItem("selectedBook");
      if ((!storedBook || storedBook === "{}") && books.length === 0) {
        setError("No books in store");
      }
      if (books.length === 0) {
        setFilteredBook(JSON.parse(storedBook));
      } else {
        if (books.length !== 0) {
          let selectedBook = books.find((x) => x.id === Number(id));
          setFilteredBook(selectedBook);
          console.log("Filterbook is", Object.keys(filteredBook).length !==0? filteredBook:selectedBook);
          localStorage.setItem(
            "selectedBook",
            JSON.stringify(selectedBook ? selectedBook : filteredBook)
          );
        }
      }
    } catch (error) {
      setError("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id, books]);

  return (
    <div>
      {error && <p className="text-red-600">❗{error}</p>}
      {loading && (
        <p className="text-green-600">
          {" "}
          <span>☸️ </span>Loading ...{" "}
        </p>
      )}
      <BookDetailCard book={filteredBook} />
      {console.log("Book detail of :", filteredBook)}
    </div>
  );
}
