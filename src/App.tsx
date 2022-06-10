import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Find } from './routes/find/Find';
import { AFoxLikeMe } from './routes/a-fox-like-me/AFoxLikeMe';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Find />} />
      <Route path="/find/:id" element={<AFoxLikeMe />} />
    </Routes>
  );
}

export default App;
