using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using BookShelfApi.Services;
using BookShelfApi.DTOs;
using System.Security.Claims;

namespace BookShelfApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register(RegisterUserDto registerDto)
    {
        try
        {
            var response = await _authService.RegisterAsync(registerDto);
            return Ok(response);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginDto loginDto)
    {
        try
        {
            var response = await _authService.LoginAsync(loginDto);
            return Ok(response);
        }
        catch (InvalidOperationException)
        {
            return Unauthorized(new { message = "Invalid credentials" });
        }
    }

    [HttpPost("refresh-token")]
    public async Task<ActionResult<AuthResponseDto>> RefreshToken(RefreshTokenDto refreshTokenDto)
    {
        try
        {
            var response = await _authService.RefreshTokenAsync(refreshTokenDto.Token, refreshTokenDto.RefreshToken);
            return Ok(response);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword(ResetPasswordDto resetPasswordDto)
    {
        var result = await _authService.RequestPasswordResetAsync(resetPasswordDto.Email);
        return Ok(new { message = "If your email is registered, you will receive a password reset link" });
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword(UpdatePasswordDto updatePasswordDto)
    {
        var result = await _authService.ResetPasswordAsync(updatePasswordDto.Token, updatePasswordDto.NewPassword);
        if (result)
        {
            return Ok(new { message = "Password updated successfully" });
        }
        return BadRequest(new { message = "Invalid token" });
    }

    [Authorize]
    [HttpGet("profile")]
    public async Task<ActionResult<UserProfileDto>> GetProfile()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        try
        {
            var profile = await _authService.GetUserProfileAsync(int.Parse(userIdClaim.Value));
            return Ok(profile);
        }
        catch (InvalidOperationException)
        {
            return NotFound(new { message = "User not found" });
        }
    }
}