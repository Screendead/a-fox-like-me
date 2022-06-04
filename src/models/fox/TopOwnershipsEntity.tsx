import { FromAccountOrToAccountOrOwnerOrCreator } from "./FromAccountOrToAccountOrOwnerOrCreator";

export interface TopOwnershipsEntity {
  owner: FromAccountOrToAccountOrOwnerOrCreator;
  quantity: string;
}
