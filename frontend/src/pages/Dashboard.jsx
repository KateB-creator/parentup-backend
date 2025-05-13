import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Dashboard() {
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail');
  const nome = localStorage.getItem('userNome');
const cognome = localStorage.getItem('userCognome');


  useEffect(() => {
    if (!email) {
      navigate('/login'); // blocca accesso se non loggato
    }
  }, [email, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
    <h2>Benvenutə {nome} {cognome}</h2>
    <p>Questa è la tua dashboard personale.</p>
    <button onClick={handleLogout} className="btn btn-outline-danger mt-3">Logout</button>
  </div>
  );
}
