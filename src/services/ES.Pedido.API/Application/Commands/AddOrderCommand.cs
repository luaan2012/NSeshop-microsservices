using FluentValidation;
using NS.Core.Messages;
using NS.Pedidos.API.Application.DTO;


namespace NS.Pedidos.API.Application.Commands
{
    public class AddOrderCommand : Command
    {
        // Pedido
        public Guid ClientId { get; set; }
        public decimal ValueTotal { get; set; }
        public List<ItemOrderDTO> OrderItems { get; set; }

        // Voucher
        public string VoucherCode { get; set; }
        public bool VoucherUsed { get; set; }
        public decimal Discount { get; set; }

        // Endereco
        public AddressDTO Address { get; set; }

        // Cartao
        public string CardNumber { get; set; }
        public string CardName { get; set; }
        public string CardExpiration { get; set; }
        public string CvvCard { get; set; }

        public override bool IsValid()
        {
            ValidationResult = new AddOrderValidation().Validate(this);
            return ValidationResult.IsValid;
        }

        public class AddOrderValidation : AbstractValidator<AddOrderCommand>
        {
            public AddOrderValidation()
            {
                RuleFor(c => c.ClientId)
                    .NotEqual(Guid.Empty)
                    .WithMessage("Id do cliente inválido");

                RuleFor(c => c.OrderItems.Count)
                    .GreaterThan(0)
                    .WithMessage("O pedido precisa ter no mínimo 1 item");

                RuleFor(c => c.ValueTotal)
                    .GreaterThan(0)
                    .WithMessage("Valor do pedido inválido");

                RuleFor(c => c.CardNumber)
                    .CreditCard()
                    .WithMessage("Número de cartão inválido");

                RuleFor(c => c.CardName)
                    .NotNull()
                    .WithMessage("Nome do portador do cartão requerido.");

                RuleFor(c => c.CvvCard.Length)
                    .GreaterThan(2)
                    .LessThan(5)
                    .WithMessage("O CVV do cartão precisa ter 3 ou 4 números.");

                RuleFor(c => c.CardExpiration)
                    .NotNull()
                    .WithMessage("Data expiração do cartão requerida.");
            }
        }
    }
}