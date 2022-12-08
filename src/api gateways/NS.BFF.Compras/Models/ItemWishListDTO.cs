namespace NS.BFF.Compras.Models
{
    public class ItemWishListDTO
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
    }
}
