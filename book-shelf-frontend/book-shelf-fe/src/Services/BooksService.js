// fetchBooks.js
export default async function getBooks() {
  const baseUrl = "https://jsonplaceholder.typicode.com";
  const response = await fetch(`${baseUrl}/posts`, {
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
