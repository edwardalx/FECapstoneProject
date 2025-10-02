import React, { useEffect, useState } from 'react'
import BookDetailCard from '../components/BookDetailCard'
import { useBookStore } from '../zu-store/bookShelfStore';
import { useParams } from 'react-router-dom';

export default function BookDetails() {
    const books = useBookStore((state) => state.books);
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [filteredBook, setFilteredBook] = useState({})

    useEffect(() => {
   try {
        setLoading(true)
        if (!books){setError("No books available")}
        let selectedBook = books.find(x => x.id === Number(id))
        setFilteredBook(selectedBook)
        
    } catch (error) {
        console.error(error);
        
    }
    finally{
        setLoading(false)
    }
    

    }, [id])
    
    
  return (
    <div>
        {error && <p className='text-red-600'>❗{error}</p>}
        {loading && <p className='text-green-600'> <span>☸️ </span>Loading ... </p>}
        <BookDetailCard book={filteredBook}/>
        {console.log("Book detail of :", filteredBook)}
    </div>
  )
}
