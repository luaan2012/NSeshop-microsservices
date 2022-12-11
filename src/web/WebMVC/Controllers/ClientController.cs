using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NS.WebMVC.Models;
using NS.WebMVC.Services;

namespace NS.WebMVC.Controllers
{
    [Authorize]
    public class ClientController : MainController
    {
        private readonly IClientService _clientService;

        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpPost]
        [Route("register-address")]
        public async Task<IActionResult> AddAddress(AddressViewModel address)
        {
            var response = await _clientService.AddAddress(address);

            if (ResponseHasError(response)) return BadRequest(response.Errors.Messages);

            return Ok();
        }
    }
}
