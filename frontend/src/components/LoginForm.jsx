import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/AuthStyles.css";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/parentup/backend/api/login.php', {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('userEmail', response.data.email);
        localStorage.setItem('userNome', response.data.nome);
        localStorage.setItem('userCognome', response.data.cognome);
        navigate('/dashboard');
      } else {
        setErrore(response.data.message || 'Credenziali non valide.');
      }
    } catch (error) {
      setErrore('Errore di connessione al server.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left bg-lightblue">
        <div className="p-5">
          <h2 className="fw-bold">Ciclo e genitorialità sotto controllo</h2>
          <p className="mt-3">ParentUp ti aiuta nel post-partum e post-adozione con strumenti su misura per ogni tipo di famiglia.</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="p-5">
          <div className="text-end">
            <span>Non sei registrato? <Link to="/register" className="text-danger">Registrati ora</Link></span>
          </div>
          <h3 className="fw-bold mt-4">Accedi</h3>
          <p>Entra con le tue credenziali</p>

          {errore && <div className="alert alert-danger">{errore}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label>Indirizzo email</label>
              <input type="email" className="form-control rounded-pill" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password" className="form-control rounded-pill" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mb-3 text-end">
              <a href="#">Ho dimenticato la password</a>
            </div>
            <button type="submit" className="btn btn-primary w-100 rounded-pill">Accedi</button>
          </form>
        </div>
      </div>
    </div>
  );
}
