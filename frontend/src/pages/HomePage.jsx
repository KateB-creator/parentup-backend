import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/HomePage.css";
import { FaGithub, FaGlobe, FaRocket } from "react-icons/fa";
import Navbar from "../components/Navbar";
import BenessereSection from "../components/BenessereSection";
import LGBTQSection from "../components/LGBTQSection";
import BoardSection from "../components/BoardSection";
import BabyCareSection from "../components/BabyCareSection";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={`loading-screen ${isLoading ? "" : "fade-out"}`}>
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
            <h1 className="title-hero fw-bold display-4">
              Benvenutə su ParentUp
            </h1>
            <p className="subtitle-hero">
              L'app pensata per il post-partum e post-adozione per papà e
              famiglie LGBTQ+
            </p>
            <a href="#neonato" className="btn btn-outline-light mt-3">
              Scopri le sezioni ↓
            </a>
          </div>
        </div>
      </div>

      <BabyCareSection />
      <BenessereSection />
      <LGBTQSection />

      <section id="lavoro" className="py-5" data-aos="fade-up">
        <div className="container">
          <h2 className="mb-3">Ritorno al Lavoro</h2>
          <p>
            Suggerimenti su come rientrare al lavoro in modo graduale, gestione
            del tempo e consigli su congedi e diritti.
          </p>

          {/* Accordion */}
          <div className="accordion mb-4" id="workAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Posso chiedere un rientro part-time dopo il congedo parentale?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#workAccordion"
              >
                <div className="accordion-body">
                  Sì, molti contratti e normative italiane prevedono la
                  possibilità di richiedere il part-time temporaneo dopo il
                  congedo parentale. È consigliabile parlarne con l'ufficio HR o
                  consultare un sindacato.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Quali diritti ho come genitore lavoratore al rientro?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#workAccordion"
              >
                <div className="accordion-body">
                  Hai diritto a permessi per malattia del bambino, congedi
                  parentali retribuiti o non retribuiti, e orari flessibili in
                  base al contratto. In alcuni casi è possibile anche richiedere
                  lo smart working.
                </div>
              </div>
            </div>

            {/* Accordion 3 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Come organizzarsi per il rientro al lavoro?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#workAccordion"
              >
                <div className="accordion-body">
                  Preparati in anticipo: organizza il supporto (partner, nonni,
                  babysitter), pianifica orari realistici e comunica le tue
                  esigenze al datore di lavoro. Lascia momenti per te e per il
                  tuo benessere emotivo.
                </div>
              </div>
            </div>

            {/* Accordion 4 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  È possibile continuare ad allattare al rientro?
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#workAccordion"
              >
                <div className="accordion-body">
                  Sì, molte mamme allattano anche dopo il rientro al lavoro
                  grazie all’uso del tiralatte. In Italia esistono anche ore di
                  allattamento previste per legge nei primi mesi dopo il parto.
                </div>
              </div>
            </div>
          </div>

          {/* Bacheca con post */}
          <BoardSection />
        </div>
      </section>

      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          {/* Riga con testo + icone */}
          <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mb-3">
            <p className="mb-0 fw-bold">
              &copy; {new Date().getFullYear()} ParentUp - Tutti i diritti
              riservati - progetto sviluppato da Balia Katiuscia
            </p>
            <div className="d-flex gap-3">
              <a
                href="https://github.com/KateB-creator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-5"
              >
                <FaGithub />
              </a>
              <a
                href="https://kateb-creator.github.io/il-mio-sito-web/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-5"
              >
                <FaGlobe />
              </a>
              <a
                href="https://www.start2impact.it"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-5"
              >
                <FaRocket />
              </a>
            </div>
          </div>

          {/* Riga con link privacy e contatti */}
          <p className="text-center small mb-0">
            <a href="/privacy" className="text-white text-decoration-underline">
              Privacy
            </a>{" "}
            ·
            <a
              href="https://kateb-creator.github.io/il-mio-sito-web/#contact"
              className="text-white text-decoration-underline ms-2"
            >
              Contattami
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
