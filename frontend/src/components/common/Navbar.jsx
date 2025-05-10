import { Link, useNavigate } from 'react-router-dom';
import '../styles/NavBar.scss';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('Logout click');
    try {
      await fetch('http://localhost/parentup/backend/api/auth/logout.php');
    } catch (err) {
      console.error('Errore durante il logout:', err);
    }
    localStorage.removeItem('user');
    onLogout(null);
    navigate('/login');
  };

  return (
    <nav className="navbar-custom navbar navbar-expand-lg navbar-light px-4">
      <Link className="navbar-brand fw-bold" to="/">ParentUp</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link" to="/baby-care">Cura Neonato</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/communication">Comunicazione</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/lgbtq-parenting">Genitorialità LGBTQ+</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/return-to-work">Rientro al lavoro</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/emotional-wellbeing">Benessere</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/community-support">Community</Link></li>
          {user ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  👤 {user.name}
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <Link className="dropdown-item" to="/dashboard">📊 La mia Dashboard</Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Registrati</Link></li>
              </>
            )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
