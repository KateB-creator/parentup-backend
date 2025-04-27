import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import '../styles/ReturnToWork.scss';

function ReturnToWork() {
  // Checklist
  const initialTasks = [
    { id: 1, text: "Organizzare l'assistenza all'infanzia", done: false },
    { id: 2, text: "Pianificare orari di lavoro flessibili", done: false },
    { id: 3, text: "Preparare la borsa del bambino", done: false },
    { id: 4, text: "Stabilire routine mattutine", done: false },
    { id: 5, text: "Comunicare con il datore di lavoro", done: false },
  ];

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('returnToWorkTasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('returnToWorkTasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const completedCount = tasks.filter(task => task.done).length;
  const totalCount = tasks.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // Planner settimanale
  const days = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
  const [plans, setPlans] = useState({});

  const handlePlanChange = (day, value) => {
    setPlans({ ...plans, [day]: value });
  };

  // Form interattivo
  const [formData, setFormData] = useState({
    childcare: '',
    workHours: '',
    supportNeeded: '',
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  // Mappa parcheggi rosa
  const mapStyles = { height: "400px", width: "100%" };
  const defaultCenter = { lat: 39.2238, lng: 9.1217 };
  const pinkParkingLocations = [
    { lat: 39.2240, lng: 9.1215 },
    { lat: 39.2235, lng: 9.1220 },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Rientro al Lavoro</h2>

      {/* Checklist */}
      <div className="my-5">
        <h3 className="mb-4">Checklist per il Rientro</h3>
        <div className="mb-3 text-center">
          <span className="badge bg-primary fs-6">
            Completati {completedCount} su {totalCount} attività
          </span>
        </div>
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
      </div>

      {/* Planner Settimanale */}
      <div className="my-5">
        <h3 className="mb-4">Planner Settimanale</h3>
        {days.map(day => (
          <div key={day} className="mb-3">
            <label className="form-label">{day}</label>
            <input
              type="text"
              className="form-control"
              value={plans[day] || ''}
              onChange={(e) => handlePlanChange(day, e.target.value)}
              placeholder={`Inserisci gli impegni per ${day}`}
            />
          </div>
        ))}
      </div>

      {/* Form Interattivo */}
      <div className="my-5">
        <h3 className="mb-4">Personalizza il tuo Piano di Rientro</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label className="form-label">Assistenza all'infanzia</label>
            <input
              type="text"
              className="form-control"
              name="childcare"
              value={formData.childcare}
              onChange={handleFormChange}
              placeholder="Es. Nonni, Asilo nido, Baby-sitter"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Orari di lavoro desiderati</label>
            <input
              type="text"
              className="form-control"
              name="workHours"
              value={formData.workHours}
              onChange={handleFormChange}
              placeholder="Es. Part-time, Full-time, Flessibile"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Supporto necessario</label>
            <textarea
              className="form-control"
              name="supportNeeded"
              value={formData.supportNeeded}
              onChange={handleFormChange}
              placeholder="Es. Spazio per allattamento, Orari flessibili"
            />
          </div>
          <button type="submit" className="btn btn-primary">Salva Piano</button>
        </form>
      </div>

      {/* Mappa Parcheggi Rosa */}
      <div className="my-5">
        <h3 className="mb-4">Parcheggi Rosa Vicino a Te</h3>
        <LoadScript googleMapsApiKey="YOUR_API_KEY">
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}
          >
            {pinkParkingLocations.map((location, index) => (
              <Marker key={index} position={location} icon="http://maps.google.com/mapfiles/ms/icons/pink-dot.png" />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default ReturnToWork;
