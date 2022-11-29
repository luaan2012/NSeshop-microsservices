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

            var transacao = new Transaction(nerdsPagSvc)
            {
                CardHash = cardHash,
                CardNumber = payment.CreditCard.CardNumber,
                CardHolderName = payment.CreditCard.CardName,
                CardExpirationDate = payment.CreditCard.MonthOfYear,
                CardCvv = payment.CreditCard.CVV,
                PaymentMethod = PaymentMethod.CreditCard,
                Amount = payment.Value
            };

            return ForTransaction(await transacao.AuthorizeCardTransaction());
        }

        public async Task<Transactions> CatchPayment(Transactions transacao)
        {
            var nerdsPagSvc = new NerdsPagService(_pagamentoConfig.DefaultApiKey,
                _pagamentoConfig.DefaultEncryptionKey);

            var transaction = ForTransactionServ(transacao, nerdsPagSvc);

            return ForTransaction(await transaction.CaptureCardTransaction());
        }

        public async Task<Transactions> CancelAuthorized(Transactions transacao)
        {
            var nerdsPagSvc = new NerdsPagService(_pagamentoConfig.DefaultApiKey,
                _pagamentoConfig.DefaultEncryptionKey);

            var transaction = ForTransactionServ(transacao, nerdsPagSvc);

            return ForTransaction(await transaction.CancelAuthorization());
        }

        public static Transactions ForTransaction(Transaction transaction)
        {
            return new Transactions
            {
                Id = Guid.NewGuid(),
                Status = (StatusTransaction) transaction.Status,
                ValueTotal = transaction.Amount,
                FlagCard = transaction.CardBrand,
                AuthorizationCode = transaction.AuthorizationCode,
                CostTransaction = transaction.Cost,
                DateTransaction = transaction.TransactionDate,
                NSU = transaction.Nsu,
                TID = transaction.Tid
            };
        }

        public static Transaction ForTransactionServ(Transactions transacao, NerdsPagService nerdsPagService)
        {
            return new Transaction(nerdsPagService)
            {
                Status = (TransactionStatus) transacao.Status,
                Amount = transacao.ValueTotal,
                CardBrand = transacao.FlagCard,
                AuthorizationCode = transacao.AuthorizationCode,
                Cost = transacao.CostTransaction,
                Nsu = transacao.NSU,
                Tid = transacao.TID
            };
        }
    }
}