export default function BookDetailCard({ book }) {

  return (
    <div className="min-h-screen flex items-center p-4">
      <div className="w-full  h-full flex justify-center" >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative flex flex-col h-full justify-between ">
          {/* Green gradient header */}
          <div className="p-5 bg-gradient-to-br from-gray-800 via-green-800 to-green-600">
            <p>{book.title}</p>
          </div>
          
                  {/* Content + Button section */}
          <div className="flex flex-col flex-1 p-35 h-full">
            {/* Scrollable content if long */}
            <div className="overflow-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{book.title}</h2>
              <p className="text-gray-600 leading-relaxed">{book.summary}</p>
            </div>

            {/* Button aligned bottom right */}
            <div className="absolute bottom-5 right-5">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                <p>Price</p>
                <p>Buy</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}