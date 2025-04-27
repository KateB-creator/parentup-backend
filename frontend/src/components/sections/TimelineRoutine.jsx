import '../styles/TimelineRoutine.scss';

function TimelineRoutine() {
  const steps = [
    { id: 1, title: "Bagnetto serale", description: "Un bagnetto tiepido aiuta il rilassamento." },
    { id: 2, title: "Cambio pannolino e pigiamino", description: "Metti un pigiamino comodo e pulito." },
    { id: 3, title: "Storia della buonanotte", description: "Racconta una fiaba breve o canta una canzoncina." },
    { id: 4, title: "Luci soffuse", description: "Crea un ambiente tranquillo con luci tenui." },
    { id: 5, title: "Coccole finali", description: "Dedica qualche minuto a coccolare il tuo piccolo." },
    { id: 6, title: "Nel lettino sveglio ma assonnato", description: "Così il bambino impara ad addormentarsi da solo." },
  ];

  return (
    <div className="timeline-container my-5">
      <h3 className="text-center mb-4">Routine della Nanna</h3>
      <ul className="timeline">
        {steps.map(step => (
          <li key={step.id}>
            <div className="timeline-badge">{step.id}</div>
            <div className="timeline-panel">
              <h5>{step.title}</h5>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TimelineRoutine;
