// DTOs/PaginationParams.cs
namespace BookShelfApi.DTOs
{
    public class PaginationParams
    {
        private const int MaxPageSize = 50;
        private int _pageSize = 10;

        public int PageNumber { get; set; } = 1;
        
                // Optional filters
        public string? SearchTerm { get; set; }
        public string? SortBy { get; set; } = "Id";
        public bool Descending { get; set; } = false;

        
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }
}