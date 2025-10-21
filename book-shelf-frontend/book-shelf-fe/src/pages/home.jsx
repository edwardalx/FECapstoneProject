import { useEffect } from "react";
import "../css/home.css";
import { Link } from "react-router-dom";
import { UserProfileRequest } from "../Services/AuthService";
import { useTokenStore } from "../zu-store/authStore";

export function Home() {
  const user = useTokenStore((state) => state.user);
  const token = useTokenStore((state) => state.token);
  const setUser = useTokenStore((state) => state.setUser);
  useEffect(() => {
    if (!token) {
      return;
    }
    UserProfileRequest(token)
      .then((data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        console.log("Response", data);
      })
      .catch((e) => console.warn("UserProfileApi error", e));
  }, [token]);

  return (
    <>
      <main className="home-main ">
        <h1 className="text-2xl my-10">Welcome to My Book Shelf</h1>
        <ul className="flex justify-center gap-10">
          <li>
            <Link
              to={"/book-list"}
              className="px-6 py-3 rounded-2xl bg-[rgba(37,99,235,.7)] text-white font-medium hover:bg-blue-800 transition transform hover:-translate-y-1 inline-block"
            >
              Visit all books
            </Link>
          </li>
          <li>
            {" "}
            <Link
              to="/book-form"
              className="px-6 py-3 rounded-2xl bg-blue-600/60 text-white font-medium hover:bg-blue-800 transition transform hover:-translate-y-1 inline-block"
            >
              Add Books
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
}
