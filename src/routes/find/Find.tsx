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
      <div className="main">
        <p className="pf-tagline">
          A satellite project of the <a href="https://www.philosophicalfoxes.com/" target="_blank" rel="noreferrer">
            Philosophical Foxes
          </a> community.
        </p>
        <input className="fox-search" type="text" value={searchTerm} placeholder="Search for your Fox..." onChange={(e) => {
          setSearchTerm(e.target.value);
        }} />
        {searchTerm && <div className='fox-links'>
          {searchResults.map(f => <Link key={f.tokenId} className="fox-link" to={`/find/${f.tokenId}`}>
            {f.name}
          </Link>)}
        </div>}
      </div>
      <div className="footer">
        <span className="footer-text">
          Made with &lt;3 by <a href="https://github.com/screendead" target="_blank" rel="noreferrer">@screendead</a> and <a href="https://www.chriscocreated.xyz/" target="_blank" rel="noreferrer">@ChrisCoCreated</a>
        </span>
      </div>
    </div>
  );
}
