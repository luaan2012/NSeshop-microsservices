namespace NS.Carrinho.API.Model
{
    public class Voucher
    {
        public decimal? Percentage { get; set; }
        public decimal? ValueDiscount { get; set; }
        public string Code { get; set; }
        public TypeDiscountVoucher TypeDiscount { get; set; }
    }

    public enum TypeDiscountVoucher
    {
        Percentage = 0,
        Value = 1
    }
}