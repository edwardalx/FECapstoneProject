using System.Text;
using BookShelfApi.Data;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using BookShelfApi.Profiles;
using BookShelfApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// ✅ Optional: Only force port 5001 if nothing else is configured
// builder.WebHost.ConfigureKestrel(options =>
// {
//     // Use 5001 *only if* no port is provided via --urls or environment
//     var hasUrlArg = args.Any(a => a.StartsWith("--urls", StringComparison.OrdinalIgnoreCase));
//     var envVarUrl = Environment.GetEnvironmentVariable("ASPNETCORE_URLS");

//     if (!hasUrlArg && string.IsNullOrEmpty(envVarUrl))
//     {
//         options.ListenAnyIP(5001);
//     }
// });
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5001); // HTTP
    options.ListenAnyIP(5002, listenOptions =>
    {
        listenOptions.UseHttps(); // HTTPS
    });
});


// ✅ Database Context
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


// ✅ Authentication & JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });


// ✅ Dependency Injection
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IAuthService, AuthService>();

// ✅ AutoMapper
builder.Services.AddAutoMapper(typeof(BookProfile), typeof(UserProfile));

// ✅ Controllers & Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "BookShelf API", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter 'Bearer {token}'"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();


// ✅ Auto-apply migrations (optional)
if (args.Contains("--migrate"))
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    Console.WriteLine("Applying migrations...");
    db.Database.Migrate();
    Console.WriteLine("Migrations applied successfully.");
    return;
}

// ✅ Middleware pipeline

app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// ✅ Run app — no hard-coded URL
app.Run();
