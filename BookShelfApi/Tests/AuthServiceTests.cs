using Xunit;
using Moq;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using BookShelfApi.Data;
using BookShelfApi.Services;
using BookShelfApi.DTOs;
using BookShelfApi.Models;
using BookShelfApi.Profiles;

namespace BookShelfApi.Tests;

public class AuthServiceTests
{
    private readonly Mock<IJwtService> _jwtServiceMock;
    private readonly IMapper _mapper;
    private readonly DbContextOptions<AppDbContext> _dbContextOptions;

    public AuthServiceTests()
    {
        _jwtServiceMock = new Mock<IJwtService>();
        
        // Configure AutoMapper
        var mapperConfig = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile(new UserProfile());
        });
        _mapper = mapperConfig.CreateMapper();

        // Configure in-memory database
        _dbContextOptions = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
    }

    [Fact]
    public async Task RegisterAsync_WithValidData_ShouldCreateUser()
    {
        // Arrange
        var dbContext = new AppDbContext(_dbContextOptions);
        var authService = new AuthService(dbContext, _jwtServiceMock.Object, _mapper);
        var registerDto = new RegisterUserDto
        {
            Email = "test@example.com",
            Password = "Password123!",
            FirstName = "Test",
            LastName = "User"
        };

        _jwtServiceMock.Setup(x => x.GenerateToken(It.IsAny<User>()))
            .Returns("test-token");
        _jwtServiceMock.Setup(x => x.GenerateRefreshToken())
            .Returns("test-refresh-token");
        _jwtServiceMock.Setup(x => x.GetRefreshTokenExpiryTime())
            .Returns(DateTime.UtcNow.AddDays(7));

        // Act
        var result = await authService.RegisterAsync(registerDto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("test-token", result.Token);
        Assert.Equal("test-refresh-token", result.RefreshToken);

        var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == registerDto.Email);
        Assert.NotNull(user);
        Assert.Equal(registerDto.FirstName, user.FirstName);
        Assert.Equal(registerDto.LastName, user.LastName);
        Assert.True(BCrypt.Net.BCrypt.Verify(registerDto.Password, user.PasswordHash));
    }

    [Fact]
    public async Task RegisterAsync_WithDuplicateEmail_ShouldThrowException()
    {
        // Arrange
        var dbContext = new AppDbContext(_dbContextOptions);
        var authService = new AuthService(dbContext, _jwtServiceMock.Object, _mapper);
        var existingUser = new User
        {
            Email = "test@example.com",
            PasswordHash = "hash",
            FirstName = "Existing",
            LastName = "User"
        };
        dbContext.Users.Add(existingUser);
        await dbContext.SaveChangesAsync();

        var registerDto = new RegisterUserDto
        {
            Email = "test@example.com",
            Password = "Password123!",
            FirstName = "Test",
            LastName = "User"
        };

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(
            () => authService.RegisterAsync(registerDto)
        );
    }

    [Fact]
    public async Task LoginAsync_WithValidCredentials_ShouldReturnTokens()
    {
        // Arrange
        var dbContext = new AppDbContext(_dbContextOptions);
        var authService = new AuthService(dbContext, _jwtServiceMock.Object, _mapper);
        var password = "Password123!";
        var user = new User
        {
            Email = "test@example.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
            FirstName = "Test",
            LastName = "User"
        };
        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync();

        _jwtServiceMock.Setup(x => x.GenerateToken(It.IsAny<User>()))
            .Returns("test-token");
        _jwtServiceMock.Setup(x => x.GenerateRefreshToken())
            .Returns("test-refresh-token");
        _jwtServiceMock.Setup(x => x.GetRefreshTokenExpiryTime())
            .Returns(DateTime.UtcNow.AddDays(7));

        var loginDto = new LoginDto
        {
            Email = "test@example.com",
            Password = password
        };

        // Act
        var result = await authService.LoginAsync(loginDto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("test-token", result.Token);
        Assert.Equal("test-refresh-token", result.RefreshToken);
    }

    [Fact]
    public async Task LoginAsync_WithInvalidCredentials_ShouldThrowException()
    {
        // Arrange
        var dbContext = new AppDbContext(_dbContextOptions);
        var authService = new AuthService(dbContext, _jwtServiceMock.Object, _mapper);
        var user = new User
        {
            Email = "test@example.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("correctpassword"),
            FirstName = "Test",
            LastName = "User"
        };
        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync();

        var loginDto = new LoginDto
        {
            Email = "test@example.com",
            Password = "wrongpassword"
        };

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(
            () => authService.LoginAsync(loginDto)
        );
    }

    [Fact]
    public async Task GetUserProfileAsync_WithValidId_ShouldReturnProfile()
    {
        // Arrange
        var dbContext = new AppDbContext(_dbContextOptions);
        var authService = new AuthService(dbContext, _jwtServiceMock.Object, _mapper);
        var user = new User
        {
            Email = "test@example.com",
            PasswordHash = "hash",
            FirstName = "Test",
            LastName = "User"
        };
        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync();

        // Act
        var result = await authService.GetUserProfileAsync(user.Id);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(user.Email, result.Email);
        Assert.Equal(user.FirstName, result.FirstName);
        Assert.Equal(user.LastName, result.LastName);
    }

    [Fact]
    public async Task GetUserProfileAsync_WithInvalidId_ShouldThrowException()
    {
        // Arrange
        var dbContext = new AppDbContext(_dbContextOptions);
        var authService = new AuthService(dbContext, _jwtServiceMock.Object, _mapper);

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(
            () => authService.GetUserProfileAsync(999)
        );
    }
}