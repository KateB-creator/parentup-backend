import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  // Scroll a sezione (se già sulla homepage)
  const handleScrollOrNavigate = (id) => {
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm px-3 fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">ParentUp</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <button className="btn nav-link" onClick={() => handleScrollOrNavigate('neonato')}>
                Cura del bambino
              </button>
            </li>
            <li className="nav-item">
              <button className="btn nav-link" onClick={() => handleScrollOrNavigate('benessere')}>
                Benessere
              </button>
            </li>
            <li className="nav-item">
              <button className="btn nav-link" onClick={() => handleScrollOrNavigate('lgbtq')}>
                Genitorialità LGBTQ+
              </button>
            </li>
            <li className="nav-item">
              <button className="btn nav-link" onClick={() => handleScrollOrNavigate('lavoro')}>
                Ritorno al lavoro
              </button>
            </li>
          </ul>

          <ul className="navbar-nav">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Registrati</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
