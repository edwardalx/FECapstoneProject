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
    <div>
      <Link to={`/book/${book.id}`} className="tile">
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
          <p className="text-xs text-gray-600 font-bold">{book.writter}</p>
          <div className="flex justify-between gap-20 font-thin text-sm text-green-300 mt-2 transition-all duration-300">
            <div className="flex items-center justify-center gap-1 border border-blue-300 rounded-lg bg-[rgba(1,1,1,.2)] w-16 h-5">
              <span>💷</span> <span>£{book.price}</span>
            </div>
            <div
              onClick={handleClick}
              className="border border-blue-300  rounded rounded-lg bg-[rgba(232,6,205,0.36)] w-10 h-5 hover:bg-[rgba(232,6,205,0.5)]"
            >
              Buy
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
