namespace NS.WebApp.MVC.Models
{
    public class OrderViewModel
    {
        #region Order

        public int Code { get; set; }

        // Autorizado = 1,
        // Pago = 2,
        // Recusado = 3,
        // Entregue = 4,
        // Cancelado = 5
        public int Status { get; set; }
        public DateTime Data { get; set; }
        public decimal ValueTotal { get; set; }

        public decimal Discount { get; set; }
        public bool VoucherUsed { get; set; }

        public List<ItemPedidoViewModel> PedidoItems { get; set; } = new List<ItemPedidoViewModel>();

        #endregion

        #region Item Order

        public class ItemPedidoViewModel
        {
            public Guid ProductId { get; set; }
            public string Name { get; set; }
            public int Quantity { get; set; }
            public decimal Value { get; set; }
            public string Image { get; set; }
        }

        #endregion

        #region Address

        public AddressViewModel Address { get; set; }

        #endregion
    }
}