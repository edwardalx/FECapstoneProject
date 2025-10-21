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
      <nav className="nav-list ">
        <div className="icon ">
          <Link
            to="/book-list"
            className="text-2xl font-bold translate-all duration-300 hover:text-3xl absolute"
          >
            📚My BookShelf
          </Link>
        </div>
        <ul className="nav-links gap-20">
          <li>
            {token ? (
              <Link
                to="/"
                onClick={logout}
                className="text-2xl font-bold translate-all duration-300 hover:text-3xl absolute"
              >
                Logout
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-2xl font-bold translate-all duration-300 hover:text-3xl absolute"
              >
                Login
              </Link>
            )}
          </li>
          <li>
            <Link
              to="/"
              className="text-2xl font-bold  translate-all duration-300 hover:text-3xl  absolute"
            >
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
