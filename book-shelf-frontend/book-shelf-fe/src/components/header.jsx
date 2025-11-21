import { Link } from "react-router-dom";
import "../css/header.css";
import { useEffect, useState } from "react";
import { useTokenStore } from "../zu-store/authStore";

export function Header() {
  const token = useTokenStore((state) => state.token);

  const logout = () => {
    localStorage.clear();
    setToken("");
  };
  return (
    <header>
      <nav className="nav-list flex items-center justify-between px-4 py-3 max-w-6xl mx-auto ">
        <div className="icon ">
          <Link
            to="/book-list"
            className="text-2xl font-bold translate-all duration-300 hover:text-3xl"
          >
            📚My BookShelf
          </Link>
        </div>
        <ul className="nav-links flex gap-4 sm:gap-8 items-center">
          <li>
            {token ? (
              <Link
                to="/"
                onClick={logout}
                className="text-2xl sm:text-lg font-medium hover:underline font-bold translate-all duration-300 hover:text-3xl "
              >
                Logout
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-2xl md:text-xl sm:text-lg font-bold hover:underline translate-all duration-300 hover:text-3xl "
              >
                Login
              </Link>
            )}
          </li>
          <li>
            <Link
              to="/"
              className="text-2xl md:text-xl sm:text-lg font-bold hover:underline translate-all duration-300 hover:text-3xl "
            >
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
