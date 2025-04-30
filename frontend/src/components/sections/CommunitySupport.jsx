import { useState } from 'react';
import '../styles/CommunitySupport.scss';

function CommunitySupport() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    expertType: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Dati che sto inviando:', formData);
  
    try {
      const response = await fetch('http://localhost/parentup/backend/saveRequest.php', { // QUI ABSOLUTE URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const text = await response.text();
      console.log('Risposta server:', text);
  
      const result = JSON.parse(text);
  
      if (response.ok) {
        console.log(result.message);
        setSubmitted(true);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Errore nella richiesta:', error);
    }
  
    setFormData({
      name: '',
      email: '',
      expertType: '',
      message: ''
    });
  };

  return (
    <main className="community-page container py-5">
      <h2 className="mb-4">Community e supporto</h2>
      <p className="mb-5">Connettiti con altri genitori, partecipa ai forum, ricevi supporto dagli esperti.</p>

      <div className="row g-4">
        {/* Forum */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">🗣️ Forum</h5>
              <p className="card-text flex-grow-1">Partecipa alle discussioni nei forum dedicati ai diversi tipi di genitori.</p>
              <button className="btn btn-outline-primary mt-auto">Accedi ai forum</button>
            </div>
          </div>
        </div>

        {/* Q&A con esperti */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">❓ Q&A con esperti</h5>
              <p className="card-text flex-grow-1">Fai domande direttamente a psicologi, pediatri e specialisti della genitorialità.</p>
              <button className="btn btn-outline-primary mt-auto">Fai una domanda</button>
            </div>
          </div>
        </div>

        {/* Form contatto esperto */}
      <div className="contact-expert-form">
        <h3 className="mb-3">Contatta uno specialista</h3>

        {submitted ? (
          <div className="alert alert-success" role="alert">
            Richiesta inviata con successo! Ti risponderemo al più presto.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nome completo</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tipo di esperto</label>
              <select
                className="form-select"
                name="expertType"
                value={formData.expertType}
                onChange={handleChange}
                required
              >
                <option value="">-- Seleziona --</option>
                <option value="Psicologo">Psicologo</option>
                <option value="Ostetrica">Ostetrica</option>
                <option value="Consulente genitoriale">Consulente genitoriale</option>
                <option value="Pediatra">Pediatra</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Messaggio</label>
              <textarea
                className="form-control"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">Invia richiesta</button>
          </form>
        )}
      </div>

        {/* Gruppi tematici */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">👥 Gruppi tematici</h5>
              <p className="card-text flex-grow-1">Unisciti a gruppi di genitori con esperienze simili per condividere supporto e storie.</p>
              <button className="btn btn-outline-primary mt-auto">Esplora gruppi</button>
            </div>
          </div>
        </div>

        {/* Incontri online */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">📅 Incontri online</h5>
              <p className="card-text flex-grow-1">Partecipa a eventi live o chatroom per confrontarti con altri genitori.</p>
              <button className="btn btn-outline-primary mt-auto">Scopri eventi</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CommunitySupport;
