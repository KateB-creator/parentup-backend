// 1. In EmotionalWellbeing.jsx (modifica esistente)
import { useState, useEffect } from 'react';
import '../styles/EmotionalWellbeing.scss';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function EmotionalWellbeing() {
  const [resources, setResources] = useState([]);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    fetch('http://localhost/parentup/backend/api/getWellbeingResources.php')
      .then(res => res.json())
      .then(data => setResources(data))
      .catch(err => console.error('Errore nel caricamento risorse:', err));
  }, []);

  const handleOpenModal = (resource) => {
    setActiveModal(resource);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <main className="emotional-page container py-5">

      <div className='visual-benessere'>
        <div className='container-text'>
        <h2 className="mb-4">Benessere emotivo e mentale</h2>
        <p className="mb-3">Strumenti per prenderti cura di te stesso durante il percorso post-parto o post-adozione.</p>
        </div> 
      </div>
      

      {/* Mini banner illustrato */}
      
      <div className="row g-4">
        {resources.map((item, i) => (
          <div key={i} className={`col-md-6 ${item.type === 'specialist' ? 'col-12' : ''}`}>
            <div className="card shadow-sm h-100">
              <div className={`card-body d-flex flex-column ${item.type === 'specialist' ? 'text-center align-items-center' : ''}`}>
                <h5 className="card-title">{item.icon} {item.title}</h5>
                <p className="card-text flex-grow-1">{item.description}</p>
                <Button variant={item.type === 'specialist' ? 'primary' : 'outline-primary'} onClick={() => handleOpenModal(item)} className="mt-auto">
                  {item.buttonText}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeModal && (
        <Modal show={true} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{activeModal.icon} {activeModal.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{activeModal.description}</p>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between w-100">
            <a href={activeModal.buttonLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary">
              Apri contenuto
            </a>
            <Button variant="secondary" onClick={handleCloseModal}>Chiudi</Button>
          </Modal.Footer>
        </Modal>
      )}
    </main>
  );
}

export default EmotionalWellbeing;
