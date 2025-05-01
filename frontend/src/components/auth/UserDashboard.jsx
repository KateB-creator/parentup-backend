import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    if (!user) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        onLogout(JSON.parse(savedUser));
      } else {
        navigate('/login');
      }
    }
  }, [user, navigate, onLogout]);

  useEffect(() => {
    if (!user) return;

    fetch('http://localhost/parentup/backend/api/dashboard/fetch_dashboard_data.php', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => res.json())
      .then(data => setDashboardData(data));
  }, [user]);

  const handleLogout = async () => {
    await fetch('http://localhost/parentup/backend/api/auth/logout.php');
    localStorage.removeItem('user');
    onLogout(null);
    navigate('/login');
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Ciao {user?.name || 'utente'}!</h2>
      <p>Benvenuto nella tua dashboard personale.</p>

      {/* Statistiche rapide */}
      <div className="row row-cols-1 row-cols-md-2 g-4 my-4">
        <div className="col">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Ultima poppata</h5>
              <p className="card-text">3 ore fa</p>
            </div>
          </div>
        </div>

        {dashboardData?.returnToWork && (
          <div className="col">
            <div className="card text-center bg-info text-white">
              <div className="card-body">
                <h5 className="card-title">Rientro al lavoro</h5>
                <p className="card-text">
                  {(() => {
                    const tasks = dashboardData.returnToWork.checklist || [];
                    const completed = tasks.filter(t => t.done).length;
                    const total = tasks.length;
                    return `Checklist: ${completed} su ${total}`;
                  })()}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="col">
          <div className="card text-center bg-light">
            <div className="card-body">
              <h5 className="card-title">Messaggi partner</h5>
              <p className="card-text">2 nuovi</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-center bg-warning">
            <div className="card-body">
              <h5 className="card-title">Umore settimanale</h5>
              <p className="card-text">😊 Positivo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Accesso rapido alle sezioni */}
      <h4 className="mt-5">Accesso rapido</h4>
      <div className="d-grid gap-2 mt-3">
        <button className="btn btn-outline-primary">📘 Diario post-parto</button>
        <button className="btn btn-outline-success">🧘‍♀️ Area benessere</button>
        <button className="btn btn-outline-info">📍 Parcheggi rosa salvati</button>
        <button className="btn btn-outline-secondary">👨‍👩‍👧 Diario condiviso con partner</button>
      </div>

      {/* Notifiche recenti */}
      <h4 className="mt-5">Notifiche</h4>
      <div className="alert alert-primary" role="alert">
        🔔 Hai un appuntamento pediatrico domani alle 10:00
      </div>
      <div className="alert alert-primary" role="alert">
        🔔 Obiettivo di oggi: 10 minuti di meditazione
      </div>

      {/* Ultime voci diario emotivo */}
      <h4 className="mt-5">Ultime voci diario emotivo</h4>
      <ul className="list-group">
        <li className="list-group-item">30 Aprile – “Mi sento stanca ma serena.”</li>
        <li className="list-group-item">29 Aprile – “Mal di testa e nervosismo.”</li>
      </ul>

      {/* Stato partner */}
      <h4 className="mt-5">Partner</h4>
      <p>💑 Marco – <span className="badge bg-success">Online</span></p>
      <p>Ultimo messaggio: "Hai bisogno che passo io a prendere il latte?"</p>

      {/* Sintesi ReturnToWork */}
      {dashboardData?.returnToWork && (
        <>
          <h4 className="mt-5">Rientro al lavoro – Dettagli</h4>

          <div className="mb-3">
            <strong>Piano personalizzato:</strong><br />
            👶 Assistenza: {dashboardData.returnToWork.formData?.childcare || '—'}<br />
            ⏰ Orari lavoro: {dashboardData.returnToWork.formData?.workHours || '—'}<br />
            🤝 Supporto richiesto: {dashboardData.returnToWork.formData?.supportNeeded || '—'}
          </div>

          <div className="mb-3">
            <strong>Planner settimanale (esempio):</strong><br />
            {Object.entries(dashboardData.returnToWork.planner || {}).slice(0, 3).map(([day, plan]) => (
              <div key={day}>🗓️ <strong>{day}:</strong> {plan}</div>
            ))}
          </div>
        </>
      )}

      {/* Azioni rapide */}
      <h4 className="mt-5">Impostazioni</h4>
      <div className="d-flex gap-2 flex-wrap">
        <button className="btn btn-sm btn-outline-dark">Modifica dati</button>
        <button className="btn btn-sm btn-outline-dark">Cambia password</button>
        <button className="btn btn-sm btn-outline-danger">Elimina account</button>
      </div>

      <hr className="my-5" />

      <button onClick={handleLogout} className="btn btn-danger">Logout</button>
    </div>
  );
}

export default UserDashboard;
