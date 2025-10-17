import { useEffect, useState } from "react";
import { useBookStore } from "../zu-store/bookShelfStore";
import { getBooks, getPagedBooks, getByQuery } from "../Services/BooksService";
import { Tile } from "../components/bookTile";

function BookList() {
  const books = useBookStore((state) => state.books);
  const setBooks = useBookStore((state) => state.setBooks);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({getAll:""},{filtered:""});
  const [resData, setResData] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        let response = await getPagedBooks(page);
        setBooks(response.items);
        setResData(response);
      } catch (error) {
        setError({getAll:"No books found"});
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
          setError({filtered:"No search results"});
        }else{setError({filtered:""})}
      })

      .catch((e) => {
        console.warn("filter data error", e);
      });
  }, [filterValue]);

  return (
    <div className="flex flex-col justify-center py-10">
      <div className="font-thin">
        <input
          type="text"
          className="border border-blue-300 rounded-[20px] w-200 text-white bg-[rgba(159,211,240,.3)] font-thin italic"
          placeholder={`${"Search by Book Title..."}`}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value.trimStart())}
        />
      </div>
      <h2 className="text-2xl font-medium my-10 mt-10">BOOKS</h2>
      {filteredData.length!==0||error.filtered ? (
        <div>
          {error.filtered && <p className="text-red-600">{error.filtered}</p>}
          {loading && <p>Data Loading!!!</p>}
          <div className="flex flex-wrap gap-2 justify-center">
            {filteredData.map((b) => (
              <div key={b.id}>{<Tile book={b} />}</div>
            ))}
          </div>
        </div>
      ) : (
        !filterValue &&<div>
          {loading && <p>Data Loading!!!</p>}
          {error.getAll && <p className="text-red-600">{error.getAll}</p>}
          <div className="flex flex-wrap gap-2 justify-center">
            {books.map((b) => (
              <div key={b.id}>{<Tile book={b} />}</div>
            ))}
          </div>
        </div>
      )}
      {filteredData.length === 0 && !error&&(
        <div className="flex justify-between text-[rgba(245,237,237,1)] text-sm my-4 font-bold ">
          <div
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
            className={`cursor-pointer translate-all duration-300 ${
              page === 1 ? "text-purple-300" : ""
            }`}
          >
            Previous
          </div>
          <div className="text-[rgba(180,15,117,1)]">
            Page {resData.pageNumber} of {resData.totalPages}
          </div>
          <div
            onClick={() => {
              if (page < resData.totalPages) {
                setPage(page + 1);
              }
            }}
            className={`cursor-pointer translate-all duration-300 ${
              page === resData.totalPages ? "text-purple-300" : ""
            }`}
          >
            Next
          </div>
        </div>
      )}
    </div>
  );
}

export default BookList;
