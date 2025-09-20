Step 4: Create a New Migration and Update the Database
Run these commands in the Package Manager Console:
bash
dotnet ef migrations add InitialCreate

dotnet ef database update

HTTP Requests:
text
GET /api/books?pageNumber=1&pageSize=10
GET /api/books?pageNumber=2&pageSize=20
GET /api/books/v2?pageNumber=3&pageSize=5