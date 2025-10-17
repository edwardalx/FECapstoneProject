import { Link } from "react-router-dom";
import "../css/header.css";
Link;
export function Header() {
  return (
    <header>
      <nav className="nav-list ">
        <div className="icon ">
          <Link to="/book-list" className="text-2xl font-bold translate-all duration-300 hover:text-3xl absolute">📚My BookShelf</Link>
        </div>
        <ul className="nav-links gap-20">
          <li>
            <Link to="/login" className="text-2xl font-bold translate-all duration-300 hover:text-3xl absolute">Login</Link>
          </li>
          <li>
            <Link to="/" className="text-2xl font-bold  translate-all duration-300 hover:text-3xl  absolute">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
