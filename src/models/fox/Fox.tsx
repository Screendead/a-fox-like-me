export interface Fox {
  image: string;
  tokenId: string;
  description: string;
  name: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
};
