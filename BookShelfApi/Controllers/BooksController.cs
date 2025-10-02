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

        [HttpGet]
        public IActionResult GetBooks() => Ok(_context.Books.ToList());

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


        // GET: api/books
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
            query = request.Descending
                ? query.OrderByDescending(b => EF.Property<object>(b, request.SortBy!))
                : query.OrderBy(b => EF.Property<object>(b, request.SortBy!));

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

    }
}

