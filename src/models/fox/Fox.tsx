export interface Fox {
  image: string;
  tokenId: number;
  description: string;
  name: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}
