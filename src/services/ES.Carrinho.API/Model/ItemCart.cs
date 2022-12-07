using System.Text.Json.Serialization;
using FluentValidation;

namespace NS.Carrinho.API.Model
{
    public class ItemCart
    {
        public ItemCart()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public decimal Value { get; set; }
        public string Image { get; set; }

        public Guid CarrinhoId { get; set; }

        [JsonIgnore]
        public ClientCart ClientCart { get; set; }

        internal void AssociateCart(Guid carrinhoId)
        {
            CarrinhoId = carrinhoId;
        }

        internal decimal CalculateValue()
        {
            return Quantity * Value;
        }

        internal void AddUnity(int unity)
        {
            Quantity += unity;
        }

        internal void UpdateUnity(int unity)
        {
            Quantity = unity;
        }

        internal bool IsValid()
        {
            return new ItemCarrinhoValidation().Validate(this).IsValid;
        }

        public class ItemCarrinhoValidation : AbstractValidator<ItemCart>
        {
            public ItemCarrinhoValidation()
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

                //RuleFor(c => c.Quantity)
                //    .LessThanOrEqualTo(ClientCart.MAX_QUANTIDADE_ITEM)
                //    .WithMessage(item => $"A quantidade máxima do {item.Name} é {ClientCart.MAX_QUANTIDADE_ITEM}");

                RuleFor(c => c.Value)
                    .GreaterThan(0)
                    .WithMessage(item => $"O valor do {item.Name} precisa ser maior que 0");
            }
        }
    }
}