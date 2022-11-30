namespace NS.WebApp.MVC.Models
{
    public class CartViewModel
    {
        public decimal ValueTotal { get; set; }
        public VoucherViewModel Voucher { get; set; }
        public bool VoucherUsed { get; set; }
        public decimal Discount { get; set; }
        public List<ItemCarrinhoViewModel> Items { get; set; } = new List<ItemCarrinhoViewModel>();
    }

    public class ItemCarrinhoViewModel
    {
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public decimal Value { get; set; }
        public string Imagem { get; set; }
    }
}