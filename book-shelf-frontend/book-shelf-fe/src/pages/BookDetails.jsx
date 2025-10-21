import React, { useEffect, useState } from "react";
import BookDetailCard from "../components/BookDetailCard";
import { useBookStore } from "../zu-store/bookShelfStore";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
export default function BookDetails() {
  const books = useBookStore((state) => state.books);
  const filteredData = useBookStore((state) => state.filteredData);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredBook, setFilteredBook] = useState({});

  useEffect(() => {
    try {
      setLoading(true);
      let storedBook = localStorage.getItem("selectedBook");
      if (storedBook) {
        setFilteredBook(JSON.parse(storedBook));
        return;
      }
      if (books.length !== 0 || filteredData.length !== 0) {
        let selectedBook =
          books.find((x) => x.id === Number(id)) ||
          filteredData.find((x) => x.id === Number(id));
        if (selectedBook) {
          setFilteredBook(selectedBook);
          console.log("Filterbook is", selectedBook);
          localStorage.setItem("selectedBook", JSON.stringify(selectedBook));
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
          <span>☸️ </span>Loading ...
        </p>
      )}
      <BookDetailCard book={filteredBook} />
      {console.log("Book detail of :", filteredBook)}
      <Outlet />
    </div>
  );
}
