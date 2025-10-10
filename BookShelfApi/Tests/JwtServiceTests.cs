using Xunit;
using Moq;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using BookShelfApi.Models;
using BookShelfApi.Services;

namespace BookShelfApi.Tests;

public class JwtServiceTests
{
    private readonly Mock<IConfiguration> _configurationMock;
    private readonly JwtService _jwtService;

    public JwtServiceTests()
    {
        _configurationMock = new Mock<IConfiguration>();
        var configurationSectionMock = new Mock<IConfigurationSection>();
        
        configurationSectionMock.Setup(x => x.Value).Returns("your-super-secret-key-with-at-least-32-characters");
        _configurationMock.Setup(x => x[It.Is<string>(s => s == "Jwt:Key")]).Returns("your-super-secret-key-with-at-least-32-characters");
        _configurationMock.Setup(x => x[It.Is<string>(s => s == "Jwt:Issuer")]).Returns("test-issuer");
        _configurationMock.Setup(x => x[It.Is<string>(s => s == "Jwt:Audience")]).Returns("test-audience");

        _jwtService = new JwtService(_configurationMock.Object);
    }

    [Fact]
    public void GenerateToken_ShouldReturnValidToken()
    {
        // Arrange
        var user = new User
        {
            Id = 1,
            Email = "test@example.com",
            FirstName = "Test",
            LastName = "User"
        };

        // Act
        var token = _jwtService.GenerateToken(user);

        // Assert
        Assert.NotNull(token);
        var jwtHandler = new JwtSecurityTokenHandler();
        Assert.True(jwtHandler.CanReadToken(token));

        var jwtToken = jwtHandler.ReadJwtToken(token);
        Assert.Equal(user.Id.ToString(), jwtToken.Claims.First(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier).Value);
        Assert.Equal(user.Email, jwtToken.Claims.First(c => c.Type == System.Security.Claims.ClaimTypes.Email).Value);
    }

    [Fact]
    public void GenerateRefreshToken_ShouldReturnNonEmptyString()
    {
        // Act
        var refreshToken = _jwtService.GenerateRefreshToken();

        // Assert
        Assert.NotNull(refreshToken);
        Assert.NotEmpty(refreshToken);
    }

    [Fact]
    public void ValidateToken_WithValidToken_ShouldReturnUserId()
    {
        // Arrange
        var user = new User { Id = 1, Email = "test@example.com", FirstName = "Test", LastName = "User" };
        var token = _jwtService.GenerateToken(user);

        // Act
        var result = _jwtService.ValidateToken(token);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(user.Id.ToString(), result);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("invalid-token")]
    public void ValidateToken_WithInvalidToken_ShouldReturnNull(string invalidToken)
    {
        // Act
        var result = _jwtService.ValidateToken(invalidToken);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public void GetRefreshTokenExpiryTime_ShouldReturnFutureDate()
    {
        // Act
        var expiryTime = _jwtService.GetRefreshTokenExpiryTime();

        // Assert
        Assert.True(expiryTime > DateTime.UtcNow);
        Assert.True(expiryTime <= DateTime.UtcNow.AddDays(7).AddMinutes(1)); // Adding 1 minute for test execution time
    }
}