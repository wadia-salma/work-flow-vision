// src/pages/HomePage.jsx
import React from 'react';
import './HomePage.css'; // نربط ملف CSS
// Ajout des icônes
import { FaChartLine, FaTasks, FaUsers, FaSearch } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="home-container">
      <header className="navbar">
        <div className="nav-left">
          <h1 className="logo">GestionPro</h1>
          <nav className="nav-links">
            <a href="/features">Fonctionnalités</a>
            <a href="/solutions">Solutions</a>
            <a href="/pricing">Tarifs</a>
          </nav>
        </div>
        <div className="nav-right">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Rechercher..." />
          </div>
          <a href="/login" className="login-btn">Se connecter</a>
        </div>
      </header>

      <main className="hero-section">
        <h2 className="hero-title">Gérez vos projets avec efficacité</h2>
        <p className="hero-text">
          La plateforme qui réunit vos équipes, projets et outils en un seul endroit.
        </p>
        <a href="/login" className="start-btn">Commencer gratuitement</a>
        
        <div className="features-grid">
          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>Tableaux de bord</h3>
            <p>Visualisez vos progrès en temps réel</p>
          </div>
          <div className="feature-card">
            <FaTasks className="feature-icon" />
            <h3>Gestion des tâches</h3>
            <p>Organisez et suivez vos tâches</p>
          </div>
          <div className="feature-card">
            <FaUsers className="feature-icon" />
            <h3>Collaboration</h3>
            <p>Travaillez efficacement en équipe</p>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="/about">À propos</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Confidentialité</a>
          </div>
          <p>© 2025 GestionPro. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}