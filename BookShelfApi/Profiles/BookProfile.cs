using AutoMapper;
using BookShelfApi.Models;
using BookShelfApi.DTOs;

namespace BookShelfApi.Profiles
{
    public class BookProfile : Profile
    {
        public BookProfile()
        {
            CreateMap<Book, BooksDto>()
                .ForMember(dest => dest.Writter, opt => opt.MapFrom(src => src.Author));
            CreateMap<UpdateBooksDto, Book>();
        }
    }
}