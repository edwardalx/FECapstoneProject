import '../css/bookShelf.css'
export function BookShelf(){
    return(
       <section className='shelf-card'>
         <header>
            <h2>Add a New Book</h2>
         </header>
         <form action="">
            <div className='title'>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name='title' required />
            </div>
           <div className='author'>
             <label htmlFor="author">Author:</label>
            <input type="text" id="author" name='author'required/>
           </div>
           <div className='year'>
             <label htmlFor="year">Date:</label>
            <input type="date" id="year" name='year'/>
           </div>
           <div className='checkbox'>
             <label htmlFor="read">Mark as Read</label>
            <input type="checkbox" id="read" name='checkbox'/>
           </div>
           <div className='buttons'>
            <button type='submit'>Submit</button>
            <button type='submit'>Cancel</button>
           </div>
         </form>
       </section>
    )
}