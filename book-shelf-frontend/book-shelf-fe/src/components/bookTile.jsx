import "../css/tile.css";
import { Link } from "react-router-dom";
import bookcoverUrl from "../assets/book-image2.jpg";

export function Tile({ book }) {
  return (
    <div>
      <Link to={`/book/${book.id}`} className="tile">
        <div className="transition-all duration-500 rounded-lg shadow-md overflow-hidden flex flex-col  w-25 h-35 hover:size-full ">
          <img
            src={!book.image_url||book.image_url==="N/A" ? bookcoverUrl: book.image_url}
            alt={book.title}
            className="m-auto size-full object-contain"
          />
        </div>
        <div className="p-.5 flex flex-col gap-.5">
          <h3 className={`text-sm font-semibold line-clamp-2 ${(book.title).length >20 && "text-xs"}`}>{book.title}</h3>
          <p className="text-xs text-gray-600 font-bold">{book.author}</p>
        </div>
      </Link>
    </div>
  );
}
