import './App.scss';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Find } from './routes/find/Find';
import { AFoxLikeMe } from './routes/a-fox-like-me/AFoxLikeMe';
import { usePerformance } from './hooks/usePerformance';
import { useEffect } from 'react';
import { useAnalytics } from './hooks/useAnalytics';
import { isSupported, logEvent } from 'firebase/analytics';

function App() {
  const location = useLocation();
  const performance = usePerformance();
  const analytics = useAnalytics();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      if (performance) {
        performance.dataCollectionEnabled = true;
      }
    }
  }, [performance]);

  useEffect(() => {
    const check = async () => {
      if (analytics && await isSupported()) {
        logEvent(analytics, 'page_view', {
          page_path: location.pathname,
          page_title: document.title,
        });
      }
    }
    check();
  }, [analytics, location, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Find />} />
      <Route path="/find/:id" element={<AFoxLikeMe />} />
    </Routes>
  );
}

export default App;
