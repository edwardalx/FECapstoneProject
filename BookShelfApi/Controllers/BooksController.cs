using Microsoft.AspNetCore.Mvc;
using BookShelfApi.Data;
using BookShelfApi.Models;

namespace BookShelfApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BooksController(AppDbContext context)
        {
            _context = context;
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
    }
}
