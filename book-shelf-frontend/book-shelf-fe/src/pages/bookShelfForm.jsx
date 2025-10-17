import "../css/bookShelf.css";
export function BookShelf() {
  return (
    <section className="shelf-card">
      <header>
        <h2 className="text-xl font-bold ml-1.5">Add a New Book</h2>
      </header>
      <form action="" className="flex ">
        <div className="title">
          <label htmlFor="title" className="ml-1">
            Title:
          </label>
          <input type="text" id="title" name="title" className="border px-10" />
        </div>
        <div className="author flex">
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" name="author" className="border px-10" />
        </div>
        <div className="year item-start mr-24">
          <label htmlFor="year"className="">Published:</label>
          <input type="date" id="year" name="year" className="border px-10 appearance-none mb-2" />
        </div>
         <div className="flex  gap-2">
          <label htmlFor="summary" className="">
            Summary:
          </label>
          <textarea
            id="summary"
            name="summary"
            className="border mb-3 px-10 w-full mr-15 resize-none overflow-x-auto w-32 sm:w-40 md:w-48"
            rows={4}
          />
        </div>
         <div className="flex gap-2 m-2">
          <label htmlFor="read" className="ml-3">Genre:</label>
          <select name="genre" id="genre" className="border   px-10">
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
