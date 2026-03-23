import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import Toast from './components/Toast';
import Learn from './pages/Learn';
import Builder from './pages/Builder';
import SimulationOutput from './pages/SimulationOutput';
import Challenges from './pages/Challenges';
import { Profile } from './pages/Placeholders';

function AppContent() {
  const { toast, setToast } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/output" element={<SimulationOutput />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
