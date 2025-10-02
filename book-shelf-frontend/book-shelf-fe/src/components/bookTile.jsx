import "../css/tile.css";
import { Link } from "react-router-dom";
import bookcoverUrl from "../assets/book-image2.jpg";

export function Tile({ book }) {
  return (
    <div>
      <Link to={`/book/${book.id}`} className="tile">
        <div className=" rounded-lg shadow-md overflow-hidden flex flex-col size-40">
          <img
            src={bookcoverUrl}
            alt={book.title}
            className="m-auto size-20 object-contain"
          />
        </div>
        <div className="p-.5 flex flex-col gap-.5">
          <h3 className="text-sm font-semibold line-clamp-2">{book.title}</h3>
          <p className="text-xs text-gray-500">{book.author}</p>
        </div>
      </Link>
    </div>
  );
}
