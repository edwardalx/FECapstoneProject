import { Link } from "react-router-dom"
import '../css/header.css'
Link
export function Header(){
    return(
         <header>
        <nav className="nav-list">
            <div className="icon">
          <Link to="/book-shelf">📚My BookShelf</Link>
        </div>
            <ul className="nav-links">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/home">Home</Link></li>
            </ul>
        </nav>
    </header>
    )
}