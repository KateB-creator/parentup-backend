import React from 'react';
import '../styles/LGBTQSection.css';

const LGBTQSection = () => {
  return (
    <section id="lgbtq" className="py-5 bg-light" data-aos="fade-left">
      <div className="container">
        <h2 className="mb-4 title-lgbtq">Genitorialità LGBTQ+</h2>
        <p className="mb-5">
          Uno spazio inclusivo per papà gay, famiglie omogenitoriali e chiunque viva una
          genitorialità diversa ma piena d'amore. Con risorse legali, sociali e di comunità.
        </p>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="p-4 bg-white rounded shadow-sm h-100">
              <h5 className="fw-bold">👩‍❤️‍👩 Adozione e Affido</h5>
              <p>
                Per coppie omogenitoriali che desiderano diventare genitori.
                Scopri possibilità e percorsi reali.
              </p>
              <a href="https://famigliearcobaleno.org/adozioni" target="_blank" rel="noopener noreferrer" className="btn btn-warning btn-sm">
                Scopri di più →
              </a>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 bg-white rounded shadow-sm h-100">
              <h5 className="fw-bold">👨‍👨‍👧‍👦 Co-genitorialità</h5>
              <p>
                Modelli familiari condivisi tra più adulti consapevoli e presenti. 
                Inclusione e collaborazione.
              </p>
              <a href="https://www.retegenitorirainbow.it/cogenitorialita" target="_blank" rel="noopener noreferrer" className="btn btn-warning btn-sm">
                Approfondisci →
              </a>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 bg-white rounded shadow-sm h-100">
              <h5 className="fw-bold">🌈 Famiglie Arcobaleno</h5>
              <p>
                Storie vere di coraggio, amore e orgoglio. 
                Per ispirarti e sentirti parte di una comunità.
              </p>
              <a href="https://famigliearcobaleno.org/storie" target="_blank" rel="noopener noreferrer" className="btn btn-warning btn-sm">
                Leggi le storie →
              </a>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 bg-white rounded shadow-sm h-100">
              <h5 className="fw-bold">⚖️ Diritti e Legislazione</h5>
              <p>
                Le leggi variano da paese a paese. Informati sui tuoi diritti riguardo
                adozione, riconoscimento legale e tutela dei figli.
              </p>
              <a href="https://famigliearcobaleno.org" target="_blank" rel="noopener noreferrer" className="btn btn-warning btn-sm">
                famigliearcobaleno.org →
              </a>
            </div>
          </div>

          <div className="col-md-12">
            <div className="p-4 bg-white rounded shadow-sm d-flex align-items-center justify-content-between flex-wrap">
              <div className="pe-3">
                <h5 className="fw-bold">💬 Supporto Emotivo</h5>
                <p>
                  La genitorialità LGBTQ+ può incontrare sfide uniche. Non sei solə.
                  Esistono gruppi, professionisti e comunità pronti ad ascoltarti.
                </p>
              </div>
              <img src="../assets/lgbtq.svg" alt="Supporto emotivo" className="img-fluid" style={{ maxWidth: '150px' }} />
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 bg-white rounded shadow-sm h-100">
              <h6 className="fw-bold">🌈 Famiglie Arcobaleno</h6>
              <p>Sostegno, eventi e comunità per famiglie LGBTQ+.</p>
              <a href="https://famigliearcobaleno.org" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-warning">
                Visita →
              </a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 bg-white rounded shadow-sm h-100">
              <h6 className="fw-bold">🌐 Rete Genitori Rainbow</h6>
              <p>Ascolto, orientamento e supporto ai genitori LGBTQ+.</p>
              <a href="https://www.retegenitorirainbow.it/" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-warning">
                Visita →
              </a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 bg-white rounded shadow-sm h-100">
              <h6 className="fw-bold">📖 Tutto Tranquillo</h6>
              <p>Libri e materiali inclusivi per l'infanzia.</p>
              <a href="https://www.tuttotranquillo.it/" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-warning">
                Visita →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LGBTQSection;
