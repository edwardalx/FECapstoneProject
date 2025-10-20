import React from "react";

export default function Payments() {
  const storageBook = localStorage.getItem("selectedBook");
  const book = JSON.parse(storageBook);
  return (
    <div className=" flex flex-col font-normal justify-center">
      <h1 className="text-yellow-600">Payments to be implement soon with paystack</h1>
      <h2>Book-Title: {book.title}</h2>
      <p>Author: {book.title}</p>
      <p>Payment Amount: {book.price}</p>
    </div>
  );
}
