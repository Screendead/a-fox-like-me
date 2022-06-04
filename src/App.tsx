import './App.css';
import { foximity } from './models/foximity';
import { Fox } from './models/fox/Fox';
import { useEffect, useState } from 'react';
import { Foximity } from './models/fox/Foximity';
import { search } from './models/search';

function App() {
  const [tokenID, setTokenID] = useState('');
  const [fox, setFox] = useState<Fox | undefined>();
  const [foximities, setFoximities] = useState<Foximity[]>([]);

  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [searchResults, setSearchResults] = useState<Fox[]>([]);

  useEffect(() => {
    if (tokenID) {
      try {
        let _f = foximity(parseInt(tokenID))
          .splice(0, 25);
        setFox(_f.find(f => f.fox.tokenId === parseInt(tokenID))?.fox);
        setFoximities(_f);
      } catch (e) {
        console.log(e);
      }
    } else {
      setFox(undefined);
      setFoximities([]);
    }
  }, [tokenID]);

  useEffect(() => {
    if (searchTerm) {
      setSearchResults(search(searchTerm));
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div className="App">
      <header className="App-header">
        {/* <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas> */}
        <p>
          Enter your Fox's token ID and click the button to see how close your
          Fox is to other Foxes.
        </p>
        <input type="number" value={tokenID} placeholder="Token ID (e.g. 123)" onChange={(e) => {
          setTokenID(e.target.value);
        }} />
        <span>--- or ---</span>
        <div>
          <div>
            <span>Search: </span>
            <input type="text" value={searchTerm} placeholder="Search" onChange={(e) => {
              setSearchTerm(e.target.value);
            }} />
          </div>
          {searchTerm && <div>
            {searchResults.map(f => <button key={f.tokenId} onClick={() => {
              setTokenID(f.tokenId.toString());
              setSearchTerm('');
            }}>
              {f.name}
            </button>)}
          </div>}
        </div>
        {fox && <>
          <p>
            Viewing {} Foxes similar to {fox?.tokenId ?? 'unknown'}: "{fox?.name ?? 'unknown'}"
          </p>
          <ol className='foximities'>
            {foximities.map(result => <li key={result.fox.tokenId}>
              {result.fox.tokenId}. {result.fox.name} ({result.proximityPercentage}%)
            </li>)}
          </ol>
        </>}
      </header>
    </div>
  );
}

export default App;
