using BookShelfApi.Models;
using BookShelfApi.DTOs;

namespace BookShelfApi.Services;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterUserDto registerDto);
    Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
    Task<AuthResponseDto> RefreshTokenAsync(string token, string refreshToken);
    Task<bool> RequestPasswordResetAsync(string email);
    Task<bool> ResetPasswordAsync(string token, string newPassword);
    Task<UserProfileDto> GetUserProfileAsync(int userId);
}