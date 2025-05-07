import { useState, useEffect } from 'react';
import '../styles/ParentJournal.scss';

function ParentJournal() {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState('');
  const [emotion, setEmotion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('parentJournal');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('parentJournal', JSON.stringify(entries));
  }, [entries]);

  const handleSave = () => {
    if (!text.trim()) return;
    const newEntry = {
      date: new Date().toISOString(),
      text,
      emotion
    };
    setEntries([newEntry, ...entries]);
    setText('');
    setEmotion('');
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">📘 Diario Genitoriale</h2>
      <p className="mb-4">Scrivi i tuoi pensieri, emozioni e momenti speciali del giorno.</p>

      {/* Editor */}
      <textarea
        className="form-control mb-3"
        rows="4"
        placeholder="Scrivi qui..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      {/* Emozioni */}
      <div className="mb-3">
        <strong>Come ti senti oggi?</strong><br />
        {['😊', '😢', '😠', '😴', '❤️'].map((emo) => (
          <button
            key={emo}
            className={`btn btn-light mx-1 ${emotion === emo ? 'border border-primary' : ''}`}
            onClick={() => setEmotion(emo)}
          >
            {emo}
          </button>
        ))}
      </div>

      <button className="btn btn-primary" onClick={handleSave}>Salva nota</button>

      {/* Storico */}
      {entries.length > 0 && (
        <div className="mt-5">
          <h4>Note precedenti</h4>
          <ul className="list-group">
            {entries.map((entry, idx) => (
              <li key={idx} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <span><strong>{new Date(entry.date).toLocaleDateString()}</strong></span>
                  <span>{entry.emotion}</span>
                </div>
                <p className="mb-0 mt-2">{entry.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ParentJournal;
