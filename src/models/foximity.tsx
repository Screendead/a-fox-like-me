import { Fox } from './fox/Fox';
import { Foximity } from './fox/Foximity';
import foxesJSON from '../data/data.json';

export const NAME_WEIGHT         = 0.142671;
export const SPACES_WEIGHT       = 0.150129;
export const PUNCTUATION_WEIGHT  = 0.141237;
export const AVERAGE_WORD_LENGTH = 0.211230;

export const PHILOSOPHY_VALUE    = 5.034573;
export const SPECIES_VALUE       = 4.945739;
export const FUR_VALUE           = 3.989221;
export const VIRTUE_VALUE        = 1.041223;
export const BAGGAGE_VALUE       = 1.148235;
export const SECRET_VALUE        = 0.608723;

const foxes = foxesJSON.map(fox => fox as Fox);

export function foximity(tokenID: string): Foximity[] {
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
  let myAverageWordLength = (myFox.name.match(/[a-zA-Z]+/g) || []).length;

  let maxNameDiff        = Math.max(myFox.name.length, 50 - myFox.name.length + 1) - 2;
  let maxSpacesDiff      = Math.max(mySpaces, 10 - mySpaces);
  let maxPunctuationDiff = Math.max(myPunctuation, 6 - myPunctuation);
  let maxAverageWordLengthDiff = Math.max(myAverageWordLength, 17 - myAverageWordLength + 1) - 1;

  let maxProximity = PHILOSOPHY_VALUE * (myPhilosophy ? 1 : 0)
      + SPECIES_VALUE * (mySpecies ? 1 : 0)
      + FUR_VALUE * (myFur ? 1 : 0)
      + myVirtues.length * VIRTUE_VALUE
      + myBaggage.length * BAGGAGE_VALUE
      + SECRET_VALUE * (myHasSecret ? 1 : 0)
      + NAME_WEIGHT * maxNameDiff // Min name length is 2, max is 50
      + SPACES_WEIGHT * maxSpacesDiff // Min spaces is 0, max is 10
      + PUNCTUATION_WEIGHT * maxPunctuationDiff // Min punctuation is 0, max is 9
      + AVERAGE_WORD_LENGTH * maxAverageWordLengthDiff; // Min average word length is 1, max is 17

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
      let theirAverageWordLength = (fox.name.match(/[a-zA-Z]+/g) || []).length;

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
      proximity += AVERAGE_WORD_LENGTH * (maxAverageWordLengthDiff - Math.abs(myAverageWordLength - theirAverageWordLength));

      proximity = Math.max(proximity, 0);
      proximity = Math.min(proximity, maxProximity);

      return {
        fox,
        tokenID: fox.tokenId.length > 32 ? `G${fox.tokenId.slice(fox.tokenId.length - 8)}` : fox.tokenId,
        proximity,
        proximityPercentage: Math.round(proximity / maxProximity * 10000) / 100,
      };
    })
    .sort((a, b) => b.proximityPercentage - a.proximityPercentage);

  return result;
}
