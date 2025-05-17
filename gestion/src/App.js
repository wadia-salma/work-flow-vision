

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ClientTasks from './pages/ClientTasks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/client/tasks" element={<ClientTasks />} />
      </Routes>
    </Router>
  );
}

export default App;

