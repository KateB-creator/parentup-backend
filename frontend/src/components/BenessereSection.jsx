import React, { useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


const BenessereSection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (direction === 'left') {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    } else {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const cards = [
    {
      title: "Meditazione Guidata",
      image: "../assets/meditazione_guidata.webp",
      text: "Rilassa la mente con audio guidati.",
      link: "https://www.insighttimer.com/it" // app gratuita per meditazioni in italiano
    },
    {
      title: "Esercizi Dolci",
      image: "../assets/esercizi_postparto.webp",
      text: "Movimenti per il corpo post-parto.",
      link: "https://www.mammole.it/riabilitazione-post-partum/" // articoli e video post-parto
    },
    {
      title: "Podcast Motivazionali",
      image: "../assets/podcast.webp",
      text: "Parole e voci per il tuo benessere.",
      link: "https://open.spotify.com/show/0xyGx6S1bDHUBB3E7fvj8q" // podcast su maternità (es. Mammadimerda o simili)
    },
    {
      title: "Libri Consigliati",
      image: "../assets/libri.webp",
      text: "Letture selezionate per i neogenitori.",
      link: "https://www.ibs.it/libri/maternita-e-infanzia/maternita-c53" // catalogo libri su IBS
    },
    {
      title: "Parla con un Esperto",
      image: "../assets/psicologo.webp",
      text: "Psicologi, ostetriche e counselor a portata di click.",
      link: "https://www.mammamiahelp.it/" // piattaforma di supporto per neogenitori
    }
  ];

  return (
    <section id="benessere" className="py-5 bg-light" data-aos="fade-right">
      <div className="container position-relative">
        <h2 className="mb-3">Benessere</h2>
        <p>
          Meditazioni guidate, esercizi dolci per il corpo e podcast per il supporto emotivo.
          Un angolo per prenderti cura di te mentre cresci tuo figlio.
        </p>

        <button
          onClick={() => scroll('left')}
          className="btn btn-primary position-absolute start-0 top-50 translate-middle-y z-3"
        >
          <FaArrowLeft />
        </button>

        <div
          ref={scrollRef}
          className="d-flex overflow-auto gap-3 py-3 px-5"
          style={{ scrollBehavior: 'smooth' }}
        >
          {cards.map((card, idx) => (
            <div key={idx} className="card shadow-sm" style={{ minWidth: '250px', flex: '0 0 auto' }}>
              <img src={card.image} className="card-img-top" alt={card.title} />
              <div className="card-body text-center">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.text}</p>
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm"
                >
                  Vai →
                </a>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="btn btn-primary position-absolute end-0 top-50 translate-middle-y z-3"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default BenessereSection;
