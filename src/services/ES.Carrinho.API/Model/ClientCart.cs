﻿using FluentValidation;
using FluentValidation.Results;

namespace NS.Carrinho.API.Model
{
    public class ClientCart
    {
        internal const int MAX_QUANTIDADE_ITEM = 5;

        public Guid Id { get; set; }
        public Guid ClientId { get; set; }
        public decimal ValueTotal { get; set; }
        public List<ItemCart> Items { get; set; } = new List<ItemCart>();
        public ValidationResult ValidationResult { get; set; }

        public bool VoucherUsed { get; set; }
        public decimal Discount { get; set; }

        public Voucher Voucher { get; set; }

        public ClientCart(Guid clientId)
        {
            Id = Guid.NewGuid();
            ClientId = clientId;
        }

        public ClientCart() { }

        public void ApplyVoucher(Voucher voucher)
        {
            Voucher = voucher;
            VoucherUsed = true;
            CalculateCartValue();
        }

        public void RemoveVoucher()
        {
            Voucher = null;
            VoucherUsed = false;
            Discount = 0;
            CalculateCartValue();
        }

        internal void CalculateCartValue()
        {
            ValueTotal = Items.Sum(p => p.CalculateValue());
            CalculateTotalValueDiscount();
        }

        private void CalculateTotalValueDiscount()
        {
            if (!VoucherUsed) return;

            decimal discount = 0;
            var value = ValueTotal;

            if (Voucher.DiscountType == DiscountTypeVoucher.Percentage)
            {
                if (Voucher.Percentage.HasValue)
                {
                    discount = (value * Voucher.Percentage.Value) / 100;
                    value -= discount;
                }
            }
            else
            {
                if (Voucher.ValueDiscount.HasValue)
                {
                    discount = Voucher.ValueDiscount.Value;
                    value -= discount;
                }
            }

            ValueTotal = value < 0 ? 0 : value;
            Discount = discount;
        }

        internal bool CartExistingItem(ItemCart item)
        {
            return Items.Any(p => p.ProductId == item.ProductId);
        }

        internal ItemCart GetProductById(Guid produtoId)
        {
            return Items.FirstOrDefault(p => p.ProductId == produtoId);
        }

        internal void AddItem(ItemCart item)
        {
            item.AssociateCart(Id);

            if (CartExistingItem(item))
            {
                var itemExistente = GetProductById(item.ProductId);
                itemExistente.AddUnity(item.Quantity);

                item = itemExistente;
                Items.Remove(itemExistente);
            }

            Items.Add(item);
            CalculateCartValue();
        }

        internal void UpdateItem(ItemCart item)
        {
            item.AssociateCart(Id);

            var itemExistente = GetProductById(item.ProductId);

            Items.Remove(itemExistente);
            Items.Add(item);

            CalculateCartValue();
        }

        internal void UpdateUnity(ItemCart item, int unity)
        {
            item.UpdateUnity(unity);
            UpdateItem(item);
        }

        internal void RemoverItem(ItemCart item)
        {
            Items.Remove(GetProductById(item.ProductId));
            CalculateCartValue();
        }

        internal bool isValid()
        {
            var erros = Items.SelectMany(i => new ItemCart.ItemCarrinhoValidation().Validate(i).Errors).ToList();
            erros.AddRange(new CartClienteValidation().Validate(this).Errors);
            ValidationResult = new ValidationResult(erros);

            return ValidationResult.IsValid;
        }

        public class CartClienteValidation : AbstractValidator<ClientCart>
        {
            public CartClienteValidation()
            {
                RuleFor(c => c.ClientId)
                    .NotEqual(Guid.Empty)
                    .WithMessage("Cliente não reconhecido");

                RuleFor(c => c.Items.Count)
                    .GreaterThan(0)
                    .WithMessage("O carrinho não possui itens");

                RuleFor(c => c.ValueTotal)
                    .GreaterThan(0)
                    .WithMessage("O valor total do carrinho precisa ser maior que 0");
            }
        }
    }
}


