using System.ComponentModel.DataAnnotations;

namespace BookShelfApi.Models;

public class UserBook
{
    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public int BookId { get; set; }
    public Book Book { get; set; } = null!;

    public DateTime ReadDate { get; set; } = DateTime.UtcNow;
}