import { Link } from "react-router-dom";
import "../css/header.css";
import { useEffect, useState } from "react";
import { useTokenStore } from "../zu-store/authStore";

export function Header() {
  const token = useTokenStore((state) => state.token);
  const setToken = useTokenStore((state) => state.setToken); // added

  const logout = () => {
    localStorage.clear();
    setToken("");
  };
  return (
    <header>
      {/* responsive nav: logo left, links right */}
      <nav className="nav-list flex items-center justify-between px-4 py-3 max-w-6xl mx-auto">
        <div className="icon">
          <Link
            to="/book-list"
            className="text-lg sm:text-2xl font-bold hover:scale-105 transition-transform duration-200"
          >
            📚 My BookShelf
          </Link>
        </div>

        <ul className="nav-links flex gap-4 sm:gap-8 items-center">
          <li>
            {token ? (
              <Link
                to="/"
                onClick={logout}
                className="text-sm sm:text-lg font-medium hover:underline"
              >
                Logout
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-sm sm:text-lg font-medium hover:underline"
              >
                Login
              </Link>
            )}
          </li>
          <li>
            <Link
              to="/"
              className="text-sm sm:text-lg font-medium hover:underline"
            >
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
