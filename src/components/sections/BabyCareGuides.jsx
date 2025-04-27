import { useState } from 'react';
import '../styles/BabyCareGuides.scss';

function BabyCareGuides() {
  const guides = [
    { id: 'igiene', icon: '🛁', title: 'Come fare il bagnetto', content: 'Usa acqua tiepida (circa 37°C) e un detergente delicato. Sostieni il bambino e lavalo con movimenti dolci.' },
    { id: 'pannolino', icon: '🍼', title: 'Come cambiare il pannolino', content: 'Pulisci delicatamente con salviette o acqua tiepida, asciuga bene e applica crema protettiva.' },
    { id: 'temperatura', icon: '🌡️', title: 'Come controllare la temperatura', content: 'Usa un termometro digitale. La temperatura ideale è tra 36,5°C e 37,5°C.' },
    { id: 'cordone', icon: '✂️', title: 'Come pulire il cordone ombelicale', content: 'Pulisci con una garza sterile inumidita, senza strofinare. Mantieni asciutto fino alla caduta naturale.' },
  ];

  const [search, setSearch] = useState('');
  const [selectedGuide, setSelectedGuide] = useState(null);

  const filteredGuides = guides.filter(guide =>
    guide.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="baby-care-guides my-5">
      <h3 className="text-center mb-4">Guide per la Cura del Neonato</h3>

      {/* Barra di ricerca */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Cerca guida..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Bottoni guida */}
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {filteredGuides.map(guide => (
          <button
            key={guide.id}
            className="btn btn-light guide-button"
            onClick={() => setSelectedGuide(guide)}
          >
            <span className="guide-icon">{guide.icon}</span> {guide.title}
          </button>
        ))}
      </div>

      {/* Modale guida */}
      {selectedGuide && (
        <div className="modal fade show d-block fade-custom d-flex align-items-center justify-content-center" tabIndex="-1">

          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedGuide.title}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedGuide(null)}></button>
              </div>
              <div className="modal-body">
                {selectedGuide.content}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedGuide(null)}>
                  Chiudi
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelectedGuide(null)}></div>
        </div>
      )}
    </div>
  );
}

export default BabyCareGuides;
