import '../styles/Footer.scss';
import { FaGlobe, FaGithub, FaRocketchat } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer py-5">
      <div className="container">
        <div className="row text-center text-md-start">

          {/* Branding + copyright */}
          <div className="col-md-4 mb-3">
            <h5 className="text-white">ParentUp</h5>
            <p className="text_footer small mb-0">&copy; {new Date().getFullYear()} - Tutti i diritti riservati<br />Progetto sviluppato da Balia Katiuscia</p>
          </div>

          {/* Link utili */}
          <div className="col-md-4 mb-3">
            <h6 className="text-white">🌐 Social & Portfolio</h6>
            <ul className="list-unstyled">
              <li><a href="https://kateb-creator.github.io/il-mio-sito-web/" target="_blank" rel="noopener noreferrer" className="text_footer"><FaGlobe className="me-2" />Sito Web</a></li>
              <li><a href="https://talent.start2impact.it/profile/katiuscia-balia-71206396-6900-44db-82b9-f0e10f1a3e9a" target="_blank" rel="noopener noreferrer" className="text_footer"><FaRocketchat className="me-2" />Start2Impact</a></li>
              <li><a href="https://github.com/KateB-creator" target="_blank" rel="noopener noreferrer" className="text_footer"><FaGithub className="me-2" />GitHub</a></li>
            </ul>
          </div>

          {/* Contatti */}
          <div className="col-md-4 mb-3">
            <h6 className="text-white">📬 Contatti</h6>
            <p className="text_footer mb-1">Email: <a href="mailto:info@baliakatiuscia.it" className="text_footer">info@baliakatiuscia.it</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
