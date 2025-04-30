import { Link } from 'react-router-dom';
import '../styles/NavBar.scss';


function Navbar() {
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
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
