export default function BookDetailCard({ book }) {

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full  h-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Green gradient header */}
          <div className="p-5 bg-gradient-to-br from-gray-800 via-green-800 to-green-600">
            <p>{book.title}</p>
          </div>
          
          {/* Content section */}
          <div className="p-35 h-full" >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {book.title}
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              {book.summary}
            </p>
            
            <div className="flex justify-end">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}