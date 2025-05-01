import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.scss';

function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost/parentup/backend/api/auth/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(data.message);
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err) {
      setError('Errore di rete.');
    }
  };

  return (
    <div className="container my-5 register-page">
      <h2 className="mb-4">Crea un nuovo account</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input name="name" type="text" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input name="password" type="password" className="form-control" value={form.password} onChange={handleChange} required />
        </div>
        <button className="btn btn-primary" type="submit">Registrati</button>
      </form>
    </div>
  );
}

export default RegisterPage;
