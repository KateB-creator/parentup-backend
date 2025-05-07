import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Communication.scss';

function Communication() {
  const [user] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [diaryEntry, setDiaryEntry] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const [emotion, setEmotion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmotion = (selectedEmotion) => {
    setEmotion(selectedEmotion);
  };

  const handleSave = async () => {
    if (!user || !user.token) {
      alert('Utente non autenticato');
      return;
    }

    if (!diaryEntry.trim()) {
      alert('Scrivi prima qualcosa nel diario.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost/parentup/backend/api/diary/save_diary_entry.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ entry: diaryEntry, emotion })
      });

      const text = await res.text();
      console.log('📦 Risposta server:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('❌ Risposta non JSON:', err);
        alert('Errore nel formato della risposta dal server.');
        return;
      }

      if (data.success) {
        setSavedMessage(diaryEntry);
        setDiaryEntry('');
        setEmotion('');
      } else {
        alert('Errore nel salvataggio.');
      }
    } catch (err) {
      console.error('❌ Errore fetch:', err);
      alert('Errore nella comunicazione con il server.');
    } finally {
      setLoading(false);
    }
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
              <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
                Salva nota
              </button>

              {loading && (
                <div className="text-info mt-2">⏳ Salvataggio in corso...</div>
              )}

              {savedMessage && (
                <div className="alert alert-success mt-4" role="alert">
                  Nota salvata: <br /> <em>{savedMessage}</em>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Emozioni */}
        <div className="col-12">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column align-items-center">
              <h5 className="card-title">💬 Come mi sento oggi?</h5>
              <div className="emotion-buttons my-3">
                {['😊 Felice', '😢 Triste', '😠 Arrabbiato', '😴 Stanco'].map(e => (
                  <button key={e} className="btn btn-light mx-2" onClick={() => handleEmotion(e)}>
                    {e.split(' ')[0]}
                  </button>
                ))}
              </div>

              {emotion && (
                <div className="alert alert-info mt-3" role="alert">
                  Stato selezionato: <strong>{emotion}</strong>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Calendario */}
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

        {/* Spazio coppia */}
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
