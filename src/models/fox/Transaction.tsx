import { FromAccountOrToAccountOrOwnerOrCreator } from "./FromAccountOrToAccountOrOwnerOrCreator";

export interface Transaction {
  block_hash: string;
  block_number: string;
  from_account: FromAccountOrToAccountOrOwnerOrCreator;
  id: number;
  timestamp: string;
  to_account: FromAccountOrToAccountOrOwnerOrCreator;
  transaction_hash: string;
  transaction_index: string;
}
