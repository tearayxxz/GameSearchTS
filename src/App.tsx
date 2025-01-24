import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameListPage from './pages/GameListPage';
import GameDetailPage from './pages/GameDetailPage';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GameListPage />} />
        <Route path="/games/:id" element={<GameDetailPage />} />
      </Routes>
      <Analytics />
    </>
  );
}

export default App;