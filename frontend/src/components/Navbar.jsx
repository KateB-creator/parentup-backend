import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('userEmail');

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Cambia lo stato se scroll > 100px
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const handleScrollOrNavigate = (id) => {
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg fixed-top px-3 shadow-sm ${scrolled ? 'navbar-solid' : 'navbar-transparent'}`}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">ParentUp</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: '#fff' }}>
          <span className="navbar-toggler-icon" style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")" }}></span>
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
