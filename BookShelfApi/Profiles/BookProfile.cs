using AutoMapper;
using BookShelfApi.Models;
using BookShelfApi.DTOs;

namespace BookShelfApi.Profiles
{
    public class BookProfile : Profile
    {
        public BookProfile()
        {
            // Source -> Target
            // CreateMap<Book, BookDto>();  When getting data, map Model to DTO
            CreateMap<UpdateBooksDto, Book>(); // When updating, map UpdateDTO to Model
        }
    }
}