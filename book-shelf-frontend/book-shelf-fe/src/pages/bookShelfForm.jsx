import "../css/bookShelf.css";
export function BookShelf() {
  return (
    <section className="shelf-card">
      <header>
        <h2 className="text-xl font-bold ml-1.5">Add a New Book</h2>
      </header>
      <form action="" className="">
        <div className="title">
          <label htmlFor="title" className="ml-1">
            Title:
          </label>
          <input type="text" id="title" name="title" className="border" />
        </div>
        <div className="author">
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" name="author" className="border" />
        </div>
        <div className="year mr-24">
          <label htmlFor="year"className="">Published:</label>
          <input type="date" id="year" name="year" className="border" />
        </div>
         <div className="flex justify-center gap-2">
          <label htmlFor="summary" className="">
            Summary:
          </label>
          <textarea
            id="summary"
            name="summary"
            className="border rounded p-2 w-full mr-15 resize-none overflow-x-auto w-32 sm:w-40 md:w-48"
            rows={4}
          />
        </div>
         <div className="flex gap-2 m-2">
          <label htmlFor="read">Genre:</label>
          <select name="genre" id="genre" className="border rounded mr-17 ">
            <option value="">-- Select a Genre --</option>
            <option value="Satire">Satire</option>
             <option value="Poetry">Poetry</option>
              <option value="Fiction">Fiction</option>
          </select>
        </div>
        <div className="checkbox">
          <label htmlFor="read">Mark as Available</label>
          <input type="checkbox" id="read" name="checkbox" />
        </div>
        <div className="buttons ">
          <button type="submit">Submit</button>
          <button type="submit">Cancel</button>
        </div>
      </form>
    </section>
  );
}
