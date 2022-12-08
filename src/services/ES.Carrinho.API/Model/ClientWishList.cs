using FluentValidation;
using FluentValidation.Results;

namespace NS.Carrinho.API.Model
{
    public class ClientWishList
    {
        public Guid Id { get; set; }
        public Guid ClientWishListId { get; set; }
        public List<ItemWishList> Items { get; set; } = new List<ItemWishList>();
        public ValidationResult ValidationResult { get; set; }

        public ClientWishList(Guid clientId)
        {
            Id = Guid.NewGuid();
            ClientWishListId = clientId;
        }

        public ClientWishList() { }

        internal bool WishListExistingItem(ItemWishList item)
        {
            return Items.Any(p => p.ProductId == item.ProductId);
        }

        internal ItemWishList GetProductById(Guid produtoId)
        {
            return Items.FirstOrDefault(p => p.ProductId == produtoId);
        }

        internal void AddItem(ItemWishList item)
        {
            item.AssociateCart(Id);

            if (WishListExistingItem(item))
            {
                var itemExistente = GetProductById(item.ProductId);
                itemExistente.AddUnity(item.Quantity);

                item = itemExistente;
                Items.Remove(itemExistente);
            }

            Items.Add(item);
        }

        internal void RemoverItem(ItemWishList item)
        {
            Items.Remove(GetProductById(item.ProductId));
        }

        internal bool isValid()
        {
            var erros = Items.SelectMany(i => new ItemWishList.ItemWishListValidation().Validate(i).Errors).ToList();
            erros.AddRange(new ClientWishListValidation().Validate(this).Errors);
            ValidationResult = new ValidationResult(erros);

            return ValidationResult.IsValid;
        }

        public class ClientWishListValidation : AbstractValidator<ClientWishList>
        {
            public ClientWishListValidation()
            {
                RuleFor(c => c.ClientWishListId)
                    .NotEqual(Guid.Empty)
                    .WithMessage("Cliente não reconhecido");

                RuleFor(c => c.Items.Count)
                    .GreaterThan(0)
                    .WithMessage("A WishList não possui itens");
            }
        }
    }
}
