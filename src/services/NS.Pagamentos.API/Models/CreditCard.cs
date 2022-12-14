namespace NS.Pagamentos.API.Models
{
    public class CreditCard
    {
        public string CardName { get; set; }
        public string CardNumber { get; set; }
        public string MonthOfYear { get; set; }
        public string CVV { get; set; }

        protected CreditCard() { }

        public CreditCard(string cardName, string cardNumber, string monthOfYear, string cvv)
        {
            CardName = cardName;
            CardNumber = cardNumber;
            MonthOfYear = monthOfYear;
            CVV = cvv;
        }
    }
}