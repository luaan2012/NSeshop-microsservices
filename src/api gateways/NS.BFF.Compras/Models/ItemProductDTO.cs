﻿
namespace NS.BFF.Compras.Models
{
    public class ItemProductDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Value { get; set; }
        public string Image { get; set; }
        public int QuantityStock { get; set; }
    }
}