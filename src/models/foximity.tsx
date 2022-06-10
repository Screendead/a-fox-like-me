import { Fox } from './fox/Fox';
import { Foximity } from './fox/Foximity';
import foxesJSON from './foxes.json';

const foxes = foxesJSON.map(fox => fox as Fox);

export function foximity(tokenID: number): Foximity[] {
  let seen: {[key: string]: boolean} = {};

  const myFox = foxes.find(fox => fox.tokenId === tokenID);

  if (!myFox) {
    return [];
  }

  let myPhilosophy = myFox.attributes?.find(trait => trait.trait_type === 'Philosophy');
  let mySpecies = myFox.attributes?.find(trait => trait.trait_type === 'Species');
  let myFur = myFox.attributes?.find(trait => trait.trait_type === 'Fur');
  let myVirtues = myFox.attributes?.filter(trait => trait.trait_type === 'Virtues') ?? [];
  let myBaggage = myFox.attributes?.filter(trait => trait.trait_type === 'Baggage') ?? [];
  let myHasSecret = myFox.attributes?.find(trait => trait.trait_type === 'Has Secret?');

  let maxProximity = 5 + 3 + 2 + myVirtues.length * 1 + myBaggage.length * 1 + 1;

  return foxes
    .filter(function(item) {
      return seen.hasOwnProperty(item.tokenId) ? false : (seen[item.tokenId] = true);
    })
    .map(fox => {
      let proximity = 0;

      let theirPhilosophy = fox.attributes?.find(trait => trait.trait_type === 'Philosophy');
      let theirSpecies = fox.attributes?.find(trait => trait.trait_type === 'Species');
      let theirFur = fox.attributes?.find(trait => trait.trait_type === 'Fur');
      let theirVirtues = fox.attributes?.filter(trait => trait.trait_type === 'Virtues') ?? [];
      let theirBaggage = fox.attributes?.filter(trait => trait.trait_type === 'Baggage') ?? [];
      let theirHasSecret = fox.attributes?.find(trait => trait.trait_type === 'Has Secret?');

      if (myPhilosophy?.value === theirPhilosophy?.value) {
        proximity += 5;
      }

      if (mySpecies?.value === theirSpecies?.value) {
        proximity += 3;
      }

      if (myFur?.value === theirFur?.value) {
        proximity += 2;
      }

      for (let virtue of myVirtues ?? []) {
        if (theirVirtues?.map(v => v.value).includes(virtue.value)) {
          proximity += 1;
        }
      }

      for (let baggage of myBaggage ?? []) {
        if (theirBaggage?.map(b => b.value).includes(baggage.value)) {
          proximity += 1;
        }
      }

      if (myHasSecret?.value === theirHasSecret?.value) {
        proximity += 1;
      }

      return {
        fox,
        proximity,
        proximityPercentage: Math.round(proximity / maxProximity * 10000) / 100,
      };
    })
    .sort((a, b) => b.proximityPercentage - a.proximityPercentage);
}
