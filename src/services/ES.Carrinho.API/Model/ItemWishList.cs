using FluentValidation;
using System.Text.Json.Serialization;

namespace NS.Carrinho.API.Model
{
    public class ItemWishList 
    {
        internal const int MAX_QUANTIDADE_ITEM = 1;

        public ItemWishList()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public Guid WishListId { get; set; }

        [JsonIgnore]
        public ClientWishList ClientWishList { get; set; }

        internal void AssociateCart(Guid wishListId)
        {
            WishListId = wishListId;
        }

        internal void AddUnity(int unity)
        {
            Quantity += unity;
        }

        internal bool IsValid()
        {
            return new ItemWishListValidation().Validate(this).IsValid;
        }

        public class ItemWishListValidation : AbstractValidator<ItemWishList>
        {
            public ItemWishListValidation()
            {
                RuleFor(c => c.ProductId)
                    .NotEqual(Guid.Empty)
                    .WithMessage("Id do produto inválido");

                RuleFor(c => c.Name)
                    .NotEmpty()
                    .WithMessage("O nome do produto não foi informado");

                RuleFor(c => c.Quantity)
                    .GreaterThan(0)
                    .WithMessage(item => $"A quantidade miníma para o {item.Name} é 1");

                RuleFor(c => c.Quantity)
                    .LessThanOrEqualTo(ItemWishList.MAX_QUANTIDADE_ITEM)
                    .WithMessage(item => $"A quantidade máxima do {item.Name} é {ItemWishList.MAX_QUANTIDADE_ITEM}");
            }
        }
    }
}
