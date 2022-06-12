import { Fox } from './fox/Fox';
import { Foximity } from './fox/Foximity';
import foxesJSON from '../data/data.json';

export const NAME_WEIGHT        = 0.009672;
export const SPACES_WEIGHT      = 0.010123;
export const PUNCTUATION_WEIGHT = 0.011233;

export const PHILOSOPHY_VALUE   = 6.034573;
export const SPECIES_VALUE      = 4.945739;
export const FUR_VALUE          = 2.989221;
export const VIRTUE_VALUE       = 2.041223;
export const BAGGAGE_VALUE      = 2.148235;
export const SECRET_VALUE       = 1.908723;

const foxes = foxesJSON.map(fox => fox as Fox);

export function foximity(tokenID: string): Foximity[] {
  console.time('foximity');

  let seen: {[key: string]: boolean} = {};

  const myFox = foxes.find(fox => fox.tokenId === tokenID);

  if (!myFox) {
    console.error('No fox found with tokenID', tokenID);
    return [];
  }

  let myPhilosophy  = myFox.attributes?.find  (trait => trait.trait_type === 'Philosophy');
  let mySpecies     = myFox.attributes?.find  (trait => trait.trait_type === 'Species');
  let myFur         = myFox.attributes?.find  (trait => trait.trait_type === 'Fur');
  let myVirtues     = myFox.attributes?.filter(trait => trait.trait_type === 'Virtues') ?? [];
  let myBaggage     = myFox.attributes?.filter(trait => trait.trait_type === 'Baggage') ?? [];
  let myHasSecret   = myFox.attributes?.find  (trait => trait.trait_type === 'Has Secret?');

  let mySpaces = (myFox.name.match(/\s/g) || []).length;
  let myPunctuation = (myFox.name.match(/\W/g) || []).filter(str => str !== ' ').length;

  let maxNameDiff        = Math.max(myFox.name.length, 50 - myFox.name.length + 1) - 2;
  let maxSpacesDiff      = Math.max(mySpaces, 10 - mySpaces) - 0;
  let maxPunctuationDiff = Math.max(myPunctuation, 6 - myPunctuation) - 0;

  let maxProximity = PHILOSOPHY_VALUE * (myPhilosophy ? 1 : 0)
      + SPECIES_VALUE * (mySpecies ? 1 : 0)
      + FUR_VALUE * (myFur ? 1 : 0)
      + myVirtues.length * VIRTUE_VALUE
      + myBaggage.length * BAGGAGE_VALUE
      + SECRET_VALUE * (myHasSecret ? 1 : 0)
      + NAME_WEIGHT * maxNameDiff // Min name length is 2, max is 50
      + SPACES_WEIGHT * maxSpacesDiff // Min spaces is 0, max is 10
      + PUNCTUATION_WEIGHT * maxPunctuationDiff; // Min punctuation is 0, max is 9

  let result = foxes
    .filter(function(item) {
      return seen.hasOwnProperty(item.tokenId) ? false : (seen[item.tokenId] = true);
    })
    .map(fox => {
      let proximity = 0;

      let theirPhilosophy = fox.attributes?.find  (trait => trait.trait_type === 'Philosophy');
      let theirSpecies    = fox.attributes?.find  (trait => trait.trait_type === 'Species');
      let theirFur        = fox.attributes?.find  (trait => trait.trait_type === 'Fur');
      let theirVirtues    = fox.attributes?.filter(trait => trait.trait_type === 'Virtues') ?? [];
      let theirBaggage    = fox.attributes?.filter(trait => trait.trait_type === 'Baggage') ?? [];
      let theirHasSecret  = fox.attributes?.find  (trait => trait.trait_type === 'Has Secret?');

      let theirSpaces = (fox.name.match(/\s/g) || []).length;
      let theirPunctuation = (fox.name.match(/\W/g) || []).filter(str => str !== ' ').length;

      if (myPhilosophy && myPhilosophy.value === theirPhilosophy?.value) {
        proximity += PHILOSOPHY_VALUE;
      }

      if (mySpecies && mySpecies.value === theirSpecies?.value) {
        proximity += SPECIES_VALUE;
      }

      if (myFur && myFur.value === theirFur?.value) {
        proximity += FUR_VALUE;
      }

      for (let virtue of myVirtues ?? []) {
        if (theirVirtues?.map(v => v.value).includes(virtue.value)) {
          proximity += VIRTUE_VALUE;
        }
      }

      for (let baggage of myBaggage ?? []) {
        if (theirBaggage?.map(b => b.value).includes(baggage.value)) {
          proximity += BAGGAGE_VALUE;
        }
      }

      if (myHasSecret && myHasSecret?.value === theirHasSecret?.value) {
        proximity += SECRET_VALUE;
      }

      proximity += NAME_WEIGHT * (maxNameDiff - Math.abs(myFox.name.length - fox.name.length));
      proximity += SPACES_WEIGHT * (maxSpacesDiff - Math.abs(mySpaces - theirSpaces));
      proximity += PUNCTUATION_WEIGHT * (maxPunctuationDiff - Math.abs(myPunctuation - theirPunctuation));

      proximity = Math.max(proximity, 0);

      return {
        fox,
        tokenID: fox.tokenId.length > 32 ? `G${fox.tokenId.slice(fox.tokenId.length - 8)}` : fox.tokenId,
        proximity,
        proximityPercentage: Math.round(proximity / maxProximity * 100000) / 1000,
      };
    })
    .sort((a, b) => b.proximityPercentage - a.proximityPercentage);

  console.timeEnd('foximity');

  return result;
}
