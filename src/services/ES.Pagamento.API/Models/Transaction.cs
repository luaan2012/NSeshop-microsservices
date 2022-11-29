using NS.Core.DomainObjects;

namespace NS.Pagamentos.API.Models
{
    public class Transactions : Entity
    {
        public string AuthorizationCode { get; set; }
        public string FlagCard { get; set; }
        public DateTime? DateTransaction { get; set; }
        public decimal ValueTotal { get; set; }
        public decimal CostTransaction { get; set; }
        public StatusTransaction Status { get; set; }
        public string TID { get; set; } // Id
        public string NSU { get; set; } // Meio (paypal)
        public Guid PaymentId { get; set; }

        // EF Relation
        public Payment Payment{ get; set; }
    }
}