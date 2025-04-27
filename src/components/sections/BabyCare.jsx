import { useState, useEffect } from 'react';
import '../styles/BabyCare.scss';
import TimelineRoutine from './TimelineRoutine'; 
import BabyCareGuides from './BabyCareGuides'; 

function BabySleepCarousel() {
  return (
    <div id="babySleepCarousel" className="carousel slide my-5" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/images/sonno1.jpg" className="d-block w-100" alt="Routine della nanna" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Routine della Nanna</h5>
            <p>Stabilisci una routine serena prima di dormire.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/images/sonno2.jpg" className="d-block w-100" alt="Ambiente ideale" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Ambiente Ideale</h5>
            <p>Camera fresca, buia e silenziosa aiuta il riposo.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/images/sonno3.jpg" className="d-block w-100" alt="Posizione sicura" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Posizione Sicura</h5>
            <p>Sempre supino, su superficie rigida e senza cuscini.</p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#babySleepCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#babySleepCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

function BabyCareChecklist() {
  const initialTasks = [
    { id: 1, text: "Cambio pannolino", done: false },
    { id: 2, text: "Controllo temperatura", done: false },
    { id: 3, text: "Pulizia cordone ombelicale", done: false },
    { id: 4, text: "Bagnetto quotidiano", done: false },
    { id: 5, text: "Controllo delle poppate", done: false },
    { id: 6, text: "Monitoraggio pannolini bagnati", done: false },
    { id: 7, text: "Pulizia nasino", done: false },
    { id: 8, text: "Tempo sul pancino (tummy time)", done: false },
    { id: 9, text: "Idratazione della pelle", done: false },
    { id: 10, text: "Controllo generale della pelle", done: false },
  ];

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('babyCareTasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('babyCareTasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const completedCount = tasks.filter(task => task.done).length;
  const totalCount = tasks.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="my-5">
      <h3 className="mb-4">Checklist Cura Quotidiana</h3>

      {/* Contatore progressi */}
      <div className="mb-3 text-center">
        <span className="badge bg-primary fs-6">
          Completati {completedCount} su {totalCount} attività
        </span>
      </div>

      {/* Barra di progresso */}
      <div className="progress mb-4" style={{ height: '20px' }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progressPercent}%` }}
          aria-valuenow={progressPercent}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {progressPercent}%
        </div>
      </div>

      {/* Lista attività */}
      <ul className="list-group">
        {tasks.map(task => (
          <li 
            key={task.id} 
            className={`list-group-item d-flex justify-content-between align-items-center ${task.done ? 'list-group-item-success' : ''}`}
            onClick={() => toggleTask(task.id)}
            style={{ cursor: 'pointer' }}
          >
            {task.text}
            {task.done && <span className="badge bg-success">Fatto</span>}
          </li>
        ))}
      </ul>

      {/* Sezione attività completate */}
      {completedCount > 0 && (
        <div className="mt-4">
          <h5>Attività Completate:</h5>
          <ul className="list-group">
            {tasks.filter(task => task.done).map(task => (
              <li key={task.id} className="list-group-item list-group-item-success">
                {task.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


function BabyCare() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Cura del Neonato</h2>
      
      {/* Carosello per il sonno */}
      <BabySleepCarousel />

       {/* Timeline Routine della Nanna */}
       <TimelineRoutine />

       {/* Checklist cura quotidiana */}
      <BabyCareChecklist />

       {/* Guide interattive (bagnetto, pannolino, ecc.) */}
      <BabyCareGuides />

    </div>
  );
}

export default BabyCare;