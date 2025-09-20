namespace BookShelfApi.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public DateTime? PublishedDate { get; set; }
        public string Genre { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Summary { get; set; } = string.Empty;
        public string Image_url { get; set; } = string.Empty;
        public bool IsAvailable { get; set; }

    }
}