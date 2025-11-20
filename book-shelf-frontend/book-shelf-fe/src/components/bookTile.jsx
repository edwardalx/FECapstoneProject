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
  return (
    <div className="w-full max-w-xs">
      <Link to={`/book/${book.id}`} className="block no-underline">
        <div className="rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow">
          <div className="w-full h-48 bg-center bg-cover" style={{
            backgroundImage: `url(${!book.image_url || book.image_url === "N/A" ? bookcoverUrl : book.image_url})`
          }} role="img" aria-label={book.title}></div>

          <div className="p-3">
            <h3 className={`font-semibold mb-1 text-sm md:text-base ${book.title?.length > 40 ? "text-xs" : ""}`}>
              {book.title}
            </h3>
            <p className="text-xs text-gray-600 font-bold mb-2">{book.author}</p>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 px-2 py-1 rounded bg-[rgba(1,1,1,.06)] border border-blue-200 text-sm">
                <span>💷</span>
                <span>£{book.price}</span>
              </div>

              <button
                onClick={handleClick}
                className="ml-auto text-sm bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded"
                aria-label={`Buy ${book.title}`}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
