using NS.Pedidos.API.Application.DTO;
using NS.Pedidos.Domain.Pedidos;
using Dapper;

namespace NS.Pedidos.API.Application.Queries
{
    public interface IOrderQueries
    {
        Task<OrderDTO> GetLastOrder(Guid clientId);
        Task<IEnumerable<OrderDTO>> GetListByClientId(Guid clientId);
        Task<OrderDTO> GetOrderAuthorize();

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
                                P.ID AS 'ProductId', P.CODE, P.VOUCHERUSED, P.DISCOUNT, P.VALUETOTAL ,P.ORDERSTATUS,
                                P.PUBLICPLACE,P.NUMBER, P.NEIGHBORHOOD, P.CEP, P.COMPLEMENT, P.CITY, P.STATE,
                                PIT.ID AS 'ProductItemId',PIT.PRODUCTNAME, PIT.QUANTITY, PIT.PRODUCTIMAGE, PIT.VALUEUNITY 
                                FROM ORDERS P 
                                INNER JOIN ORDERITEMS PIT ON P.ID = PIT.ORDERID 
                                WHERE P.CLIENTID = @clientId 
                                AND P.DATAREGISTER between DATEADD(minute, -3,  GETDATE()) and DATEADD(minute, 0,  GETDATE())
                                AND P.ORDERSTATUS = 1 
                                ORDER BY P.DATAREGISTER DESC";

            var order = await _orderRepository.GetConnection()
                .QueryAsync<dynamic>(sql, new { clientId });

            return MapOrder(order);
        }

        public async Task<IEnumerable<OrderDTO>> GetListByClientId(Guid clientId)
        {
            var order = await _orderRepository.GetListByClientId(clientId);

            return order.Select(OrderDTO.ForOrderDTO);
        }

        public async Task<OrderDTO> GetOrderAuthorize()
        {
            // Correção para pegar todos os itens do pedido e ordernar pelo pedido mais antigo
            const string sql = @"SELECT 
                                P.ID as 'PedidoId', P.ID, P.CLIENTID, 
                                PI.ID as 'PedidoItemId', PI.ID, PI.PRODUCTID, PI.QUANTITY 
                                FROM ORDERS P 
                                INNER JOIN ORDERITEMS PI ON P.ID = PI.ORDERID 
                                WHERE P.ORDERSTATUS = 1                                
                                ORDER BY P.DATAREGISTER";

            // Utilizacao do lookup para manter o estado a cada ciclo de registro retornado
            var lookup = new Dictionary<Guid, OrderDTO>();

            await _orderRepository.GetConnection().QueryAsync<OrderDTO, ItemOrderDTO, OrderDTO>(sql,
                (p, pi) =>
                {
                    if (!lookup.TryGetValue(p.Id, out var orderDTO))
                        lookup.Add(p.Id, orderDTO = p);

                    orderDTO.OrderItems ??= new List<ItemOrderDTO>();
                    orderDTO.OrderItems.Add(pi);

                    return orderDTO;

                }, splitOn: "PedidoId,PedidoItemId");

            // Obtendo dados o lookup
            return lookup.Values.OrderBy(p => p.Data).FirstOrDefault();
        }

        private OrderDTO MapOrder(dynamic result)
        {
            var pedido = new OrderDTO
            {
                Code = result[0]?.CODE,
                Status = result[0]?.ORDERSTATUS,
                ValueTotal = result[0]?.VALUETOTAL,
                Discount = result[0]?.DISCOUNT,
                VoucherUsed = result[0]?.VOUCHERUSED,

                OrderItems = new List<ItemOrderDTO>(),
                Address = new AddressDTO
                {
                    PublicPlace = result[0]?.PUBLICPLACE,
                    Neighborhood = result[0]?.NEIGHBORHOOD,
                    Cep = result[0]?.CEP,
                    City = result[0]?.CITY,
                    Complement = result[0]?.COMPLEMENT,
                    State = result[0]?.STATE,
                    Number = result[0]?.NUMBER
                }
            };

            foreach (var item in result)
            {
                var pedidoItem = new ItemOrderDTO
                {
                    Name = item?.PRODUCTNAME,
                    Value = item?.VALUEUNITY,
                    Quantity = item?.QUANTITY,
                    Image = item?.PRODUCTIMAGE
                };

                pedido.OrderItems.Add(pedidoItem);
            }

            return pedido;
        }
    }

}