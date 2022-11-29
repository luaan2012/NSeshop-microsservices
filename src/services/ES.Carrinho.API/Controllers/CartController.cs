using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NS.ApiCore.Controllers;
using NS.APICore.User;
using NS.Carrinho.API.Data;
using NS.Carrinho.API.Model;

namespace NS.Carrinho.API.Controllers
{
    [Authorize]
    public class CartController : MainController
    {
        private readonly IAspNetUser _user;
        private readonly CartContext _context;

        public CartController(IAspNetUser user, CartContext context)
        {
            _user = user;
            _context = context;
        }

        [HttpGet("cart")]
        public async Task<ClientCart> GetCart()
        {
            return await GetCartClient() ?? new ClientCart();
        }

        [HttpPost("cart")]
        public async Task<IActionResult> AddItemCart(ItemCart item)
        {
            var carrinho = await GetCartClient();

            if (carrinho == null)
                ManipulateNewcart(item);
            else
                ManipulateExistingCart(carrinho, item);

            if (!ValidOperation()) return CustomResponse();

            await PersistData();
            return CustomResponse();
        }

        [HttpPut("cart/{productId}")]
        public async Task<IActionResult> UpdateItemCart(Guid produtoId, ItemCart item)
        {
            var carrinho = await GetCartClient();
            var itemCarrinho = await GetItemProductValid(produtoId, carrinho, item);
            if (itemCarrinho == null) return CustomResponse();

            carrinho.UpdateUnity(itemCarrinho, item.Quantity);

            ValidCart(carrinho);
            if (!ValidOperation()) return CustomResponse();

            _context.ItemCarts.Update(itemCarrinho);
            _context.ClientCarts.Update(carrinho);

            await PersistData();
            return CustomResponse();
        }

        [HttpDelete("cart/{productId}")]
        public async Task<IActionResult> RemoveItemCart(Guid produtoId)
        {
            var carrinho = await GetCartClient();

            var itemCarrinho = await GetItemProductValid(produtoId, carrinho);
            if (itemCarrinho == null) return CustomResponse();

            ValidCart(carrinho);
            if (!ValidOperation()) return CustomResponse();

            carrinho.RemoverItem(itemCarrinho);

            _context.ItemCarts.Remove(itemCarrinho);
            _context.ClientCarts.Update(carrinho);

            await PersistData();
            return CustomResponse();
        }

        [HttpPost]
        [Route("cart/apply-voucher")]
        public async Task<IActionResult> ApplyVoucher(Voucher voucher)
        {
            var carrinho = await GetCartClient();

            carrinho.ApplyVoucher(voucher);

            _context.ClientCarts.Update(carrinho);

            await PersistData();
            return CustomResponse();
        }

        private async Task<ClientCart> GetCartClient()
        {
            return await _context.ClientCarts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.ClientId == _user.ObterUserId());
        }
        private void ManipulateNewcart(ItemCart item)
        {
            var carrinho = new ClientCart(_user.ObterUserId());
            carrinho.AddItem(item);

            ValidCart(carrinho);
            _context.ClientCarts.Add(carrinho);
        }
        private void ManipulateExistingCart(ClientCart cart, ItemCart item)
        {
            var produtoItemExistente = cart.CartExistingItem(item);

            cart.AddItem(item);
            ValidCart(cart);

            if (produtoItemExistente)
            {
                _context.ItemCarts.Update(cart.GetProductById(item.ProductId));
            }
            else
            {
                _context.ItemCarts.Add(item);
            }

            _context.ClientCarts.Update(cart);
        }
        private async Task<ItemCart> GetItemProductValid(Guid produtoId, ClientCart carrinho, ItemCart item = null)
        {
            if (item != null && produtoId != item.ProductId)
            {
                AddErrorProcessing("O item não corresponde ao informado");
                return null;
            }

            if (carrinho == null)
            {
                AddErrorProcessing("Carrinho não encontrado");
                return null;
            }

            var itemCarrinho = await _context.ItemCarts
                .FirstOrDefaultAsync(i => i.CarrinhoId == carrinho.Id && i.ProductId == produtoId);

            if (itemCarrinho == null || !carrinho.CartExistingItem(itemCarrinho))
            {
                AddErrorProcessing("O item não está no carrinho");
                return null;
            }

            return itemCarrinho;
        }
        private async Task PersistData()
        {
            var result = await _context.SaveChangesAsync();
            if (result <= 0) AddErrorProcessing("Não foi possível persistir os dados no banco");
        }
        private bool ValidCart (ClientCart carrinho)
        {
            if (carrinho.isValid()) return true;

            carrinho.ValidationResult.Errors.ToList().ForEach(e => AddErrorProcessing(e.ErrorMessage));
            return false;
        }
    }
}
