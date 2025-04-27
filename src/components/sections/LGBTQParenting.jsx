import '../styles/LGBTQParenting.scss';

function LGBTQParenting() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Genitorialità LGBTQ+</h2>

      {/* Introduzione */}
      <div className="mb-5">
        <h4>🌈 Accogliamo tutte le famiglie</h4>
        <p>
          Ogni famiglia merita amore, rispetto e supporto. In questa sezione troverai risorse dedicate a genitori e famiglie LGBTQ+ per affrontare il meraviglioso viaggio della genitorialità.
        </p>
      </div>

      {/* Tipologie di famiglie */}
      <div className="mb-5">
        <h4>👩‍❤️‍👩 👨‍❤️‍👨 Tipologie di Famiglie</h4>
        <ul className="list-group">
          <li className="list-group-item">Adozione e affido da parte di coppie LGBTQ+</li>
          <li className="list-group-item">Co-genitorialità e piani familiari condivisi</li>
          <li className="list-group-item">Famiglie Arcobaleno: storie di amore e coraggio</li>
        </ul>
      </div>

      {/* Diritti e Legislazione */}
      <div className="mb-5">
        <h4>⚖️ Diritti e Legislazione</h4>
        <p>
          La situazione legislativa varia da paese a paese. Ti invitiamo a informarti sui tuoi diritti locali riguardo riconoscimento legale, adozione, tutela e certificazione di nascita.
        </p>
      </div>

      {/* Supporto Emotivo */}
      <div className="mb-5">
        <h4>💬 Supporto Emotivo</h4>
        <p>
          La genitorialità LGBTQ+ può incontrare sfide uniche. Non sei solə: cerca supporto attraverso gruppi locali, forum online e professionisti specializzati.
        </p>
      </div>

      {/* Risorse Utili */}
      <div className="mb-5">
        <h4>📚 Risorse Utili</h4>
        <ul className="list-group">
          <li className="list-group-item">Associazioni come Famiglie Arcobaleno e Rete Genitori Rainbow</li>
          <li className="list-group-item">Libri per bambini che celebrano la diversità familiare</li>
          <li className="list-group-item">Sportelli di ascolto e consulenza</li>
        </ul>
      </div>
    </div>
  );
}

export default LGBTQParenting;
