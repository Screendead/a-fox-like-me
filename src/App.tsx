import './App.css';
import { Canvas } from '@react-three/fiber';
import { Box } from './models/box';
import { runMe } from './models/gettingData/parseV1';
import { useState } from 'react';

function App() {
  let [result, setResult] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={async () => {
          setResult(await runMe());
        }}>Click Me!</button>
        <textarea id="textarea" value={result} rows={10} cols={50} />
      </header>
    </div>
  );
}

export default App;
