namespace NS.BFF.Compras.Models
{
    public class VoucherDTO
    {
        public decimal? Percentage { get; set; }
        public decimal? ValueDiscount { get; set; }
        public string Code { get; set; }
        public int TypeDiscount { get; set; }
    }
}