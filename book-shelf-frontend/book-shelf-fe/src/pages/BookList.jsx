import { useEffect, useState } from "react";
import { useBookStore } from "../zu-store/bookShelfStore";
import getBooks from "../Services/BooksService";
import { Tile } from "../components/BookTile";

function BookList() {
  const books = useBookStore((state) => state.books);
  const setBooks = useBookStore((state) => state.setBooks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        let response = await getBooks();
        setBooks(response);
      } catch (error) {
        setError("No books found");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [setBooks]);

  return (
    <div className="flex flex-col justify-center ">
      <h2 className="text-2xl">Books</h2>
      <div >
        {loading && <p>Data Loading</p>}
       <div className="flex flex-wrap gap-2 justify-center">
         {books.map((b) => (
          <div key={b.id}>{<Tile book={b} />}</div>
        ))}
       </div>
      </div>
    </div>
  );
}

export default BookList;
