import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/HomePage.css';
import { FaGithub, FaGlobe, FaRocket } from 'react-icons/fa';

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

    // Simula caricamento
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // ✅ Mostra il loader mentre isLoading è true
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
    <div>
      {/* Hero iniziale */}
      <div className="container mt-5 pt-5 text-center" data-aos="fade-down">
        <h1 className="display-4">Benvenuti su ParentUp</h1>
        <p className="lead">
          L'app pensata per il post-partum e post-adozione per papà e famiglie LGBTQ+
        </p>
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
          <h2 className="mb-3">Genitorialità LGBTQ+</h2>
          <p>
            Uno spazio inclusivo per papà gay, famiglie omogenitoriali e chiunque viva una
            genitorialità diversa ma piena d'amore. Con risorse legali, sociali e di comunità.
          </p>
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
