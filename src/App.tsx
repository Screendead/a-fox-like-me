import './App.css';
import { foximity } from './models/foximity';
import foxesImport from './models/foxes.json';
import { Fox } from './models/fox/Fox';
import { useState } from 'react';

function App() {
  const [tokenID, setTokenID] = useState('');
  const [fox, setFox] = useState<Fox | null>(null);

  const foxes = foxesImport.foxes.map(fox => fox as Fox);

  return (
    <div className="App">
      <header className="App-header">
        {/* <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas> */}
        {!fox && <>
          <p>
            Enter your Fox's token ID and click the button to see how close your
            Fox is to other Foxes.
          </p>
          <input type="number" value={tokenID} onChange={(e) => setTokenID(e.target.value)} />
          <button onClick={() => {
            setFox(foxes.find(fox => fox.token_id === tokenID) || null);
          }}>Submit</button>
        </>}
        {fox && <>
          <p>
            Your Fox is "{foxes.find(fox => fox.token_id === tokenID)?.name ?? 'unknown'}"
          </p>
          <p>
            Similar foxes:
          </p>
          <ol className='foximities'>
            {foximity(fox).map(result => <li key={result.fox.token_id}>
              {result.fox.token_id}. {result.fox.name} ({result.proximityPercentage}%)
            </li>)}
          </ol>
          <button onClick={() => {
            setFox(null);
          }}>Reset</button>
        </>}
      </header>
    </div>
  );
}

export default App;
