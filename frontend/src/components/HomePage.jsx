import { Link } from 'react-router-dom';
import './styles/HomePage.scss';
import welcomeImage from '../assets/visual_img.png';
import imgBabyCare from '../assets/baby-care.svg';
import imgLgbtq from '../assets/lgbtq.svg';
import imgReturnToWork from '../assets/work.svg';
import imgCommunication from '../assets/comunicazione.svg';
import imgWellbeing from '../assets/benessere.svg';
import imgCommunity from '../assets/community.svg';
import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';

function ArticleAccordionSection() {
  const articles = [
    {
      id: 1,
      title: 'Routine serale del neonato',
      content: 'Una routine serale costante può favorire il sonno del neonato. Inizia con un bagnetto, poi una storia o una ninna nanna...'
    },
    {
      id: 2,
      title: 'Rientro al lavoro dopo il parto',
      content: 'Il rientro al lavoro può essere una sfida. Organizza l\'assistenza all\'infanzia in anticipo, comunica con il tuo datore di lavoro...'
    },
    {
      id: 3,
      title: 'Genitorialità condivisa: perché fa la differenza',
      content: 'La co-genitorialità permette di affrontare il viaggio genitoriale come un team, con ruoli condivisi e comunicazione continua...'
    }
  ];

  return (
    <section className="py-5 bg-white border-top">
      <div className="container">
        <h2 className="text-center mb-5">📖 Approfondimenti</h2>
        <Accordion defaultActiveKey="0" flush alwaysOpen>
          {articles.map(article => (
            <Accordion.Item eventKey={article.id.toString()} key={article.id} className="mb-3 border rounded shadow-sm">
              <Accordion.Header className="fw-bold">{article.title}</Accordion.Header>
              <Accordion.Body>{article.content}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <div className="structur-page">
        <section className="hero-section py-5">
          <div className="container">
            <div className="row align-items-center">
              {/* Testo */}
              <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
                <h1 className="display-5 fw-bold">Benvenutə su ParentUp!</h1>
                <p className="lead text-muted">
                  L'app inclusiva pensata per ogni famiglia. Sostieni la crescita, il benessere emotivo e la comunicazione,
                  passo dopo passo, con strumenti utili e flessibili.
                </p>
                <p className="text-description mb-4">
                  Dalla cura del neonato al ritorno al lavoro, fino al supporto per genitori LGBTQ+, ParentUp è il tuo alleato quotidiano.
                </p>
                <a href="#section-card" className="btn  btn-color btn-lg">Scopri le Sezioni</a>
              </div>

              {/* Immagine */}
              <div className="col-md-6 text-center">
                <img src={welcomeImage} alt="Benvenuto in ParentUp" className="img-fluid " style={{ maxHeight: '500px' }} />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION CARD */}
      <div className="structur-card" id="section-card">
        <div className="container">
          <div className="row g-4">
            {/* Card Cura Neonato */}
            <div className="col-md-4">
              <div className="card h-100 shadow">
              <img src={imgBabyCare} className="card-img-top" alt="Cura del neonato" />
                <div className="card-body">
                  <h5 className="card-title">🍼 Cura del Neonato</h5>
                  <p className="card-text">Scopri consigli su allattamento, svezzamento, routine e crescita.</p>
                  <Link to="/baby-care" className="btn btn-outline-primary mt-auto btn-lg">Vai</Link>
                </div>
              </div>
            </div>
            {/* Card Comunicazione */}
            <div className="col-md-4">
              <div className="card h-100 shadow">
              <img src={imgCommunication} className="card-img-top" alt="Comunicazione" />
                <div className="card-body">
                  <h5 className="card-title">💬 Comunicazione</h5>
                  <p className="card-text">Diario condiviso, calendario familiare e spazio per rafforzare la coppia.</p>
                  <Link to="/communication" className="btn btn-outline-secondary mt-auto btn-lg">Vai</Link>
                </div>
              </div>
            </div>
            {/* Card Genitorialità LGBTQ+ */}
            <div className="col-md-4">
              <div className="card h-100 shadow">
              <img src={imgLgbtq} className="card-img-top" alt="Genitorialità LGBTQ+" />
                <div className="card-body">
                  <h5 className="card-title">🏳️‍🌈 Genitorialità LGBTQ+</h5>
                  <p className="card-text">Risorse, podcast e mappa dei servizi LGBTQ+ friendly.</p>
                  <Link to="/lgbtq-parenting" className="btn btn-outline-success mt-auto btn-lg">Vai</Link>
                </div>
              </div>
            </div>
            {/* Card Rientro al lavoro */}
            <div className="col-md-4">
              <div className="card h-100 shadow">
              <img src={imgReturnToWork} className="card-img-top" alt="Rientro al lavoro" />
                <div className="card-body">
                  <h5 className="card-title">🏢 Rientro al lavoro</h5>
                  <p className="card-text">Consigli pratici, diario di rientro, gestione della routine familiare.</p>
                  <Link to="/return-to-work" className="btn btn-outline-danger mt-auto btn-lg">Vai</Link>
                </div>
              </div>
            </div>
            {/* Card Benessere Emotivo */}
            <div className="col-md-4">
              <div className="card h-100 shadow">
              <img src={imgWellbeing} className="card-img-top" alt="Benessere emotivo" />
                <div className="card-body">
                  <h5 className="card-title">🧘 Benessere Emotivo</h5>
                  <p className="card-text">Meditazioni, esercizi di rilassamento, diario emotivo.</p>
                  <Link to="/emotional-wellbeing" className="btn btn-outline-warning mt-auto btn-lg">Vai</Link>
                </div>
              </div>
            </div>
            {/* Card Community */}
            <div className="col-md-4">
              <div className="card h-100 shadow">
              <img src={imgCommunity} className="card-img-top" alt="Community" />
                <div className="card-body">
                  <h5 className="card-title">🤝 Community</h5>
                  <p className="card-text">Forum, gruppi tematici e incontri online tra genitori.</p>
                  <Link to="/community-support" className="btn btn-outline-info mt-auto btn-lg">Vai</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VALORI SECTION */}
      <section className="py-5 bg-light">
  <div className="container">
    <h2 className="text-center mb-4">🌟 I Valori di ParentUp</h2>
    <div className="valori-scroll row text-center g-4 flex-nowrap overflow-auto">
      <div className="col-md-3 flex-shrink-0" style={{ minWidth: '250px' }}>
        <div className="p-3 border rounded bg-white h-100">
          <h4>🤗 Inclusività</h4>
          <p>Ogni famiglia è diversa. Noi le accogliamo tutte.</p>
        </div>
      </div>
      <div className="col-md-3 flex-shrink-0" style={{ minWidth: '250px' }}>
        <div className="p-3 border rounded bg-white h-100">
          <h4>🧡 Supporto Reale</h4>
          <p>Risorse pratiche e concrete per affrontare ogni giorno.</p>
        </div>
      </div>
      <div className="col-md-3 flex-shrink-0" style={{ minWidth: '250px' }}>
        <div className="p-3 border rounded bg-white h-100">
          <h4>🛠️ Strumenti Utili</h4>
          <p>Checklist, diario, calendario: tutto a portata di clic.</p>
        </div>
      </div>
      <div className="col-md-3 flex-shrink-0" style={{ minWidth: '250px' }}>
        <div className="p-3 border rounded bg-white h-100">
          <h4>👨‍👨‍👧‍👦 Co-genitorialità</h4>
          <p>Un progetto condiviso: crescere insieme come team.</p>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* ARTICLE ACCORDION SECTION */}
      <ArticleAccordionSection />
    </>
  );
}

export default HomePage;
