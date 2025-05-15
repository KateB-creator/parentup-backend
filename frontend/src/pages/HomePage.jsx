import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/HomePage.css';
import { FaGithub, FaGlobe, FaRocket } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import BenessereSection from '../components/BenessereSection';
import LGBTQSection from '../components/LGBTQSection';
import BoardSection from '../components/BoardSection'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);


  const [modalContent, setModalContent] = useState({
    title: '',
    body: '',
    image: ''
  });
  
  
  const handleOpenModal = (title, body, image) => {
    setModalContent({ title, body, image });
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };


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
      <div className="hero-section d-flex justify-content-center align-items-center text-center">
        <div className="container">
          <div className="hero-content">
            <h1 className="title-hero fw-bold display-4">Benvenutə su ParentUp</h1>
            <p className="subtitle-hero lead">L'app pensata per il post-partum e post-adozione per papà e famiglie LGBTQ+</p>
            <a href="#neonato" className="btn btn-outline-light mt-3">Scopri le sezioni ↓</a>
          </div>
        </div>
      </div>

      {/* Sezione Cura del Neonato */}
      <section id="neonato" className="py-5 bg-light" data-aos="fade-up">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Cura del Bambino</h2>
            <p className="text-muted">
            Dal pannolino al bagnetto: tutto ciò che devi sapere per prenderti cura del tuo neonato.
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

      <BenessereSection />
      <LGBTQSection />


      {/* Sezione Ritorno al Lavoro */}
      <section id="lavoro" className="py-5" data-aos="fade-up">
        <div className="container">
          <h2 className="mb-3">Ritorno al Lavoro</h2>
          <p>
            Suggerimenti su come rientrare al lavoro in modo graduale, con mappa dei parcheggi rosa,
            gestione del tempo e consigli su congedi e diritti.
          </p>
          <BoardSection />
        </div>
      </section>
      
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          {/* Riga con testo + icone */}
          <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mb-3">
            <p className="mb-0 fw-bold">
              &copy; {new Date().getFullYear()} ParentUp - Tutti i diritti riservati - progetto sviluppato da Balia Katiuscia
            </p>
            <div className="d-flex gap-3">
              <a href="https://github.com/KateB-creator" target="_blank" rel="noopener noreferrer" className="text-white fs-5">
                <FaGithub />
              </a>
              <a href="https://kateb-creator.github.io/il-mio-sito-web/" target="_blank" rel="noopener noreferrer" className="text-white fs-5">
                <FaGlobe />
              </a>
              <a href="https://www.start2impact.it" target="_blank" rel="noopener noreferrer" className="text-white fs-5">
                <FaRocket />
              </a>
            </div>
          </div>

          {/* Riga con link privacy e contatti */}
          <p className="text-center small mb-0">
            <a href="/privacy" className="text-white text-decoration-underline">Privacy</a> ·
            <a href="https://kateb-creator.github.io/il-mio-sito-web/#contact" className="text-white text-decoration-underline ms-2">Contattami</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
