import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/Index'; // This will be our main schedule page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        {/* We will add routes for SISREG and Flor later if needed, or just link to them */}
      </Routes>
    </Router>
  );
}

export default App;