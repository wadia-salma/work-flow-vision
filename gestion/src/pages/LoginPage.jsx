import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    // تخزين الدور في sessionStorage أو localStorage
    localStorage.setItem('role', role);

    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else if (role === 'client') {
      navigate('/client/tasks');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Connexion</h2>
        <form onSubmit={handleLogin} className="login-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="exemple@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Mot de passe</label>
          <input
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Rôle</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="client">Client</option>
          </select>

          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
}

