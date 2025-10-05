import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/Index';
import SisregPage from './pages/SisregPage';
import FlorPage from './pages/FlorPage';
import SchedulePage from './pages/SchedulePage'; // Import the new SchedulePage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/schedule" element={<SchedulePage />} /> {/* New route for the schedule */}
        <Route path="/sisreg" element={<SisregPage />} />
        <Route path="/flor" element={<FlorPage />} />
      </Routes>
    </Router>
  );
}

export default App;