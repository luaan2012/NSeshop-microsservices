using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NS.Pagamentos.API.Models;

namespace NS.Clientes.API.Data.Mappings
{
    public class TransactionMapping : IEntityTypeConfiguration<Transactions>
    {
        public void Configure(EntityTypeBuilder<Transactions> builder)
        {
            builder.HasKey(c => c.Id);

            // 1 : N => Pagamento : Transacao
            builder.HasOne(c => c.Payment)
                .WithMany(c => c.Transactions);

            builder.ToTable("Transactions");
        }
    }
}