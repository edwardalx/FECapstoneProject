import "../css/tile.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import bookcoverUrl from "../assets/book-image2.jpg";

export function Tile({ book }) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/book/${book.id}/payment`);
  };
  const handleTouch = (e) => {
    localStorage.setItem("selectedBook", JSON.stringify(book));
  };

  const handleRightClick = () => {
    localStorage.setItem("selectedBook", JSON.stringify(book));
  };
  return (
    <div>
      <Link
        to={`/book/${book.id}`}
        className="tile"
        onTouchStart={handleTouch}
        onContextMenu={handleRightClick}
      >
        <div className="transition-all duration-500 rounded-lg shadow-md overflow-hidden flex flex-col  w-25 h-35 hover:size-full ">
          <img
            src={
              !book.image_url || book.image_url === "N/A"
                ? bookcoverUrl
                : book.image_url
            }
            alt={book.title}
            className="m-auto size-full object-contain"
          />
        </div>
        <div className="p-.5 flex flex-col gap-.5">
          <h3
            className={`text-sm font-semibold line-clamp-2 ${
              book.title.length > 20 && "text-xs"
            }`}
          >
            {book.title}
          </h3>
          <p className="text-xs text-gray-600 font-bold">{book.author}</p>
          <div className="flex items-center justify-between gap-3 m-4">
            <div className="flex items-center gap-2 px-2 py-1 rounded bg-[rgba(1,1,1,.06)] border border-blue-200 text-sm">
              <span>💷</span> <span>£{book.price}</span>
            </div>
            <div
              onClick={handleClick}
              className="ml-auto text-sm bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded"
              aria-label={`Buy ${book.title}`}
            >
              Buy
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
