using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NS.ApiCore.Controllers;
using NS.APICore.User;
using NS.Core.Mediator;
using NS.Pedidos.API.Application.Commands;
using NS.Pedidos.API.Application.Queries;

namespace NS.Pedidos.API.Controllers
{
    [Authorize]
    public class OrderController : MainController
    {
        private readonly IMediatorHandler _mediator;
        private readonly IAspNetUser _user;
        private readonly IOrderQueries _pedidoQueries;

        public OrderController(IMediatorHandler mediator,
            IAspNetUser user,
            IOrderQueries pedidoQueries)
        {
            _mediator = mediator;
            _user = user;
            _pedidoQueries = pedidoQueries;
        }

        [HttpPost("order")]
        public async Task<IActionResult> AddOrder(AddOrderCommand order)
        {
            order.ClientId = _user.ObterUserId();
            return CustomResponse(await _mediator.SendCommand(order));
        }

        [HttpGet("order/last")]
        public async Task<IActionResult> LastOrder()
        {
            var pedido = await _pedidoQueries.GetLastOrder(_user.ObterUserId());

            return pedido == null ? NotFound() : CustomResponse(pedido);
        }

        [HttpGet("order/list-client")]
        public async Task<IActionResult> ListByClient()
        {
            var pedidos = await _pedidoQueries.GetListByClientId(_user.ObterUserId());

            return pedidos == null ? NotFound() : CustomResponse(pedidos);
        }
    }
}