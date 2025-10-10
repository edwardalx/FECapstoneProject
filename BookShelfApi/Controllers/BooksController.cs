using Microsoft.AspNetCore.Mvc;
using BookShelfApi.Data;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using BookShelfApi.Models;
using BookShelfApi.DTOs;

namespace BookShelfApi.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly AppDbContext _context;
        public readonly IMapper _mapper;

        public BooksController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("all")]
        public IActionResult GetAllBooks() => Ok(_context.Books.ToList());

        [HttpGet("{id}")]
        public IActionResult GetBook(int id) =>
            _context.Books.Find(id) is Book book ? Ok(book) : NotFound();

        [HttpPost]
        public IActionResult AddBook(Book book)
        {
            _context.Books.Add(book);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
        }
        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, [FromBody] Book updatedBook)
        {
            var existingBook = _context.Books.Find(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.PublishedDate = updatedBook.PublishedDate;
            // Add other properties as needed

            _context.SaveChanges();
            return NoContent();
        }


        // GET: api/books/paged
        [HttpGet("paged")]
        public async Task<ActionResult<PagedResponse<BooksDto>>> GetBooks(
            [FromQuery] PaginationParams paginationParams)
        {
            var query = _context.Books.AsQueryable();

            // Get total count before pagination
            var totalCount = await query.CountAsync();

            // Apply pagination
            var books = await query
                .OrderBy(b => b.Title)
                .Skip((paginationParams.PageNumber - 1) * paginationParams.PageSize)
                .Take(paginationParams.PageSize)
                .ToListAsync();

            var bookDtos = _mapper.Map<List<BooksDto>>(books);

            var response = new PagedResponse<BooksDto>(
                bookDtos,
                totalCount,
                paginationParams.PageNumber,
                paginationParams.PageSize
            );

            return Ok(response);
        }
        [HttpPost("books/paged")]
        public async Task<IActionResult> GetBooksPaged([FromBody] PaginationParams request)
        {
            if (request.PageNumber <= 0) request.PageNumber = 1;
            if (request.PageSize <= 0) request.PageSize = 20;

            var query = _context.Books.AsQueryable();

            // Filtering
            if (!string.IsNullOrEmpty(request.SearchTerm))
            {
                query = query.Where(b => b.Title.Contains(request.SearchTerm));
            }

            // Sorting
            if (!string.IsNullOrEmpty(request.SortBy))
            {
                switch (request.SortBy.ToLower())
                {
                    case "title":
                        query = request.Descending 
                            ? query.OrderByDescending(b => b.Title)
                            : query.OrderBy(b => b.Title);
                        break;
                    case "author":
                        query = request.Descending
                            ? query.OrderByDescending(b => b.Author)
                            : query.OrderBy(b => b.Author);
                        break;
                    case "publisheddate":
                        query = request.Descending
                            ? query.OrderByDescending(b => b.PublishedDate)
                            : query.OrderBy(b => b.PublishedDate);
                        break;
                    case "price":
                        query = request.Descending
                            ? query.OrderByDescending(b => b.Price)
                            : query.OrderBy(b => b.Price);
                        break;
                    default:
                        query = query.OrderBy(b => b.Title); // Default sorting
                        break;
                }
            }
            else
            {
                query = query.OrderBy(b => b.Title); // Default sorting when no sort field is specified
                }

            // Count total before pagination
            var totalCount = await query.CountAsync();

            // Apply pagination
            var items = await query
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            // Return in your PagedResponse<T>
            var response = new PagedResponse<Book>(
                items, totalCount, request.PageNumber, request.PageSize
            );

            return Ok(response);
        }

        // GET: api/books/user/{userId}/read
        [HttpGet("user/{userId}/read")]
        public async Task<IActionResult> GetBooksReadByUser(int userId)
        {
            var userBooks = await _context.UserBooks
                .Include(ub => ub.Book)
                .Where(ub => ub.UserId == userId)
                .OrderByDescending(ub => ub.ReadDate)
                .Select(ub => new
                {
                    Book = _mapper.Map<BooksDto>(ub.Book),
                    ReadDate = ub.ReadDate
                })
                .ToListAsync();

            if (!userBooks.Any())
            {
                return NotFound($"No books found for user with ID {userId}");
            }

            return Ok(userBooks);
        }

        // POST: api/books/{bookId}/read/{userId}
        [HttpPost("{bookId}/read/{userId}")]
        public async Task<IActionResult> MarkBookAsRead(int bookId, int userId)
        {
            var book = await _context.Books.FindAsync(bookId);
            if (book == null)
            {
                return NotFound($"Book with ID {bookId} not found");
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound($"User with ID {userId} not found");
            }

            // Check if the book is already marked as read by the user
            var existingRecord = await _context.UserBooks
                .FirstOrDefaultAsync(ub => ub.UserId == userId && ub.BookId == bookId);

            if (existingRecord != null)
            {
                return BadRequest("This book is already marked as read by the user");
            }

            var userBook = new UserBook
            {
                UserId = userId,
                BookId = bookId,
                ReadDate = DateTime.UtcNow
            };

            _context.UserBooks.Add(userBook);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Book marked as read successfully", ReadDate = userBook.ReadDate });
        }

        // DELETE: api/books/{bookId}/read/{userId}
        [HttpDelete("{bookId}/read/{userId}")]
        public async Task<IActionResult> UnmarkBookAsRead(int bookId, int userId)
        {
            var userBook = await _context.UserBooks
                .FirstOrDefaultAsync(ub => ub.UserId == userId && ub.BookId == bookId);

            if (userBook == null)
            {
                return NotFound("Book is not marked as read by this user");
            }

            _context.UserBooks.Remove(userBook);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Book unmarked as read successfully" });
        }
    }
}
