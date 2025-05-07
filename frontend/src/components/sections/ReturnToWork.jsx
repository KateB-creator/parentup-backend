import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/ReturnToWork.scss';

// Fix icone Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

// Componente per aggiungere un nuovo parcheggio rosa
function AddParkingMarker({ onAdd }) {
  useMapEvents({
    click(e) {
      const confirmAdd = window.confirm('Vuoi aggiungere un nuovo parcheggio rosa qui?');
      if (confirmAdd) {
        onAdd({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    }
  });
  return null;
}

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
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialTasks;
    } catch {
      return initialTasks;
    }
  });

  const [plans, setPlans] = useState({});
  const [formData, setFormData] = useState({ childcare: '', workHours: '', supportNeeded: '' });
  const [userPosition, setUserPosition] = useState(null);
  const [parkingSpots, setParkingSpots] = useState([]);

  const completedCount = tasks.filter(task => task.done).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const days = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

  const carIcon = new L.Icon({
    iconUrl: '/icons/car.png',
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -30],
  });

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => alert('Impossibile ottenere la tua posizione.')
      );
    } else {
      alert('Geolocalizzazione non supportata dal browser.');
    }
  };

  useEffect(() => {
    fetch('http://localhost/parentup/backend/api/parking/get_all.php')
      .then(res => res.json())
      .then(data => setParkingSpots(data))
      .catch(err => console.error(err));
  }, []);

  const handleAddParking = (spot) => {
    fetch('http://localhost/parentup/backend/api/parking/add.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spot)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setParkingSpots(prev => [...prev, spot]);
        else alert('Errore nel salvataggio del parcheggio.');
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    localStorage.setItem('returnToWorkTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const fetchReturnToWorkData = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      try {
        const res = await fetch('http://localhost/parentup/backend/api/return_to_work/get_return_to_work.php', {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        if (!res.ok) throw new Error('Errore nel fetch');
        const data = await res.json();
        if (data) {
          if (Array.isArray(data.checklist) && data.checklist.length > 0) {
            setTasks(data.checklist);
          }
          if (typeof data.planner === 'object') setPlans(data.planner);
          if (typeof data.formData === 'object') {
            setFormData({
              childcare: data.formData.childcare || '',
              workHours: data.formData.workHours || '',
              supportNeeded: data.formData.supportNeeded || ''
            });
          }
        }
      } catch (error) {
        console.error("Errore nel fetch dati:", error);
      }
    };
    fetchReturnToWorkData();
  }, []);
  

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const handlePlanChange = (day, value) => {
    setPlans({ ...plans, [day]: value });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    await fetch('http://localhost/parentup/backend/api/return_to_work/save_return_to_work.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({
        checklist: tasks,
        planner: plans,
        formData: formData
      })
    });
    alert('Piano salvato!');
  };

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

      {/* Planner */}
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
              placeholder={`Impegni per ${day}`}
            />
          </div>
        ))}
      </div>

      {/* Form personalizzato */}
      <div className="my-5">
        <h3 className="mb-4">Personalizza il tuo Piano</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label className="form-label">Assistenza</label>
            <input
              type="text"
              className="form-control"
              name="childcare"
              value={formData.childcare}
              onChange={handleFormChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Orari di lavoro</label>
            <input
              type="text"
              className="form-control"
              name="workHours"
              value={formData.workHours}
              onChange={handleFormChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Supporto</label>
            <textarea
              className="form-control"
              name="supportNeeded"
              value={formData.supportNeeded}
              onChange={handleFormChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Salva Piano</button>
        </form>
      </div>

      {/* Mappa parcheggi */}
      <div className="my-5">
        <h3 className="mb-4">📍 Parcheggi Rosa Vicino a Te</h3>
        <p>Clicca sulla mappa per aggiungere nuovi parcheggi. La tua posizione è in blu.</p>
        <button className="btn btn-success mb-3" onClick={handleLocate}>
          📍 Trova la tua posizione
        </button>

        <div className="map-container" style={{ height: '500px', width: '100%' }}>
          <MapContainer center={userPosition || [41.9, 12.5]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {userPosition && (
              <Marker position={userPosition} icon={carIcon}>
                <Popup>La tua posizione</Popup>
              </Marker>
            )}
            {parkingSpots.map((spot, i) => (
              <Marker key={i} position={[spot.lat, spot.lng]} icon={carIcon}>
                <Popup>Parcheggio rosa</Popup>
              </Marker>
            ))}
            <AddParkingMarker onAdd={handleAddParking} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default ReturnToWork;
