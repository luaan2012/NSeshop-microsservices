using Grpc.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using NS.APICore.User;
using NS.Carrinho.API.Data;
using NS.Carrinho.API.Model;

namespace NS.Carrinho.API.Services.gRPC
{
    [Authorize]
    public class CartGrpcService : ShoppingCart.ShoppingCartBase
    {
        private readonly ILogger<CartGrpcService> _logger;

        private readonly IAspNetUser _user;
        private readonly CartContext _context;

        public CartGrpcService(
            ILogger<CartGrpcService> logger,
            IAspNetUser user,
            CartContext context)
        {
            _logger = logger;
            _user = user;
            _context = context;
        }

        public override async Task<ClientCartResponse> GetCart(GetCartRequest request, ServerCallContext context)
        {
            _logger.LogInformation("Chamando ObterCarrinho");

            var cart = await GetCartClient() ?? new ClientCart();

            return MapCartClientToProtoResponse(cart);
        }

        private async Task<ClientCart> GetCartClient()
        {
            return await _context.ClientCarts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.ClientId == _user.ObterUserId());
        }

        private static ClientCartResponse MapCartClientToProtoResponse(ClientCart carrinho)
        {
            var carrinhoProto = new ClientCartResponse
            {
                Id = carrinho.Id.ToString(),
                Clientid = carrinho.ClientId.ToString(),
                Valuetotal = (double?)carrinho.ValueTotal ?? 0,
                Discount = (double?)carrinho.Discount ?? 0,
                Voucherused = carrinho.UsedVoucher,
            };

            if (carrinho.Voucher != null)
            {
                carrinhoProto.Voucher = new VoucherResponse
                {
                    Code = carrinho.Voucher.Code,
                    Percentage = (double?)carrinho?.Voucher?.Percentage ?? 0,
                    Valuediscount = (double?)carrinho?.Voucher?.ValueDiscount ?? 0,
                    Typediscount = (int?)carrinho?.Voucher?.TypeDiscount ?? 0
                };
            }

            foreach (var item in carrinho.Items)
            {
                carrinhoProto.Items.Add(new ItemCartResponse
                {
                    Id = item.Id.ToString(),
                    Name = item.Name,
                    Image = item.Image,
                    Productid = item.ProductId.ToString(),
                    Quantity = item.Quantity,
                    Value = (double)item.Value
                });
            }

            return carrinhoProto;
        }
    }
}