namespace NS.WebMVC.Models
{
    public class ProductViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int QuantityStock { get; set; }
        public decimal Value { get; set; }
        public bool Highlighted { get; set; }
        public bool Active { get; set; }
        public ProductType ProductType { get; set; }
        public DateTime DataRegister { get; set; }
    }
}