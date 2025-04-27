import { Link } from 'react-router-dom';
import './styles/HomePage.scss';


function HomePage() {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Benvenutə su ParentUp!</h1>
      <p className="text-center mb-5">Un'app inclusiva per supportare genitori e partner nel viaggio post-parto e post-adozione.</p>

      <div className="row g-4">
        {/* Card Cura Neonato */}
        <div className="col-md-4">
          <div className="card h-100 shadow">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">🍼 Cura del Neonato</h5>
              <p className="card-text flex-grow-1">Scopri consigli su allattamento, svezzamento, routine e crescita.</p>
              <Link to="/baby-care" className="btn btn-primary mt-auto">Vai</Link>
            </div>
          </div>
        </div>

        {/* Card Comunicazione */}
        <div className="col-md-4">
          <div className="card h-100 shadow">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">💬 Comunicazione</h5>
              <p className="card-text flex-grow-1">Diario condiviso, calendario familiare e spazio per rafforzare la coppia.</p>
              <Link to="/communication" className="btn btn-primary mt-auto">Vai</Link>
            </div>
          </div>
        </div>

        {/* Card Genitorialità LGBTQ+ */}
        <div className="col-md-4">
          <div className="card h-100 shadow">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">🏳️‍🌈 Genitorialità LGBTQ+</h5>
              <p className="card-text flex-grow-1">Risorse, podcast e mappa dei servizi LGBTQ+ friendly.</p>
              <Link to="/lgbtq-parenting" className="btn btn-primary mt-auto">Vai</Link>
            </div>
          </div>
        </div>

        {/* Card Rientro al lavoro */}
        <div className="col-md-4">
          <div className="card h-100 shadow">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">🏢 Rientro al lavoro</h5>
              <p className="card-text flex-grow-1">Consigli pratici, diario di rientro, gestione della routine familiare.</p>
              <Link to="/return-to-work" className="btn btn-primary mt-auto">Vai</Link>
            </div>
          </div>
        </div>

        {/* Card Benessere Emotivo */}
        <div className="col-md-4">
          <div className="card h-100 shadow">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">🧘 Benessere Emotivo</h5>
              <p className="card-text flex-grow-1">Meditazioni, esercizi di rilassamento, diario emotivo.</p>
              <Link to="/emotional-wellbeing" className="btn btn-primary mt-auto">Vai</Link>
            </div>
          </div>
        </div>

        {/* Card Community */}
        <div className="col-md-4">
          <div className="card h-100 shadow">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">🤝 Community</h5>
              <p className="card-text flex-grow-1">Forum, gruppi tematici e incontri online tra genitori.</p>
              <Link to="/community-support" className="btn btn-primary mt-auto">Vai</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
