using FluentValidation;
using NS.Core.Messages;

namespace NS.Clientes.API.Application.Commands
{
    public class AddAddressCommand : Command
    {
        public Guid ClientId { get; set; }
        public string PublicPlace { get; private set; }
        public string Number { get; private set; }
        public string Complement { get; private set; }
        public string Neighborhood { get; private set; }
        public string Cep { get; private set; }
        public string City { get; private set; }
        public string State { get; private set; }

        public AddAddressCommand()
        {
        }

        public AddAddressCommand(Guid clientId, string publicPlace, string number, string complement,
            string neighborhood, string cep, string city, string state)
        {
            AggregateId = clientId;
            ClientId = clientId;
            PublicPlace = publicPlace;
            Number = number;
            Complement = complement;
            Neighborhood = neighborhood;
            Cep = cep;
            City = city;
            State = state;
        }

        public override bool IsValid()
        {
            ValidationResult = new EnderecoValidation().Validate(this);
            return ValidationResult.IsValid;
        }

        public class EnderecoValidation : AbstractValidator<AddAddressCommand>
        {
            public EnderecoValidation()
            {
                RuleFor(c => c.PublicPlace)
                    .NotEmpty()
                    .WithMessage("Informe o Logradouro");

                RuleFor(c => c.Number)
                    .NotEmpty()
                    .WithMessage("Informe o Número");

                RuleFor(c => c.Cep)
                    .NotEmpty()
                    .WithMessage("Informe o CEP");

                RuleFor(c => c.Neighborhood)
                    .NotEmpty()
                    .WithMessage("Informe o Bairro");

                RuleFor(c => c.City)
                    .NotEmpty()
                    .WithMessage("Informe o Cidade");

                RuleFor(c => c.State)
                    .NotEmpty()
                    .WithMessage("Informe o Estado");
            }
        }
    }
}