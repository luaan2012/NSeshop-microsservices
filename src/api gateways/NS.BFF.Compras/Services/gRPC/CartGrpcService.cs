using NS.BFF.Compras.Models;
using NS.Carrinho.API.Services.gRPC;

namespace NS.BFF.Compras.Services.gRPC
{
    public interface ICartGrpcService
    {
        Task<CartDTO> GetCart();
    }

    public class CartGrpcService : ICartGrpcService
    {
        private readonly ShoppingCart.ShoppingCartClient _cartShopsClient;

        public CartGrpcService(ShoppingCart.ShoppingCartClient carrinhoComprasClient)
        {
            _cartShopsClient = carrinhoComprasClient;
        }

        public async Task<CartDTO> GetCart()
        {
            var response = await _cartShopsClient.GetCartAsync(new GetCartRequest());
            return MapCartClientToProtoResponse(response);
        }

        private static CartDTO MapCartClientToProtoResponse(ClientCartResponse carrinhoResponse)
        {
            var carrinhoDTO = new CartDTO
            {
                ValueTotal = (decimal)carrinhoResponse.Valuetotal,
                Discount = (decimal)carrinhoResponse.Discount,
                VoucherUsed = carrinhoResponse.Voucherused
            };

            if (carrinhoResponse.Voucher != null)
            {
                carrinhoDTO.Voucher = new VoucherDTO
                {
                    Code = carrinhoResponse.Voucher.Code,
                    Percentage = (decimal?)carrinhoResponse.Voucher.Percentage,
                    ValueDiscount = (decimal?)carrinhoResponse.Voucher.Valuediscount,
                    DiscountType = carrinhoResponse.Voucher.Discounttype
                };
            }

            foreach (var item in carrinhoResponse.Items)
            {
                carrinhoDTO.Items.Add(new ItemCartDTO
                {
                    Name = item.Name,
                    Image = item.Image,
                    ProductId = Guid.Parse(item.Productid),
                    Quantity = item.Quantity,
                    Value = (decimal)item.Value
                });
            }

            return carrinhoDTO;
        }
    }
}