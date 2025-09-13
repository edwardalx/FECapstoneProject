import { useEffect } from "react";
import { useStore } from "../zu-store/bookShelfStore";

function BookList() {
  const books = useStore((state) => state.books);
  const fetchBooks = useStore((state) => state.fetchBooks);

  useEffect(() => {
    fetchBooks(); // load books on mount
  }, [fetchBooks]);

  return (
    <div>
      <h2>Books</h2>
      {books.map((b) => (
        <div key={b.id}>{b.title}</div>
      ))}
    </div>
  );
}

export default BookList;
