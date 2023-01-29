export interface Products {
    name: string,
    description: string,
    image: string,
    value: number,
    active: boolean,
    highlighted: boolean,
    productType: number,
    dateRegister: Date,
    id: string,
    quantityStock: number,
    productCategory: number,
    productId: string,
    quantity: number,
    wishList: string;
}

export interface Cart {
  discount: number,
  valueTotal: number,
  voucher: string,
  voucherUsed: boolean,
  items: Products[]
}
