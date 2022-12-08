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
    public class WishListController : MainController
    {
        private readonly IAspNetUser _user;
        private readonly WishListContext _context;

        public WishListController(IAspNetUser user, WishListContext context)
        {
            _user = user;
            _context = context;
        }

        [HttpGet("wishlist")]
        public async Task<ClientWishList> GetWishList()
        {
            return await GetWishListClient() ?? new ClientWishList();
        }

        [HttpPost("wishlist")]
        public async Task<IActionResult> AddItemCart(ItemWishList item)
        {
            var wishList = await GetWishListClient();

            if (wishList == null)
                ManipulateNewcart(item);
            else
                ManipulateExistingCart(wishList, item);

            if (!ValidOperation()) return CustomResponse();

            await PersistData();
            return CustomResponse();
        }

        [HttpDelete("wishlist/{productId}")]
        public async Task<IActionResult> RemoveItemCart(Guid productId)
        {
            var wishList = await GetWishListClient();

            var itemWishList = await GetItemProductValid(productId, wishList);

            if (itemWishList == null) return CustomResponse();

            ValidCart(wishList);

            if (!ValidOperation()) return CustomResponse();

            wishList.RemoverItem(itemWishList);

            _context.ItemWishLists.Remove(itemWishList);
            _context.ClientWishLists.Update(wishList);

            await PersistData();
            return CustomResponse();
        }

        [HttpDelete("wishlist/removeWishList")]
        public async Task<IActionResult> RemoveCart()
        {
            var wishList = await GetWishListClient();

            _context.ClientWishLists.Remove(wishList);

            await PersistData();
            return CustomResponse();
        }

        private async Task<ClientWishList> GetWishListClient()
        {
            return await _context.ClientWishLists
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.ClientWishListId == _user.ObterUserId());
        }

        private void ManipulateNewcart(ItemWishList item)
        {
            var wishList = new ClientWishList(_user.ObterUserId());
            wishList.AddItem(item);

            ValidCart(wishList);
            _context.ClientWishLists.Add(wishList);
        }
        private void ManipulateExistingCart(ClientWishList wishList, ItemWishList item)
        {
            var productItemExisting = wishList.WishListExistingItem(item);

            wishList.AddItem(item);
            ValidCart(wishList);

            if (productItemExisting)
            {
                _context.ItemWishLists.Update(wishList.GetProductById(item.ProductId));
            }
            else
            {
                _context.ItemWishLists.Add(item);
            }

            _context.ClientWishLists.Update(wishList);
        }
        private async Task<ItemWishList> GetItemProductValid(Guid productId, ClientWishList wishList, ItemWishList item = null)
        {
            if (item != null && productId != item.ProductId)
            {
                AddErrorProcessing("O item não corresponde ao informado");
                return null;
            }

            if (wishList == null)
            {
                AddErrorProcessing("Carrinho não encontrado");
                return null;
            }

            var itemWishList = await _context.ItemWishLists
                .FirstOrDefaultAsync(i => i.WishListId == wishList.Id && i.ProductId == productId);

            if (itemWishList == null || !wishList.WishListExistingItem(itemWishList))
            {
                AddErrorProcessing("O item não está no carrinho");
                return null;
            }

            return itemWishList;
        }

        private async Task PersistData()
        {
            var result = await _context.SaveChangesAsync();
            if (result <= 0) AddErrorProcessing("Não foi possível persistir os dados no banco");
        }

        private bool ValidCart(ClientWishList wishList)
        {
            if (wishList.isValid()) return true;

            wishList.ValidationResult.Errors.ToList().ForEach(e => AddErrorProcessing(e.ErrorMessage));
            return false;
        }
    }
}
