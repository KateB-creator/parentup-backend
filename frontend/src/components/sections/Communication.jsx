import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Communication.scss';

function Communication() {
  
  const [diaryEntry, setDiaryEntry] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  const handleSave = () => {
    setSavedMessage(diaryEntry);
    setDiaryEntry(''); // svuota la textarea dopo il salvataggio
  };

  const [emotion, setEmotion] = useState('');

  const handleEmotion = (selectedEmotion) => {
    setEmotion(selectedEmotion);
  };
  
  return (
    <div className="communication-page container py-5">
      <h2 className="mb-4">Comunicazione con l’altro genitore</h2>
      <p className="mb-5">Questa sezione aiuterà i genitori a comunicare in modo efficace e affettuoso.</p>

      <div className="row g-4">
        {/* Diario condiviso */}
        <div className="col-12">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">📖 Diario condiviso</h5>
              <textarea
                className="form-control mb-3"
                rows="5"
                placeholder="Scrivi cosa ha fatto il bimbo oggi, emozioni, pensieri..."
                value={diaryEntry}
                onChange={(e) => setDiaryEntry(e.target.value)}
              ></textarea>
              <button className="btn btn-primary" onClick={handleSave}>
                Salva nota
              </button>

              {/* Mostra il messaggio salvato */}
              {savedMessage && (
                <div className="alert alert-success mt-4" role="alert">
                  Nota salvata: <br /> <em>{savedMessage}</em>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Schede "Come sto" */}
        
        <div className="col-12">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column align-items-center">
              <h5 className="card-title">💬 Come mi sento oggi?</h5>
              
              <div className="emotion-buttons my-3">
                <button className="btn btn-light mx-2" onClick={() => handleEmotion('😊 Felice')}>
                  😊
                </button>
                <button className="btn btn-light mx-2" onClick={() => handleEmotion('😢 Triste')}>
                  😢
                </button>
                <button className="btn btn-light mx-2" onClick={() => handleEmotion('😠 Arrabbiato')}>
                  😠
                </button>
                <button className="btn btn-light mx-2" onClick={() => handleEmotion('😴 Stanco')}>
                  😴
                </button>
              </div>

              {emotion && (
                <div className="alert alert-info mt-3" role="alert">
                  Stato selezionato: <strong>{emotion}</strong>
                </div>
              )}
            </div>
          </div>
        </div>


        {/* Calendario familiare */}
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">📅 Calendario familiare</h5>
              <p className="card-text flex-grow-1">
                Gestisci turni, appuntamenti, momenti per te e per il partner.
              </p>
              <Link to="#" className="btn btn-outline-primary mt-auto">Apri calendario</Link>
            </div>
          </div>
        </div>

        {/* Spazio "Noi due" */}
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">❤️ Spazio "Noi due"</h5>
              <p className="card-text flex-grow-1">
                Esercizi, giochi e idee per rafforzare la comunicazione di coppia.
              </p>
              <Link to="#" className="btn btn-outline-primary mt-auto">Scopri di più</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Communication;
