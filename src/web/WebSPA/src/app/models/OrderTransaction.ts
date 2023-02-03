import { Address } from "./client";
import { Products } from "./produto";

export interface OrderTransaction {
  valueTotal: number,
  discount: number,
  voucherCode: string,
  voucherUsed: string,
  Items: Products[]
  address: Address,
  cardNumber: string,
  cardName: string,
  cardExpiration: string,
  cvvCard: string
}
