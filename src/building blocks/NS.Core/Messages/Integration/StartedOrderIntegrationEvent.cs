namespace NS.Core.Messages.Integration
{
    public class StartedOrderIntegrationEvent : IntegrationEvent
    {
        public Guid ClientId { get; set; }
        public Guid OrderId { get; set; }
        public int TypePayment { get; set; }
        public decimal Value { get; set; }

        public string CartName { get; set; }
        public string CartNumber { get; set; }
        public string MounthOfYear { get; set; }
        public string CVV { get; set; }
    }
}