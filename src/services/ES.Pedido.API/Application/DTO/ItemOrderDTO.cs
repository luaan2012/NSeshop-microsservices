using NS.Pedidos.Domain.Pedidos;

namespace NS.Pedidos.API.Application.DTO
{
    public class ItemOrderDTO
    {
        public Guid OrderId { get; set; }
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public decimal Value { get; set; }
        public string Image { get; set; }
        public int Quantity { get; set; }

        public static OrderItem ForOrderItem(ItemOrderDTO pedidoItemDTO)
        {
            return new OrderItem(pedidoItemDTO.ProductId, pedidoItemDTO.Name, pedidoItemDTO.Quantity,
                pedidoItemDTO.Value, pedidoItemDTO.Image);
        }
    }
}