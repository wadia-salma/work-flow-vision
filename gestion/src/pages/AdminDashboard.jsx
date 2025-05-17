// src/pages/AdminDashboard.jsx
import React from 'react';
import './AdminDashboard.css';

export default function AdminDashboard() {
  return (
    <div className="admin-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="navbar-title">Admin Dashboard</h1>
        <button className="logout-btn">Déconnexion</button>
      </nav>

      {/* Statistiques */}
      <div className="stats-section">
        <div className="stat-card">
          <h2>Projets</h2>
          <p>4</p>
        </div>
        <div className="stat-card">
          <h2>Tâches</h2>
          <p>12</p>
        </div>
        <div className="stat-card">
          <h2>Employés</h2>
          <p>6</p>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="progress-section">
        <h2>Statut des Tâches</h2>
        <div className="progress-bar">
          <label>To Do</label>
          <div className="bar">
            <div className="bar-fill yellow" style={{ width: '30%' }}></div>
          </div>
        </div>
        <div className="progress-bar">
          <label>In Progress</label>
          <div className="bar">
            <div className="bar-fill blue" style={{ width: '40%' }}></div>
          </div>
        </div>
        <div className="progress-bar">
          <label>Done</label>
          <div className="bar">
            <div className="bar-fill green" style={{ width: '30%' }}></div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-section">
        <h2>Liste des Tâches</h2>
        <table className="task-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Projet</th>
              <th>Employé</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Créer l'API</td>
              <td>Projet A</td>
              <td>Khalid</td>
              <td className="yellow-text">To Do</td>
            </tr>
            <tr>
              <td>Design Interface</td>
              <td>Projet B</td>
              <td>Salma</td>
              <td className="blue-text">In Progress</td>
            </tr>
            <tr>
              <td>Test Unitaire</td>
              <td>Projet C</td>
              <td>Yassine</td>
              <td className="green-text">Done</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

