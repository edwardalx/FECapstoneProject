// fetchBooks.js http://localhost:5093/api/v1/Books/paged?PageNumber=1
export async function getBooks() {
  const baseUrl = "/api/v1/books/all";
  const response = await fetch(`${baseUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_TOKEN_HERE",
    },
  });

  const resBody = await response.json();
  console.log("Response Body:", resBody);
  return resBody; // ✅ return data so store can use it
}

export async function getPagedBooks(page) {
  const baseUrl = "/api/v1/Books";
  const response = await fetch(`${baseUrl}/paged?PageNumber=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_TOKEN_HERE",
    },
  });

  const resBody = await response.json();
  console.log("Response Body:", resBody);
  return resBody; // ✅ return data so store can use it
}

export async function getByQuery(author) {
  const reqBody = {
    pageNumber: 0,
    searchTerm: author ??"",
    sortBy: "string",
    descending: true,
    pageSize: 0,
  };
  const baseUrl = "/api/v1/Books";
  const response = await fetch(`${baseUrl}/books/paged`, {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_TOKEN_HERE",
    },
  });

  const resBody = await response.json();
  console.log("Filtered Response Body:", resBody);
  return resBody; // ✅ return data so store can use it
}

const bookService = {
  getBooks,
  getPagedBooks,
};

export default bookService;
