import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';
import '../styles/AuthStyles.css';

export default function RegisterForm() {
  const [form, setForm] = useState({
    nome: '',
    cognome: '',
    email: '',
    password: '',
    conferma: '',
    genere: '',
    dataNascita: '',
  });
  const [errore, setErrore] = useState('');
  const [successo, setSuccesso] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.conferma) {
      setErrore('Le password non coincidono.');
      return;
    }

    try {
      const response = await register(
        form.email,
        form.password,
        form.nome,
        form.cognome,
        form.genere,
        form.dataNascita
      );

      if (response.data.success) {
        localStorage.setItem('userEmail', form.email);
        navigate('/dashboard');
      } else {
        setErrore(response.data.message || 'Errore durante la registrazione.');
      }
    } catch (error) {
      setErrore('Errore di connessione al server.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left" style={{ backgroundColor: '#fff3cd' }}>
        <div className="p-5 text-center">
          <img 
            src="../assets/logo.svg" 
            alt="Logo ParentUp" 
            style={{ maxWidth: '300px', marginBottom: '20px' }} 
          />
          <h2 className="fw-bold">Benvenutə in ParentUp</h2>
          <p className="mt-3">ParentUp è la community inclusiva dedicata alla genitorialità moderna.</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="p-5">
          <div className="text-end">
            <span>Hai già un account? <Link to="/login" className="text-danger">Accedi</Link></span>
          </div>
          <h3 className="fw-bold mt-4">Crea il tuo account gratuito</h3>
          <p>Vivi l’esperienza completa</p>

          {errore && <div className="alert alert-danger">{errore}</div>}
          {successo && <div className="alert alert-success">{successo}</div>}

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label>Nome</label>
              <input type="text" name="nome" className="form-control rounded-pill"
                value={form.nome} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Cognome</label>
              <input type="text" name="cognome" className="form-control rounded-pill"
                value={form.cognome} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input type="email" name="email" className="form-control rounded-pill"
                value={form.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password" name="password" className="form-control rounded-pill"
                value={form.password} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Conferma password</label>
              <input type="password" name="conferma" className="form-control rounded-pill"
                value={form.conferma} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Data di nascita</label>
              <input type="date" name="dataNascita" className="form-control rounded-pill"
                value={form.dataNascita} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Genere</label>
              <div className="d-flex gap-2">
                {['Donna', 'Uomo', 'Altro'].map((gen) => (
                  <button key={gen} type="button"
                    className={`btn rounded-pill ${form.genere === gen ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setForm({ ...form, genere: gen })}
                  >{gen}</button>
                ))}
              </div>
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-pill mt-3">Registrati</button>
          </form>
        </div>
      </div>
    </div>
  );
}
