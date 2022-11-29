using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NS.ApiCore.Controllers;
using NS.APICore.User;
using NS.Clientes.API.Application.Commands;
using NS.Clientes.API.Data.Interface;
using NS.Core.Mediator;

namespace NS.Clientes.API.Controllers
{
    public class ClientsController : MainController
    {
        private readonly IClientRepository _clienteRepository;
        private readonly IMediatorHandler _mediator;
        private readonly IAspNetUser _user;

        public ClientsController(IClientRepository clienteRepository, IMediatorHandler mediator, IAspNetUser user)
        {
            _clienteRepository = clienteRepository;
            _mediator = mediator;
            _user = user;
        }

        [HttpGet("client/address")]
        public async Task<IActionResult> GiveAddress()
        {
            var endereco = await _clienteRepository.GiveAddressById(_user.ObterUserId());

            return endereco == null ? NotFound() : CustomResponse(endereco);
        }

        [HttpPost("client/address")]
        public async Task<IActionResult> AddAddress(AddAddressCommand endereco)
        {
            endereco.ClientId = _user.ObterUserId();
            return CustomResponse(await _mediator.SendCommand(endereco));
        }
    }
}