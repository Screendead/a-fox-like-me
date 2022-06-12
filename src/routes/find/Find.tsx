import './Find.scss';
import { Fox } from '../../models/fox/Fox';
import { useEffect, useState } from 'react';
import { search } from '../../models/search';
import { Link } from 'react-router-dom';

export function Find() {
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [searchResults, setSearchResults] = useState<Fox[]>([]);

  useEffect(() => {
    if (searchTerm) {
      setSearchResults(search(searchTerm));
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div className="app">
      <h1>A Fox Like Me</h1>
      <input className="fox-search" type="text" value={searchTerm} placeholder="Search for your Fox..." onChange={(e) => {
        setSearchTerm(e.target.value);
      }} />
      {searchTerm && <div className='fox-links'>
        {searchResults.map(f => <Link key={f.tokenId} className="fox-link" to={`/find/${f.tokenId}`}>
          {f.name}
        </Link>)}
      </div>}
    </div>
  );
}
