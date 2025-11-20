import { useNavigate } from "react-router-dom";
import bookcoverUrl from "../assets/book-image2.jpg";
import { Outlet } from "react-router-dom";
export default function BookDetailCard({ book }) {
  const navigate = useNavigate();
  const handleBuy = () => navigate("payment");

  return (
    <div className="w-full flex justify-center p-4">
      {/* Card: mobile-first stacked, becomes row on md */}
      <article className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Image section */}
        <div
          className="w-full md:w-1/2 h-56 md:h-auto bg-center bg-cover"
          style={{
            backgroundImage: `url(${book.image_url && book.image_url !== "N/A" ? book.image_url : bookcoverUrl})`,
          }}
          role="img"
          aria-label={book.title}
        />
        {/* Content section */}
        <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col">
          <header className="mb-2">
            <h1 className="text-lg md:text-2xl font-semibold text-gray-900">{book.title}</h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">{book.author}</p>
          </header>

          <section className="flex-1 overflow-auto text-gray-700">
            <p className="text-sm md:text-base leading-relaxed">{book.summary}</p>
          </section>

          <footer className="mt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-lg font-semibold text-green-600">£{book.price}</div>

              <button
                onClick={handleBuy}
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Buy
              </button>
            </div>
          </footer>
        </div>
      </article>
      <Outlet />
    </div>
  );
}
