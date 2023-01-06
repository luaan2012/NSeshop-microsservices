using NS.Catalogo.API.Models;
using NS.Core.DomainObjects;

namespace NS.Catalog.API.Models
{
    public class Product : Entity, IAggregateRoot
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int QuantityStock { get; set; }
        public decimal Value { get; set; }
        public bool Active { get; set; }
        public bool Highlighted { get; set; }
        public ProductType ProductType { get; set; }
        public ProductCategory ProductCategory { get; set; }
        public DateTime DateRegister { get; set; }

        public void WithDrawStock(int quantity)
        {
            if (QuantityStock >= quantity)
                QuantityStock -= quantity;
        }

        public bool IsAvailable(int quantity)
        {
            return Active && QuantityStock >= quantity;
        }
    }
}
