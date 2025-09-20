namespace BookShelfApi.DTOs
{
    public class UpdateBooksDto
    {
        public decimal Price { get; set; }
        public string Summary { get; set; } = string.Empty;
        public bool IsAvailable { get; set; }
    }
}