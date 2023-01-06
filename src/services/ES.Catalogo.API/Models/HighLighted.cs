using NS.Catalogo.API.Models;
using NS.Core.DomainObjects;

namespace NS.Catalog.API.Models
{
    public class HighLighted : Entity, IAggregateRoot
    {
        public string Name { get; set; }
        public string Image { get; set; }
        public decimal Value { get; set; }
        public bool Active { get; set; }
        public bool Highlighted { get; set; }
        public ProductType ProductType { get; set; }
        public ProductCategory ProductCategory { get; set; }

    }
}
