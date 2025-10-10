using BookShelfApi.Models;

namespace BookShelfApi.Services;

public interface IJwtService
{
    string GenerateToken(User user);
    string GenerateRefreshToken();
    string? ValidateToken(string token);
    DateTime GetRefreshTokenExpiryTime();
}