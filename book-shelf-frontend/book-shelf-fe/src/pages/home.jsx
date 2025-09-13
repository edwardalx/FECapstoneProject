import '../css/home.css'
import { Link } from "react-router-dom"

export function Home(){
    return(
        <>
        <main className="home-main">
         <h1>Welcome to My BookShelf</h1>
         <ul className='inner-list'>
            <li><Link to={"/book-list"}>Visit all books</Link></li>
            <li> <Link to="/book-form">Add Books</Link></li>
         </ul>
        </main>
        </>
    )
}