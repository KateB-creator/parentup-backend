import { useState } from 'react'; 
import '../styles/BabyCareGuides.scss';

function BabyCareGuides() {
  const guides = [
    { id: 'igiene', icon: '🛁', title: 'Come fare il bagnetto', content: 'Usa acqua tiepida (circa 37°C) e un detergente delicato. Sostieni il bambino e lavalo con movimenti dolci.' },
    { id: 'pannolino', icon: '🍼', title: 'Come cambiare il pannolino', content: 'Stendi il neonato su una superficie sicura. Pulisci delicatamente con salviette o acqua tiepida, asciuga bene e applica crema protettiva.\n' +
    '\nPer mettere il pannolino:\n' +
    '1. Apri il pannolino pulito e posizionalo sotto il bambino con le linguette ai lati.\n' +
    '2. Porta la parte anteriore tra le gambe fino alla pancia.\n' +
    '3. Fissa le linguette adesive in modo comodo ma non troppo stretto.\n' +
    'Controlla che non ci siano pieghe o bordi ripiegati verso l’interno per evitare irritazioni o perdite.' },
    { id: 'temperatura', icon: '🌡️', title: 'Come controllare la temperatura', content: 'Usa un termometro digitale. La temperatura ideale è tra 36,5°C e 37,5°C.' },
    { id: 'cordone', icon: '✂️', title: 'Come pulire il cordone ombelicale', content: 'Pulisci con una garza sterile inumidita, senza strofinare. Mantieni asciutto fino alla caduta naturale.' },
    { id: 'preparazione-biberon', icon: '🧪', title: 'Come preparare il biberon', content: 'Lava bene le mani e sterilizza il biberon. Fai bollire l’acqua e lasciala intiepidire fino a circa 40°C (temperatura corporea). Versa l’acqua nel biberon, aggiungi il latte in polvere seguendo le dosi indicate sulla confezione e agita bene fino a scioglimento completo. Verifica la temperatura mettendo qualche goccia sul polso.' },
    { id: 'pulizia-biberon', icon: '🧼', title: 'Come pulire il biberon', content: 'Smonta ogni parte, lava con acqua calda e detergente delicato, usa uno scovolino e sterilizza con metodo a vapore o bollitura.' },
    { id: 'pulizia-culetto', icon: '🚼', title: 'Come pulire il culetto del neonato', content: 'Utilizza acqua tiepida o salviette delicate. Tampona con un panno morbido e applica crema barriera se necessario.' },
    {
      id: 'sviluppo',
      icon: '🎨',
      title: 'Come stimolare lo sviluppo del neonato',
      content:
        'Parla al bambino, cantagli canzoncine e mantieni il contatto visivo. Mostragli oggetti colorati o in movimento per stimolare la vista. Fai brevi sessioni quotidiane di tummy time (tempo a pancia in giù) per rinforzare i muscoli del collo e della schiena. Offrigli oggetti morbidi e sicuri da toccare per esplorare con le mani. Il contatto, la voce e l’interazione con i genitori sono fondamentali nei primi mesi.'
    },
    {
      id: 'linguaggio',
      icon: '🗣️',
      title: 'Come favorire il linguaggio nel neonato',
      content:
        'Parla spesso al tuo bambino con tono dolce e chiaro. Descrivi ciò che stai facendo, nomina oggetti, ripeti suoni e parole semplici. Rispondi ai suoi vocalizzi come se fosse una conversazione: questo rinforza il legame e lo aiuta a comprendere il ritmo del dialogo. Leggi storie brevi anche se non capisce ancora: ascoltare stimola il cervello e la memoria.'
    },
    {
      id: 'unghie',
      icon: '🧼',
      title: 'Come tagliare le unghie del neonato',
      content:
        'Usa forbicine con punte arrotondate o tagliaunghie per neonati. Taglia mentre dorme o è calmo, con luce naturale. Tieni ferme le dita e fai tagli piccoli e dritti. Evita di tagliare troppo vicino alla pelle. Se hai dubbi, lima leggermente le unghiette per accorciarle in sicurezza.'
    },
    {
      id: 'culla',
      icon: '🛏️',
      title: 'Come mantenere pulita la culla',
      content:
        'Cambia lenzuolini 2–3 volte a settimana o in caso di rigurgiti. Usa detersivi delicati e anallergici. Evita cuscini, paracolpi e peluche per prevenire rischi eccessivi. Passa regolarmente un panno umido sulle sbarre della culla e lascia arieggiare il materassino.'
    },
    {
      id: 'coliche',
      icon: '👶',
      title: 'Come calmare le coliche del neonato',
      content:
        'Fai piccoli massaggi circolari sul pancino in senso orario con le mani calde. Tieni il bambino in posizione verticale dopo le poppate. Prova la posizione “pancia in giù sull’avambraccio” o cullalo dolcemente. In caso di dubbi o sintomi persistenti, consulta il pediatra.'
    }    
  ];

  const [search, setSearch] = useState('');
  const [selectedGuide, setSelectedGuide] = useState(null);

  const filteredGuides = guides.filter(guide =>
    guide.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="baby-care-guides my-5">
      <h3 className="text-center mb-4">Guide per la Cura del Neonato</h3>

      {/* Barra di ricerca */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Cerca guida..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Bottoni guida */}
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {filteredGuides.map(guide => (
          <button
            key={guide.id}
            className="btn btn-light guide-button"
            onClick={() => setSelectedGuide(guide)}
          >
            <span className="guide-icon">{guide.icon}</span> {guide.title}
          </button>
        ))}
      </div>

      {/* Modale guida */}
      {selectedGuide && (
        <div className="modal fade show d-block fade-custom d-flex align-items-center justify-content-center" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedGuide.title}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedGuide(null)}></button>
              </div>
              <div className="modal-body">
                {selectedGuide.content}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedGuide(null)}>
                  Chiudi
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelectedGuide(null)}></div>
        </div>
      )}
    </div>
  );
}

export default BabyCareGuides;
