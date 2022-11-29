using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NS.ApiCore.Controllers;
using NS.Pedidos.API.Application.DTO;
using NS.Pedidos.API.Application.Queries;

namespace NS.Pedidos.API.Controllers
{
    [Authorize]
    public class VoucherController : MainController
    {
        private readonly IVoucherQueries _voucherQueries;

        public VoucherController(IVoucherQueries voucherQueries)
        {
            _voucherQueries = voucherQueries;
        }

        [HttpGet("voucher/{codigo}")]
        [ProducesResponseType(typeof(VoucherDTO), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> ObterPorCodigo(string code)
        {
            if (string.IsNullOrEmpty(code)) return NotFound();

            var voucher = await _voucherQueries.GetVoucherByCode(code);

            return voucher == null ? NotFound() : CustomResponse(voucher);
        }
    }
}