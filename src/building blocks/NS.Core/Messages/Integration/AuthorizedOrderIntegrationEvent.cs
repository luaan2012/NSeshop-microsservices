namespace NS.Core.Messages.Integration
{
    public class AuthorizedOrderIntegrationEvent : IntegrationEvent
    {
        public Guid ClienteId { get; private set; }
        public Guid PedidoId { get; private set; }
        public IDictionary<Guid, int> Items { get; private set; }

        public AuthorizedOrderIntegrationEvent(Guid clientId, Guid orderId, IDictionary<Guid, int> items)
        {
            ClienteId = clientId;
            PedidoId = orderId;
            Items = items;
        }
    }
}