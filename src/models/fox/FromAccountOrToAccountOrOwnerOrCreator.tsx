import { User } from "./User";

export interface FromAccountOrToAccountOrOwnerOrCreator {
  user: User;
  profile_img_url: string;
  address: string;
  config: string;
}
