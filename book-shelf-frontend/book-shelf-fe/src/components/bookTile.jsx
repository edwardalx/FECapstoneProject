import '../css/tile.css';
import { Link } from "react-router-dom";

export function Tile({ title, Author, Published, Status }) {
  return (
    <div>
    <Link to={path} className="tile">
      <div className="tile-icon">{icon}</div>
      <h3>📖{title}</h3>
      <p>{Author}</p>
      <p>{Published}</p>
      <p>{Status}</p>
    </Link>
    </div>
  );
}
