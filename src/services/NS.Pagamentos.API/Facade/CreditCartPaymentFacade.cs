using Microsoft.Extensions.Options;
using NS.Pagamentos.API.Models;
using NS.Pagamentos.Facade;
using NS.Pagamentos.NerdPag;

namespace NS.Pagamentos.CardAntiCorruption
{
    public class CreditCartPaymentFacade : IPaymentFacade
    {
        private readonly PaymentConfig _pagamentoConfig;

        public CreditCartPaymentFacade(IOptions<PaymentConfig> paymentConfig)
        {
            _pagamentoConfig = paymentConfig.Value;
        }

        public async Task<Transactions> AuthorizePayment(Payment payment)
        {
            var nerdsPagSvc = new NerdsPagService(_pagamentoConfig.DefaultApiKey,
                _pagamentoConfig.DefaultEncryptionKey);

            var cardHashGen = new CardHash(nerdsPagSvc)
            {
                CardNumber = payment.CreditCard.CardNumber,
                CardHolderName = payment.CreditCard.CardName,
                CardExpirationDate = payment.CreditCard.MonthOfYear,
                CardCvv = payment.CreditCard.CVV
            };
            var cardHash = cardHashGen.Generate();

            var transaction = new Transaction(nerdsPagSvc)
            {
                CardHash = cardHash,
                CardNumber = payment.CreditCard.CardNumber,
                CardHolderName = payment.CreditCard.CardName,
                CardExpirationDate = payment.CreditCard.MonthOfYear,
                CardCvv = payment.CreditCard.CVV,
                PaymentMethod = PaymentMethod.CreditCard,
                Amount = payment.Value
            };

            return ForTransaction(await transaction.AuthorizeCardTransaction());
        }

        public async Task<Transactions> CatchPayment(Transactions transaction)
        {
            var nerdsPagSvc = new NerdsPagService(_pagamentoConfig.DefaultApiKey,
                _pagamentoConfig.DefaultEncryptionKey);

            var response = ForTransactionServ(transaction, nerdsPagSvc);

            return ForTransaction(await response.CaptureCardTransaction());
        }

        public async Task<Transactions> CancelAuthorized(Transactions transaction)
        {
            var nerdsPagSvc = new NerdsPagService(_pagamentoConfig.DefaultApiKey,
                _pagamentoConfig.DefaultEncryptionKey);

            var response = ForTransactionServ(transaction, nerdsPagSvc);

            return ForTransaction(await response.CancelAuthorization());
        }

        public static Transactions ForTransaction(Transaction transaction)
        {
            return new Transactions
            {
                Id = Guid.NewGuid(),
                Status = (StatusTransaction)transaction.Status,
                ValueTotal = transaction.Amount,
                FlagCard = transaction.CardBrand,
                AuthorizationCode = transaction.AuthorizationCode,
                CostTransaction = transaction.Cost,
                DateTransaction = transaction.TransactionDate,
                NSU = transaction.Nsu,
                TID = transaction.Tid
            };
        }

        public static Transaction ForTransactionServ(Transactions transaction, NerdsPagService nerdsPagService)
        {
            return new Transaction(nerdsPagService)
            {
                Status = (TransactionStatus)transaction.Status,
                Amount = transaction.ValueTotal,
                CardBrand = transaction.FlagCard,
                AuthorizationCode = transaction.AuthorizationCode,
                Cost = transaction.CostTransaction,
                Nsu = transaction.NSU,
                Tid = transaction.TID
            };
        }
    }
}