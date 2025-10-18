import bookcoverUrl from "../assets/book-image2.jpg";
export default function BookDetailCard({ book }) {

  return (
    <div className="min-h-screen flex items-center p-4">
      <div className="w-full  h-full flex justify-center" >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative flex flex-col h-full justify-between ">
          {/* Green gradient header */}
          <div className="p-5 bg-gradient-to-br from-gray-800 via-green-800 to-green-600 text-2xl font-medium" >
            <h1>{book.writter}'s</h1>
          </div>
          
                  {/* Content + Button section */}
          <div className="flex flex-col flex-1 p-35 h-full object-contain  bg-center" style={{backgroundImage:`url(${bookcoverUrl})`}}>
            {/* Scrollable content if long */}
          <div className="overflow-auto " >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{book.title}</h2>
              <p className="text-white font-medium leading-relaxed">{book.summary}</p>
            </div>

            {/* Button aligned bottom right */}
            <div className="absolute bottom-2 right-5">
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-0.5 px-8 rounded-[20px] transition-colors duration-200 shadow-md hover:shadow-lg flex flex-col items-center ">
                <p>Price: {book.price}</p>
                <p>Buy</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}