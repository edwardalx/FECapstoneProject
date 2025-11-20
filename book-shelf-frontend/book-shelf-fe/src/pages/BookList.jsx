import { useEffect, useState } from "react";
import { useBookStore } from "../zu-store/bookShelfStore";
import { getBooks, getPagedBooks, getByQuery } from "../Services/BooksService";
import { Tile } from "../components/bookTile";

function BookList() {
  const books = useBookStore((state) => state.books);
  const setBooks = useBookStore((state) => state.setBooks);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ getAll: "" }, { filtered: "" });
  const [resData, setResData] = useState({});
  const filteredData = useBookStore((state) => state.filteredData);
  const setFilteredData = useBookStore((state) => state.setFilteredData);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        let response = await getPagedBooks(page);
        setBooks(response.items);
        setResData(response);
      } catch (error) {
        setError({ getAll: "No books found" });
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [setBooks, page]);

  useEffect(() => {
    if (!filterValue) {
      setFilteredData([]); // Clear filtered data
      return;
    }
    getByQuery(filterValue)
      .then((data) => {
        setFilteredData(data.items);
        if (data.totalCount === 0) {
          setError({ filtered: "No search results" });
        } else {
          setError({ filtered: "" });
        }
      })

      .catch((e) => {
        console.warn("filter data error", e);
      });
  }, [filterValue]);

  return (
    <div className="flex flex-col justify-center py-10 px-4">
      <div className="font-thin w-full flex justify-center mb-4">
        <input
          type="text"
          className="border border-blue-300 rounded-full w-full max-w-md sm:max-w-lg text-white bg-[rgba(159,211,240,.3)] italic px-4 py-2"
          placeholder={`Search by Book Title...`}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value.trimStart())}
        />
      </div>
      <h2 className="text-2xl font-medium my-6 mt-4 text-center">BOOKS</h2>
      {filteredData.length !== 0 || error.filtered ? (
        <div>
          {error.filtered && <p className="text-red-600 text-center">{error.filtered}</p>}
          {loading && <p className="text-center">Data Loading...</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
            {filteredData.map((b) => (
              <div key={b.id} className="w-full">{<Tile book={b} />}</div>
            ))}
          </div>
        </div>
      ) : (
        !filterValue && (
          <div>
            {loading && <p className="text-center">Data Loading...</p>}
            {error.getAll && <p className="text-red-600 text-center">{error.getAll}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
              {books.map((b) => (
                <div key={b.id} className="w-full">{<Tile book={b} />}</div>
              ))}
            </div>
          </div>
        )
      )}
      {filteredData.length === 0 && !error.filtered && (
        <div className="flex flex-col sm:flex-row justify-between items-center text-yellow-300 text-sm my-4 font-bold gap-3">
          <div
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
            className={`cursor-pointer transition-all duration-300 ${page === 1 ? "text-purple-300" : ""}`}
          >
            Previous
          </div>
          <div className="text-[rgba(180,15,117,1)]">
            Page {resData.pageNumber || 0} of {resData.totalPages || 0}
          </div>
          <div
            onClick={() => {
              if (page < resData.totalPages) {
                setPage(page + 1);
              }
            }}
            className={`cursor-pointer transition-all duration-300 ${page === resData.totalPages ? "text-purple-300" : ""}`}
          >
            Next
          </div>
        </div>
      )}
    </div>
  );
}

export default BookList;
