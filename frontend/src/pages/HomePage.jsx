import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/HomePage.css';
import { FaGithub, FaGlobe, FaRocket } from 'react-icons/fa';
import Navbar from '../components/Navbar';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true); // ✅ AGGIUNTA QUI
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    body: '',
    image: ''
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
    });

   
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  
  if (isLoading) {
    return (
      <div className={`loading-screen ${isLoading ? '' : 'fade-out'}`}>
        <div className="spinner-logo">
          <div className="circle"></div>
          <p className="mt-3">Caricamento...</p>
        </div>
      </div>
    );
  }

  
  return (
    <div className="home-wrapper">
      <Navbar />
      {/* Hero iniziale */}
      <div className="hero-section d-flex align-items-center text-white text-center" data-aos="fade-down">
      <div className="container mt-5 pt-5">
        <h1 className="display-4">Benvenuti su ParentUp</h1>
        <p className="lead">
          L'app pensata per il post-partum e post-adozione per papà e famiglie LGBTQ+
        </p>
      </div>
    </div>

      {/* Sezione Cura del Neonato */}
      <section id="neonato" className="py-5 bg-light" data-aos="fade-up">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Perché scegliere ParentUp</h2>
            <p className="text-muted">
              Strumenti e risorse affidabili per affrontare al meglio i primi mesi con il tuo bambino.
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                img: '/images/why1.png',
                title: 'Cura Medica Neonatale',
                body: 'Informazioni su controlli pediatrici, vaccini e supporto sanitario nei primi mesi.',
                modalImg: '/images/modal1.jpg'
              },
              {
                img: '/images/why2.png',
                title: 'Babysitter Affidabili',
                body: 'Consigli per trovare babysitter di fiducia e creare routine serene.',
                modalImg: '/images/modal2.jpg'
              },
              {
                img: '/images/why3.png',
                title: 'Sicurezza a Casa',
                body: 'Check-list e consigli per un ambiente sicuro per il tuo neonato.',
                modalImg: '/images/modal3.jpg'
              },
              {
                img: '/images/why4.png',
                title: 'Genitorialità di Successo',
                body: 'Strumenti emotivi e pratici per crescere con fiducia nel nuovo ruolo di genitore.',
                modalImg: '/images/modal4.jpg'
              },
              {
                img: '/images/why1.png',
                title: 'Cura Medica Neonatale',
                body: 'Informazioni su controlli pediatrici, vaccini e supporto sanitario nei primi mesi.',
                modalImg: '/images/modal1.jpg'
              },
              {
                img: '/images/why2.png',
                title: 'Babysitter Affidabili',
                body: 'Consigli per trovare babysitter di fiducia e creare routine serene.',
                modalImg: '/images/modal1.jpg'
              },
              {
                img: '/images/why3.png',
                title: 'Sicurezza a Casa',
                body: 'Check-list e consigli per un ambiente sicuro per il tuo neonato.',
                modalImg: '/images/modal1.jpg'
              },
              {
                img: '/images/why4.png',
                title: 'Genitorialità di Successo',
                body: 'Strumenti emotivi e pratici per crescere con fiducia nel nuovo ruolo di genitore.',
                modalImg: '/images/modal1.jpg'
              }
            ].map((item, index) => (
              <div className="col-md-6 col-lg-3" key={index} data-aos="zoom-in">
                <div className="card h-100 text-center border-0 shadow-sm">
                  <div className="card-body">
                    <img src={item.img} alt={item.title} className="img-fluid mb-3" />
                    <h5 className="card-title">{item.title}</h5>
                    <button
                      className="btn btn-link text-primary text-decoration-none"
                      onClick={() => handleOpenModal(item.title, item.body, item.modalImg)}
                    >
                      <span>Scopri di più</span>
                      <hr className="mt-1 mb-0" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modale Bootstrap */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{modalContent.title}</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body text-center">
                  <img src={modalContent.image} alt="" className="img-fluid rounded mb-3" />
                  <p>{modalContent.body}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Chiudi
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Sezione Benessere */}
      <section id="benessere" className="py-5" data-aos="fade-right">
        <div className="container">
          <h2 className="mb-3">Benessere</h2>
          <p>
            Meditazioni guidate, esercizi dolci per il corpo e podcast per il supporto emotivo.
            Un angolo per prenderti cura di te mentre cresci tuo figlio.
          </p>
        </div>
      </section>

      {/* Sezione Genitorialità LGBTQ+ */}
      <section id="lgbtq" className="py-5 bg-light" data-aos="fade-left">
        <div className="container">
          <h2 className="mb-4">Genitorialità LGBTQ+</h2>
          <p className="mb-5">
            Uno spazio inclusivo per papà gay, famiglie omogenitoriali e chiunque viva una
            genitorialità diversa ma piena d'amore. Con risorse legali, sociali e di comunità.
          </p>

          {/* Tipologie di Famiglie */}
          <h4 className="mb-3">👨‍👨‍👧‍👦 Tipologie di Famiglie</h4>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">👩‍❤️‍👩 Adozione e affido</h5>
                  <p className="card-text">Per coppie omogenitoriali che desiderano diventare genitori.</p>
                  <a href="https://famigliearcobaleno.org/adozioni" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                    Scopri di più →
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">👨‍👨‍👧‍👦 Co-genitorialità</h5>
                  <p className="card-text">Modelli familiari condivisi tra più adulti consapevoli e presenti.</p>
                  <a href="https://www.retegenitorirainbow.it/cogenitorialita" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                    Approfondisci →
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">🌈 Famiglie Arcobaleno</h5>
                  <p className="card-text">Storie vere di coraggio, amore e orgoglio.</p>
                  <a href="https://famigliearcobaleno.org/storie" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                    Leggi le storie →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Diritti e Legislazione */}
          <h3 className="mt-5">⚖️ Diritti e Legislazione</h3>
          <div className="card mb-4">
            <div className="card-body">
              <p className="card-text">
                Le leggi variano da paese a paese. Ti invitiamo a informarti sui tuoi diritti riguardo adozione,
                riconoscimento legale, e tutela dei figli.
                Per l’Italia:{" "}
                <a href="https://famigliearcobaleno.org" target="_blank" rel="noopener noreferrer">
                  famigliearcobaleno.org
                </a>
              </p>
            </div>
          </div>

          {/* Supporto Emotivo e Risorse */}
          <h3>💬 Supporto Emotivo</h3>
          <p>
            La genitorialità LGBTQ+ può incontrare sfide uniche. Non sei solə.
            Esistono gruppi, professionisti e comunità pronti ad ascoltarti.
          </p>
          <h4 className="mt-3">📚 Risorse Utili</h4>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="card-title">🌈 Famiglie Arcobaleno</h6>
                  <p className="card-text">Sostegno, eventi e comunità per famiglie LGBTQ+.</p>
                  <a href="https://famigliearcobaleno.org" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary">
                    Visita →
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="card-title">🌐 Rete Genitori Rainbow</h6>
                  <p className="card-text">Ascolto, orientamento e supporto ai genitori LGBTQ+.</p>
                  <a href="https://www.retegenitorirainbow.it/" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary">
                    Visita →
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="card-title">📖 Tutto Tranquillo</h6>
                  <p className="card-text">Libri e materiali inclusivi per l'infanzia.</p>
                  <a href="https://www.tuttotranquillo.it/" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary">
                    Visita →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Sezione Ritorno al Lavoro */}
      <section id="lavoro" className="py-5" data-aos="fade-up">
        <div className="container">
          <h2 className="mb-3">Ritorno al Lavoro</h2>
          <p>
            Suggerimenti su come rientrare al lavoro in modo graduale, con mappa dei parcheggi rosa,
            gestione del tempo e consigli su congedi e diritti.
          </p>
        </div>
      </section>
      
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container text-center">
          <p className="mb-3 fw-bold">&copy; {new Date().getFullYear()} ParentUp</p>

          <div className="d-flex justify-content-center gap-4 mb-3">
            <a href="https://github.com/tuo-username" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
              <FaGithub />
            </a>
            <a href="https://tuosito.it" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
              <FaGlobe />
            </a>
            <a href="https://www.start2impact.it" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
              <FaRocket />
            </a>
          </div>

          <p className="small mb-0">
            <a href="/privacy" className="text-white text-decoration-underline">Privacy</a> ·
            <a href="/contatti" className="text-white text-decoration-underline ms-2">Contattami</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
