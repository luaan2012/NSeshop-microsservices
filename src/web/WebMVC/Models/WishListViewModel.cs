namespace NS.WebMVC.Models
{
    public class WishListViewModel
    {
        public List<ItemWishListViewModel> Items { get; set; } = new List<ItemWishListViewModel>();
    }

    public class ItemWishListViewModel
    {
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string Image { get; set; }
    }
}