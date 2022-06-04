import { Asset } from "./Asset";
import { PaymentToken } from "./PaymentToken";
import { Transaction } from "./Transaction";

export interface LastSale {
  asset: Asset;
  asset_bundle?: null;
  event_type: string;
  event_timestamp: string;
  auction_type?: null;
  total_price: string;
  payment_token: PaymentToken;
  transaction: Transaction;
  created_date: string;
  quantity: string;
}
