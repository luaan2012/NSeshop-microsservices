import { Address } from "./client";
import { Products } from "./produto";

export interface OrderTransaction {
  valueTotal: number,
  discount: number,
  voucherCode: string,
  voucherUsed: boolean,
  items: Products[]
  address: Address,
  cardNumber: string,
  cardName: string,
  cardExpiration: string,
  cvvCard: string
}

export interface OrderFinished {
  status: number,
  code: number,
  data: string,
  valuetotal: number,
  discount: number,
  voucherCode: string,
  voucherUsed: boolean,
  items: Products[]
  address: Address
}
