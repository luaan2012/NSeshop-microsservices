using FluentValidation.Results;
using MediatR;
using NS.Clientes.API.Application.Events;
using NS.Core.Messages;
using NS.Clients.API.Application.Commands;
using NS.Clientes.API.Data.Interface;
using NS.Cliente.API.Models;

namespace NS.Clientes.API.Application.Commands
{
    public class ClientCommandHandler : CommandHandler,
        IRequestHandler<RegisterClientCommand, ValidationResult>,
        IRequestHandler<AddAddressCommand, ValidationResult>
    {
        private readonly IClientRepository _clienteRepository;

        public ClientCommandHandler(IClientRepository clienteRepository)
        {
            _clienteRepository = clienteRepository;
        }
        
        public async Task<ValidationResult> Handle(RegisterClientCommand message, CancellationToken cancellationToken)
        {
            if (!message.IsValid()) return message.ValidationResult;

            var client = new Client(message.Id, message.Name, message.Email, message.Cpf);

            var existClient = await _clienteRepository.GiveByCpf(client.Cpf.Number);

            if (existClient != null)
            {
                AddError("Este CPF já está em uso.");
                return ValidationResult;
            }

            _clienteRepository.Add(client);

            client.AddEvent(new ClientRegistradoEvent(message.Id, message.Name, message.Email, message.Cpf));

            return await PersistData(_clienteRepository.UnitOfWork);
        }

        public async Task<ValidationResult> Handle(AddAddressCommand message, CancellationToken cancellationToken)
        {
            if (!message.IsValid()) return message.ValidationResult;

            var address = new Address(message.PublicPlace, message.Number, message.Complement, message.Neighborhood, message.Cep, message.City, message.State, message.ClientId);
            _clienteRepository.AddAddress(address);

            return await PersistData(_clienteRepository.UnitOfWork);
        }
    }
}