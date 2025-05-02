import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './core/Layout';
import HomePage from './pages/Home';
import ReporteSpa from './components/ReporteSpa/ReporteSpa'; './components/ReporteSpa/ReporteSpa';


const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ReporteSpa" element={<ReporteSpa/>} />
          {/* Otras rutas */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;