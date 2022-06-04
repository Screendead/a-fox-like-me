import './App.css';
import { Canvas } from '@react-three/fiber';
import { Box } from './models/box';
import { foximity } from './models/foximity';
import foxesImport from './models/foxes.json';
import { Fox } from './models/fox/Fox';

foximity(foxesImport.foxes[1] as Fox).forEach(result => {
  console.log(`${result.fox.token_id}. "${result.fox.name}" proximity: ${result.proximityPercentage}%`);
});

function App() {
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
      </header>
    </div>
  );
}

export default App;
