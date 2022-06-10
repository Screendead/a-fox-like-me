import { Fox } from './fox/Fox';
import foxes from './foxes.json';

export function search(searchTerm: string): Fox[] {
  const searchTermLower = searchTerm.toLowerCase();
  return foxes
    .filter(f => f.name.toLowerCase().includes(searchTermLower))
    .map(f => f as Fox)
    .sort((a, b) => a.name.localeCompare(b.name))
    .splice(0, 5);
}
