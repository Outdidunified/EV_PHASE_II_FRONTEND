import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SuperAdminApp from './adminApps/SuperAdminApp';
import ResellerAdminApp from './adminApps/ResellerAdminApp';

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/superadmin/*" element={<SuperAdminApp />} />
        <Route path="/reselleradmin/*" element={<ResellerAdminApp />} />
        <Route path="/" element={<Navigate to="/superadmin" />} />
      </Routes>
    </Router>
  );
};

export default App;
