using AutoMapper;
using BookShelfApi.Models;
using BookShelfApi.DTOs;

namespace BookShelfApi.Profiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserProfileDto>();
        CreateMap<RegisterUserDto, User>()
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore());
    }
}