using NS.Pedidos.API.Application.DTO;
using NS.Pedidos.Domain.Pedidos;
using Dapper;

namespace NS.Pedidos.API.Application.Queries
{
    public interface IOrderQueries
    {
        Task<OrderDTO> GetLastOrder(Guid clienteId);
        Task<IEnumerable<OrderDTO>> GetListByClientId(Guid clienteId);
    }

    public class OrderQueries : IOrderQueries
    {
        private readonly IOrderRepository _orderRepository;

        public OrderQueries(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<OrderDTO> GetLastOrder(Guid clientId)
        {
            const string sql = @"SELECT
                                P.ID AS 'ProdutoId', P.CODIGO, P.VOUCHERUTILIZADO, P.DESCONTO, P.VALORTOTAL,P.PEDIDOSTATUS,
                                P.LOGRADOURO,P.NUMERO, P.BAIRRO, P.CEP, P.COMPLEMENTO, P.CIDADE, P.ESTADO,
                                PIT.ID AS 'ProdutoItemId',PIT.PRODUTONOME, PIT.QUANTIDADE, PIT.PRODUTOIMAGEM, PIT.VALORUNITARIO 
                                FROM PEDIDOS P 
                                INNER JOIN PEDIDOITEMS PIT ON P.ID = PIT.PEDIDOID 
                                WHERE P.CLIENTEID = @clienteId 
                                AND P.DATACADASTRO between DATEADD(minute, -3,  GETDATE()) and DATEADD(minute, 0,  GETDATE())
                                AND P.PEDIDOSTATUS = 1 
                                ORDER BY P.DATACADASTRO DESC";

            var order = await _orderRepository.GetConnection()
                .QueryAsync<dynamic>(sql, new { clientId });

            return MapOrder(order);
        }

        public async Task<IEnumerable<OrderDTO>> GetListByClientId(Guid clientId)
        {
            var order = await _orderRepository.GetListByClientId(clientId);

            return order.Select(OrderDTO.ForOrderDTO);
        }

        private OrderDTO MapOrder(dynamic result)
        {
            var pedido = new OrderDTO
            {
                Code = result[0].CODIGO,
                Status = result[0].PEDIDOSTATUS,
                ValueTotal = result[0].VALORTOTAL,
                Discount = result[0].DESCONTO,
                VoucherUsed = result[0].VOUCHERUTILIZADO,

                OrderItems = new List<ItemOrderDTO>(),
                Address = new AddressDTO
                {
                    PublicPlace = result[0].LOGRADOURO,
                    Neighborhood = result[0].BAIRRO,
                    Cep = result[0].CEP,
                    City = result[0].CIDADE,
                    Complement = result[0].COMPLEMENTO,
                    State = result[0].ESTADO,
                    Number = result[0].NUMERO
                }
            };

            foreach (var item in result)
            {
                var pedidoItem = new ItemOrderDTO
                {
                    Name = item.PRODUTONOME,
                    Value = item.VALORUNITARIO,
                    Quantity = item.QUANTIDADE,
                    Image = item.PRODUTOIMAGEM
                };

                pedido.OrderItems.Add(pedidoItem);
            }

            return pedido;
        }
    }

}