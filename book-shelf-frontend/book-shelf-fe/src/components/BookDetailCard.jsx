import { useNavigate } from "react-router-dom";
import bookcoverUrl from "../assets/book-image2.jpg";
import { Outlet } from "react-router-dom";
export default function BookDetailCard({ book }) {
  const navigate = useNavigate();
  const handleBuy = () => {
    navigate("payment");
  };
  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative flex flex-col h-full justify-between ">
          {/* Green gradient header */}
          <div className="p-5 bg-gradient-to-br from-gray-800 via-green-800 to-green-600 text-2xl font-medium">
            <h1>{book.author}'s</h1>
          </div>

          {/* Content + Button section */}
          <div
            className="w-full  p-4 md:p-6 flex flex-col"
            style={{ backgroundImage: `url(${bookcoverUrl})` }}
          >
            {/* Scrollable content if long */}
            <div className="overflow-auto ">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {book.title}
              </h2>
              <p className="flex-1 overflow-auto text-gray-700">
                {book.summary}
              </p>
            </div>

            {/* Button aligned bottom right */}
            <footer className="mt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-lg font-semibold text-yellow-300">💷£{book.price}</div>

              <button
                onClick={handleBuy}
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Buy
              </button>
            </div>
          </footer>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
