﻿using NS.Core.DomainObjects;

namespace NS.Pedidos.Domain.Pedidos
{
    public class OrderItem : Entity
    {
        public Guid OrderId { get; private set; }
        public Guid ProductId { get; private set; }
        public string ProductName { get; private set; }
        public int Quantity { get; private set; }
        public decimal ValueUnity { get; private set; }
        public string ProductImage { get; set; }

        // EF Rel.
        public Order Order { get; set; }

        public OrderItem(Guid productId, string productName, int quantity, 
            decimal valueUnity, string productImage = null)
        {
            ProductId = productId;
            ProductName = productName;
            Quantity = quantity;
            ValueUnity = valueUnity;
            ProductImage = productImage;
        }

        // EF ctor
        protected OrderItem() { }

        internal decimal CalculateValue()
        {
            return Quantity * ValueUnity;
        }
    }
}