import '../styles/LGBTQParenting.scss';

function LGBTQParenting() {
  return (
    <div className="container my-5 lgbtq-parenting-page">
      <h2 className="text-center mb-4">🏳️‍🌈 Genitorialità LGBTQ+</h2>

      {/* Tipologie di famiglie */}
      <section className="mb-5">
        <h4>👨‍👨‍👧‍👦 Tipologie di Famiglie</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            👩‍❤️‍👩 Adozione e affido per coppie omogenitoriali
            <br />
            <a href="https://famigliearcobaleno.org/adozioni" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary mt-2">
              Scopri di più →
            </a>
          </li>
          <li className="list-group-item">
            👨‍👨‍👧‍👦 Co-genitorialità e famiglie condivise
            <br />
            <a href="https://www.retegenitorirainbow.it/cogenitorialita" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary mt-2">
              Approfondisci →
            </a>
          </li>
          <li className="list-group-item">
            🌈 Famiglie Arcobaleno: storie di coraggio e amore
            <br />
            <a href="https://famigliearcobaleno.org/storie" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary mt-2">
              Leggi le storie →
            </a>
          </li>
        </ul>
      </section>

      {/* Diritti e Legislazione */}
      <section className="mb-5">
        <h4>⚖️ Diritti e Legislazione</h4>
        <p>
          Le leggi variano da paese a paese. Ti invitiamo a informarti sui tuoi diritti riguardo adozione, riconoscimento legale, 
          e tutela dei figli. Per l’Italia: <a href="https://famigliearcobaleno.org" target="_blank" rel="noopener noreferrer">famigliearcobaleno.org</a>
        </p>
      </section>

      {/* Supporto Emotivo */}
      <section className="mb-5">
        <h4>💬 Supporto Emotivo</h4>
        <p>
          La genitorialità LGBTQ+ può incontrare sfide uniche. Non sei solə. 
          Esistono gruppi, professionisti e comunità pronti ad ascoltarti.
        </p>
      </section>

      {/* Risorse Utili */}
      <section className="mb-5">
        <h4>📚 Risorse Utili</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <a href="https://famigliearcobaleno.org" target="_blank" rel="noopener noreferrer">
              🌈 Famiglie Arcobaleno – Sostegno, eventi e comunità
            </a>
          </li>
          <li className="list-group-item">
            <a href="https://www.retegenitorirainbow.it/" target="_blank" rel="noopener noreferrer">
              🌐 Rete Genitori Rainbow – Ascolto e orientamento
            </a>
          </li>
          <li className="list-group-item">
            <a href="https://www.tuttotranquillo.it/" target="_blank" rel="noopener noreferrer">
              📖 Libri e materiali per bambini e bambine inclusivi
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default LGBTQParenting;
