import '../styles/EmotionalWellbeing.scss';

function EmotionalWellbeing() {
  return (
    <main className="emotional-page container py-5">
      <h2 className="mb-4">Benessere emotivo e mentale</h2>
      <p className="mb-5">Strumenti per prenderti cura di te stesso durante il percorso post-parto o post-adozione.</p>

      <div className="row g-4">
        {/* Meditazioni brevi */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">🧘‍♂️ Meditazioni brevi</h5>
              <p className="card-text flex-grow-1">Ascolta meditazioni guidate di pochi minuti per ritrovare calma ed energia.</p>
              <button className="btn btn-outline-primary mt-auto">Ascolta meditazione</button>
            </div>
          </div>
        </div>

        {/* Esercizi di respiro */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">🌬️ Esercizi di respiro</h5>
              <p className="card-text flex-grow-1">Scopri semplici tecniche di respiro per gestire stress e ansia.</p>
              <button className="btn btn-outline-primary mt-auto">Scopri esercizi</button>
            </div>
          </div>
        </div>

        {/* Mini podcast motivazionali */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">🎧 Mini podcast motivazionali</h5>
              <p className="card-text flex-grow-1">Ascolta storie brevi per ritrovare ispirazione nei momenti difficili.</p>
              <button className="btn btn-outline-primary mt-auto">Ascolta podcast</button>
            </div>
          </div>
        </div>

        {/* Diario delle emozioni */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">📝 Diario delle emozioni</h5>
              <p className="card-text flex-grow-1">Scrivi e monitora il tuo stato emotivo giorno per giorno.</p>
              <button className="btn btn-outline-primary mt-auto">Scrivi nel diario</button>
            </div>
          </div>
        </div>

        {/* Accesso a specialisti */}
        <div className="col-12">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column align-items-center text-center">
              <h5 className="card-title">👩‍⚕️ Accesso a specialisti</h5>
              <p className="card-text">
                Trova supporto da psicologi, ostetriche, counselor specializzati nel post-parto e nella genitorialità.
              </p>
              <button className="btn btn-primary mt-3">Contatta uno specialista</button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

export default EmotionalWellbeing;
