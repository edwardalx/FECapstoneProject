import '../css/home.css'
import { Link } from "react-router-dom"

export function Home(){
    return(
        <>
        <main className="home-main ">
         <h1 className='text-2xl my-10'>Welcome to My Book Shelf</h1>
         <ul className='flex justify-center gap-10'>
            <li><Link to={"/book-list"} className='px-6 py-3 rounded-3xl bg-[rgba(37,99,235,.7)] text-white font-medium hover:bg-blue-800 transition transform hover:-translate-y-1 inline-block'>Visit all books</Link></li>
            <li> <Link to="/book-form" className='px-6 py-3 rounded-3xl bg-blue-600/60 text-white font-medium hover:bg-blue-800 transition transform hover:-translate-y-1 inline-block'>Add Books</Link></li>
         </ul>
        </main>
        </>
    )
}