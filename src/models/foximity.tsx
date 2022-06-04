import { Fox } from './fox/Fox';
import foxesImport from './foxes.json';
const foxes = foxesImport.foxes.map(fox => fox as Fox);

export function foximity(fox: Fox): {
  fox: Fox,
  proximity: number,
  proximityPercentage: number,
}[] {
  let seen: {[key: string]: boolean} = {};

  const myFox = fox;

  let myPhilosophy = myFox.traits?.find(trait => trait.trait_type === 'Philosophy');
  let mySpecies = myFox.traits?.find(trait => trait.trait_type === 'Species');
  let myVirtues = myFox.traits?.filter(trait => trait.trait_type === 'Virtues') ?? [];
  let myBaggage = myFox.traits?.filter(trait => trait.trait_type === 'Baggage') ?? [];

  let maxProximity = 5 + 3 + myVirtues.length * 1 + myBaggage.length * 1;

  return foxes
    .filter(function(item) {
      return seen.hasOwnProperty(item.token_id) ? false : (seen[item.token_id] = true);
    })
    .map(fox => {
      let proximity = 0;

      let theirPhilosophy = fox.traits?.find(trait => trait.trait_type === 'Philosophy');
      let theirSpecies = fox.traits?.find(trait => trait.trait_type === 'Species');
      let theirVirtues = fox.traits?.filter(trait => trait.trait_type === 'Virtues') ?? [];
      let theirBaggage = fox.traits?.filter(trait => trait.trait_type === 'Baggage') ?? [];

      if (myPhilosophy?.value === theirPhilosophy?.value) {
        proximity += 5;
      }

      if (mySpecies?.value === theirSpecies?.value) {
        proximity += 3;
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

      return {
        fox,
        proximity,
        proximityPercentage: Math.round(proximity / maxProximity * 10000) / 100,
      };
    })
    .sort((a, b) => b.proximityPercentage - a.proximityPercentage);
}
