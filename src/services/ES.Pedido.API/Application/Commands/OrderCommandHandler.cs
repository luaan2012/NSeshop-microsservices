using FluentValidation.Results;
using MediatR;
using NS.Core.Messages;
using NS.Core.Messages.Integration;
using NS.MessageBus;
using NS.Pedidos.API.Application.Commands;
using NS.Pedidos.API.Application.DTO;
using NS.Pedidos.API.Application.Events;
using NS.Pedidos.Domain;
using NS.Pedidos.Domain.Pedidos;
using NS.Pedidos.Domain.Specs;

namespace NS.Pedidos.API.Application.Commands
{
    public class OrderCommandHandler : CommandHandler,
        IRequestHandler<AddOrderCommand, ValidationResult>
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IVoucherRepository _voucherRepository;
        private readonly IMessageBus _bus;

        public OrderCommandHandler(IVoucherRepository voucherRepository,
                                    IOrderRepository orderRepository,
                                    IMessageBus bus)
        {
            _voucherRepository = voucherRepository;
            _orderRepository = orderRepository;
            _bus = bus;
        }

        public async Task<ValidationResult> Handle(AddOrderCommand message, CancellationToken cancellationToken)
        {
            // Validação do comando
            if (!message.IsValid()) return message.ValidationResult;

            // Mapear Pedido
            var order = MapOrder(message);

            // Aplicar voucher se houver
            if (!await ApplyVoucher(message, order)) return ValidationResult;

            // Validar pedido
            if (!ValidatePedido(order)) return ValidationResult;

            // Processar pagamento
            if (!await ProcessPayment(order, message)) return ValidationResult;

            // Se pagamento tudo ok!
            order.AuthorizeOrder();

            // Adicionar Evento
            order.AddEvent(new OrderRealizedEvent(order.Id, order.ClientId));

            // Adicionar Pedido Repositorio
            _orderRepository.Add(order);

            // Persistir dados de pedido e voucher
            return await PersistData(_orderRepository.UnitOfWork);
        }

        private Order MapOrder(AddOrderCommand message)
        {
            var address = new Address
            {
                PublicPlace = message.Address.PublicPlace,
                Number = message.Address.Number,
                Complement = message.Address.Complement,
                Neighborhood = message.Address.Neighborhood,
                Cep = message.Address.Cep,
                City = message.Address.City,
                State = message.Address.State
            };

            var order = new Order(message.ClientId, message.ValueTotal, message.OrderItems.Select(ItemOrderDTO.ForOrderItem).ToList(),
                message.VoucherUsed, message.Discount);

            order.AssignAddress(address);
            return order;
        }

        private async Task<bool> ApplyVoucher(AddOrderCommand message, Order pedido)
        {
            if (!message.VoucherUsed) return true;

            var voucher = await _voucherRepository.GetVoucherByCode(message.VoucherCode);
            if (voucher == null)
            {
                AddError("O voucher informado não existe!");
                return false;
            }

            var voucherValidation = new VoucherValidation().Validate(voucher);
            if (!voucherValidation.IsValid)
            {
                voucherValidation.Errors.ToList().ForEach(m => AddError(m.ErrorMessage));
                return false;
            }

            pedido.AssignVoucher(voucher);
            voucher.DebitAmount();

            _voucherRepository.Update(voucher);

            return true;
        }

        public bool ValidatePedido(Order order)
        {
            var orderValueOriginal = order.ValueTotal;
            var orderDiscount = order.Discount;

            order.CalculateValueOrder();

            if (order.ValueTotal != orderValueOriginal)
            {
                AddError("O valor total do pedido não confere com o cálculo do pedido");
                return false;
            }

            if (order.Discount != orderDiscount)
            {
                AddError("O valor total não confere com o cálculo do pedido");
                return false;
            }

            return true;
        }

        public async Task<bool> ProcessPayment(Order order, AddOrderCommand message)
        {
            var orderStart = new StartedOrderIntegrationEvent
            {
                OrderId = order.Id,
                ClientId = order.ClientId,
                Value = order.ValueTotal,
                TypePayment = 1, // fixo. Alterar se tiver mais tipos
                CartName = message.CardName,
                CartNumber = message.CardNumber,
                MounthOfYear = message.CardExpiration,
                CVV = message.CvvCard
            };

            var result = await _bus
                .RequestAsync<StartedOrderIntegrationEvent, ResponseMessage>(orderStart);

            if (result.ValidationResult.IsValid) return true;

            foreach (var erro in result.ValidationResult.Errors)
            {
                AddError(erro.ErrorMessage);
            }

            return false;
        }
    }
}
