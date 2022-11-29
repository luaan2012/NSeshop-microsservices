using NS.Pedidos.Domain.Pedidos;

namespace NS.Pedidos.API.Application.DTO
{
    public class OrderDTO
    {
        public Guid Id { get; set; }
        public int Code { get; set; }

        public int Status { get; set; }
        public DateTime Data { get; set; }
        public decimal ValueTotal { get; set; }

        public decimal Discount{ get; set; }
        public string VoucherCode { get; set; }
        public bool VoucherUsed { get; set; }

        public List<ItemOrderDTO> OrderItems { get; set; }
        public AddressDTO Address { get; set; }

        public static OrderDTO ForOrderDTO(Order order)
        {
            var orderDTO = new OrderDTO
            {
                Id = order.Id,
                Code = order.Code,
                Status = (int)order.OrderStatus,
                Data = order.DataRegister,
                ValueTotal = order.ValueTotal,
                Discount = order.Discount,
                VoucherUsed = order.VoucherUsed,
                OrderItems = new List<ItemOrderDTO>(),
                Address = new AddressDTO()
            };

            foreach (var item in order.OrderItems)
            {
                orderDTO.OrderItems.Add(new ItemOrderDTO
                {
                    Name = item.ProductName,
                    Image = item.ProductImage,
                    Quantity= item.Quantity,
                    ProductId = item.ProductId,
                    Value = item.ValueUnity,
                    OrderId = item.OrderId
                });
            }

            orderDTO.Address = new AddressDTO
            {
                PublicPlace = order.Address.PublicPlace,
                Number = order.Address.Number,
                Complement = order.Address.Complement,
                Neighborhood = order.Address.Neighborhood,
                Cep = order.Address.Cep,
                City = order.Address.City,
                State = order.Address.State,
            };

            return orderDTO;
        }
    }
}